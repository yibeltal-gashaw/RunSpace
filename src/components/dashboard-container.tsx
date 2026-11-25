'use client';

import React, { useState, useMemo } from 'react';
import { SearchBar } from '../features/search';
import {
  COMMAND_CATEGORIES,
  CommandCard,
  CategoryTabs,
  type CommandCategory,
} from '../features/categories';
import { Sidebar } from './layout/sidebar';
import { Filter, SearchX, RotateCcw, PanelLeft } from 'lucide-react';
import { Btn, Kbd } from './ui-elements';

export function DashboardContainer() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const normalizedSearchQuery = useMemo(() => {
    return query.trim().toLowerCase();
  }, [query]);

  // Handle category change (resets sub-category to 'all')
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('all');
  };

  // Handle specific sub-category click (from sidebar or tabs)
  const handleSelectSubCategory = (categoryIdOrSubId: string, subCategoryId?: string) => {
    if (subCategoryId !== undefined) {
      setSelectedCategory(categoryIdOrSubId);
      setSelectedSubCategory(subCategoryId);
    } else {
      setSelectedSubCategory(categoryIdOrSubId);
    }
  };

  // Filter categories and their commands based on category, sub-category, and query
  const filteredCategories = useMemo(() => {
    return COMMAND_CATEGORIES.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }

      let catCommands = cat.commands;

      // Filter by sub-category if specific sub-category is selected
      if (selectedSubCategory !== 'all') {
        catCommands = catCommands.filter(
          (cmd) => cmd.subCategory === selectedSubCategory
        );
      }

      // Filter by search query if present
      if (normalizedSearchQuery) {
        catCommands = catCommands.filter((cmd) => {
          const titleMatch = cmd.title.toLowerCase().includes(normalizedSearchQuery);
          const commandMatch = cmd.command.toLowerCase().includes(normalizedSearchQuery);
          const descMatch = cmd.description.toLowerCase().includes(normalizedSearchQuery);
          const tagMatch = cmd.tags?.some((t) =>
            t.toLowerCase().includes(normalizedSearchQuery)
          );
          return titleMatch || commandMatch || descMatch || tagMatch;
        });
      }

      if (catCommands.length === 0) {
        return null;
      }

      return {
        ...cat,
        commands: catCommands,
      };
    }).filter(Boolean) as CommandCategory[];
  }, [normalizedSearchQuery, selectedCategory, selectedSubCategory]);

  const totalCommandsAvailable = useMemo(() => {
    return COMMAND_CATEGORIES.reduce((acc, cat) => acc + cat.commands.length, 0);
  }, []);

  const totalFilteredCommands = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.commands.length, 0);
  }, [filteredCategories]);

  return (
    <div className="flex w-full min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar with Sub-tabs (Installation, Logs, Deployment, etc.) */}
      <Sidebar
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectCategory={handleSelectCategory}
        onSelectSubCategory={handleSelectSubCategory}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 px-4 sm:px-6 lg:px-8 py-5 gap-6 max-w-[1400px]">
        {/* Mobile Subnav / Sidebar Trigger */}
        <div className="flex items-center justify-between lg:hidden border-b border-fd-border pb-3">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-secondary px-2.5 py-1.5 text-xs font-medium text-fd-foreground hover:bg-fd-accent cursor-pointer"
          >
            <PanelLeft className="size-4" />
            <span>Navigation</span>
          </button>

          <Kbd>{totalFilteredCommands} commands</Kbd>
        </div>

        {/* Search Bar Feature */}
        <SearchBar query={query} onQueryChange={setQuery} />

        {/* Categories Explorer Section */}
        <section className="flex flex-col gap-4">
          {/* Category & Sub-tab Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-fd-border pb-3">
            {/* Category Tabs & Sub-tabs */}
            <CategoryTabs
              categories={COMMAND_CATEGORIES}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              onSelectCategory={handleSelectCategory}
              onSelectSubCategory={(subId) => setSelectedSubCategory(subId)}
              totalCommandsCount={totalCommandsAvailable}
            />

            <div className="flex items-center gap-1.5 text-xs font-mono text-fd-muted-foreground self-start sm:self-auto">
              <Filter className="size-3.5" />
              <span>
                {totalFilteredCommands} / {totalCommandsAvailable}
              </span>
            </div>
          </div>

          {/* Categorized Command Cards Grid */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
              {filteredCategories.map((category) => (
                <CommandCard
                  key={category.id}
                  category={category}
                  activeSubCategory={selectedSubCategory}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-fd-border bg-fd-card/50 p-10 text-center">
              <div className="flex size-10 items-center justify-center rounded-lg border border-fd-border bg-fd-muted text-fd-muted-foreground mb-3">
                <SearchX className="size-5" />
              </div>
              <h3 className="text-sm font-medium text-fd-foreground">
                No matching snippets found
              </h3>
              <p className="mt-1 text-xs text-fd-muted-foreground max-w-sm">
                No snippets match your current search and sub-tab filters. Try resetting the filters.
              </p>
              <Btn
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setSelectedSubCategory('all');
                }}
                variant="primary"
                size="sm"
                className="mt-4"
              >
                <RotateCcw className="size-3.5 mr-1" />
                Reset All Filters
              </Btn>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
