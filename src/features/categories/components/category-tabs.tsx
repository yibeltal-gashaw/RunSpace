'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import type { CommandCategory } from '../types';
import { DynamicIcon } from '../../../components/icon-resolver';

interface CategoryTabsProps {
  categories: CommandCategory[];
  selectedCategory: string;
  selectedSubCategory?: string;
  onSelectCategory: (id: string) => void;
  onSelectSubCategory?: (subId: string) => void;
  totalCommandsCount: number;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  selectedSubCategory = 'all',
  onSelectCategory,
  onSelectSubCategory,
  totalCommandsCount,
}: CategoryTabsProps) {
  // Find currently active category to check if it has sub-categories
  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);
  const activeSubCategories = activeCategoryObj?.subCategories;

  return (
    <div className="flex flex-col gap-2.5">
      {/* Primary Category Switcher */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* All Categories Button */}
        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            onSelectSubCategory?.('all');
          }}
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-fd-primary text-fd-primary-foreground'
              : 'border border-fd-border bg-fd-secondary text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
          }`}
        >
          <Layers className="size-3.5" />
          <span>All</span>
          <span className="font-mono text-[10px]">{totalCommandsCount}</span>
        </button>

        {/* Individual Categories Buttons */}
        {/* {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectSubCategory?.('all');
              }}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-fd-primary text-fd-primary-foreground'
                  : 'border border-fd-border bg-fd-secondary text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
              }`}
            >
              <DynamicIcon name={cat.icon} className="size-3.5" />
              <span>{cat.name}</span>
              <span className="font-mono text-[10px]">{cat.commands.length}</span>
            </button>
          );
        })} */}
      </div>

      {/* Secondary Sub-Tabs Row (e.g. for Docker: Installation, Logs, Deployment) */}
      {/* {activeSubCategories && activeSubCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 ps-1 border-s-2 border-fd-border ms-1 py-0.5 animate-in fade-in duration-150">
          <span className="text-[11px] font-medium text-fd-muted-foreground uppercase tracking-wider me-1">
            Sub-tabs:
          </span>

          <button
            type="button"
            onClick={() => onSelectSubCategory?.('all')}
            className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
              selectedSubCategory === 'all'
                ? 'bg-fd-accent text-fd-foreground font-semibold border border-fd-border shadow-2xs'
                : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/40'
            }`}
          >
            All {activeCategoryObj?.name}
          </button>

          {activeSubCategories.map((sub) => {
            const isSubSelected = selectedSubCategory === sub.id;
            const subCount = activeCategoryObj.commands.filter(
              (c) => c.subCategory === sub.id
            ).length;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubCategory?.(sub.id)}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors cursor-pointer ${
                  isSubSelected
                    ? 'bg-fd-primary/10 text-fd-primary font-semibold border border-fd-border shadow-2xs'
                    : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent/40'
                }`}
              >
                <span>{sub.name}</span>
                <span className="font-mono text-[10px] opacity-75">
                  ({subCount})
                </span>
              </button>
            );
          })}
        </div>
      )} */}
    </div>
  );
}
