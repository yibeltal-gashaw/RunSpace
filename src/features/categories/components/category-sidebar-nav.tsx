'use client';

import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronRight } from 'lucide-react';
import type { CommandCategory } from '../types';
import { DynamicIcon } from '../../../components/icon-resolver';

interface CategorySidebarNavProps {
  categories: CommandCategory[];
  selectedCategory: string;
  selectedSubCategory?: string;
  onSelectCategory: (id: string) => void;
  onSelectSubCategory?: (categoryId: string, subCategoryId: string) => void;
  totalCommandsCount: number;
  onItemClick?: () => void;
}

export function CategorySidebarNav({
  categories,
  selectedCategory,
  selectedSubCategory = 'all',
  onSelectCategory,
  onSelectSubCategory,
  totalCommandsCount,
  onItemClick,
}: CategorySidebarNavProps) {
  // Track open/collapsed state of categories with sub-categories
  // Default to keeping the selected category expanded (or open by default)
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const isCategoryExpanded = (catId: string) => {
    // If explicitly set in state, use that; otherwise auto-expand if it is selected, or expand Docker by default
    if (collapsedCategories[catId] !== undefined) {
      return !collapsedCategories[catId];
    }
    return selectedCategory === catId || selectedCategory === 'all' || catId === 'docker';
  };

  return (
    <div className="flex flex-col gap-0.5">
      <div className="px-2 py-1 text-xs font-medium text-fd-muted-foreground uppercase tracking-wider">
        Categories
      </div>

      {/* All Snippets item */}
      <button
        type="button"
        onClick={() => {
          onSelectCategory('all');
          onSelectSubCategory?.('all', 'all');
          onItemClick?.();
        }}
        className={`relative flex w-full flex-row items-center gap-2 rounded-lg px-2 py-1.5 text-start text-sm transition-colors cursor-pointer ${
          selectedCategory === 'all' && selectedSubCategory === 'all'
            ? 'bg-fd-primary/10 text-fd-primary font-medium'
            : 'text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-accent-foreground'
        }`}
      >
        <Layers className="size-4 shrink-0" />
        <span className="truncate">All Snippets</span>
        <span className="ms-auto text-xs text-fd-muted-foreground font-mono">
          {totalCommandsCount}
        </span>
      </button>

      {/* Categorized items & Sub-tabs */}
      {categories.map((cat) => {
        const hasSubCategories = Boolean(cat.subCategories && cat.subCategories.length > 0);
        const isCatSelected = selectedCategory === cat.id;
        const expanded = isCategoryExpanded(cat.id);

        return (
          <div key={cat.id} className="flex flex-col">
            {/* Category Item Row */}
            <div
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectSubCategory?.(cat.id, 'all');
                onItemClick?.();
              }}
              className={`group relative flex w-full flex-row items-center justify-between rounded-lg px-2 py-1.5 text-start text-sm transition-colors cursor-pointer ${
                isCatSelected && selectedSubCategory === 'all'
                  ? 'bg-fd-primary/10 text-fd-primary font-medium'
                  : 'text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-accent-foreground'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <DynamicIcon
                  name={cat.icon}
                  className="size-4 shrink-0 text-fd-muted-foreground group-hover:text-fd-foreground"
                />
                <span className="truncate font-medium">{cat.name}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs text-fd-muted-foreground font-mono">
                  {cat.commands.length}
                </span>

                {/* Collapse / Expand Chevron Trigger */}
                {hasSubCategories && (
                  <button
                    type="button"
                    onClick={(e) => toggleCategoryCollapse(cat.id, e)}
                    className="p-0.5 rounded hover:bg-fd-accent text-fd-muted-foreground hover:text-fd-foreground"
                    title={expanded ? 'Collapse sub-tabs' : 'Expand sub-tabs'}
                  >
                    {expanded ? (
                      <ChevronDown className="size-3.5 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="size-3.5 transition-transform duration-200" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Sub-tabs List (Fumadocs nested tree) */}
            {hasSubCategories && expanded && (
              <div className="ms-3 ps-2.5 border-s border-fd-border flex flex-col gap-0.5 my-1 animate-in fade-in-50 duration-150">
                {cat.subCategories!.map((sub) => {
                  const subCount = cat.commands.filter(
                    (cmd) => cmd.subCategory === sub.id
                  ).length;
                  const isSubActive =
                    isCatSelected && selectedSubCategory === sub.id;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(cat.id);
                        onSelectSubCategory?.(cat.id, sub.id);
                        onItemClick?.();
                      }}
                      className={`relative flex w-full items-center justify-between rounded-md px-2 py-1 text-xs transition-colors text-start cursor-pointer ${
                        isSubActive
                          ? 'bg-fd-primary/10 text-fd-primary font-medium'
                          : 'text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-accent-foreground'
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <span className="font-mono text-[10px] text-fd-muted-foreground">
                        {subCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
