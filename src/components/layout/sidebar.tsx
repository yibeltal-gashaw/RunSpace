'use client';

import React from 'react';
import { X, Terminal } from 'lucide-react';
import {
  COMMAND_CATEGORIES,
  CategorySidebarNav,
} from '../../features/categories';

interface SidebarProps {
  selectedCategory: string;
  selectedSubCategory?: string;
  onSelectCategory: (id: string) => void;
  onSelectSubCategory?: (categoryId: string, subCategoryId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  selectedCategory,
  selectedSubCategory = 'all',
  onSelectCategory,
  onSelectSubCategory,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const totalCommandsAvailable = COMMAND_CATEGORIES.reduce(
    (acc, cat) => acc + cat.commands.length,
    0
  );

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3.5 text-fd-foreground">
      <div className="flex flex-col gap-4">
        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between pb-2 border-b border-fd-border lg:hidden">
          <div className="flex items-center gap-2 font-mono text-sm font-medium text-fd-foreground">
            <Terminal className="size-4" />
            <span>NAVIGATION</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              type="button"
              className="flex size-7 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Categories Feature Navigation Component with Sub-tabs */}
        <CategorySidebarNav
          categories={COMMAND_CATEGORIES}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={onSelectCategory}
          onSelectSubCategory={onSelectSubCategory}
          totalCommandsCount={totalCommandsAvailable}
          onItemClick={onClose}
        />
      </div>

      {/* Bottom Host Info */}
      <div className="border-t border-fd-border pt-3">
        <div className="flex items-center justify-between rounded-lg border border-fd-border bg-fd-secondary/50 px-2.5 py-2 text-xs">
          <span className="text-fd-muted-foreground">Host</span>
          <span className="font-mono text-fd-foreground">localhost</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar (exact Fumadocs 268px width) */}
      <aside className="hidden lg:block w-[268px] shrink-0 border-e border-fd-border bg-fd-background sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto fd-scroll-container">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <aside className="relative z-50 w-[268px] max-w-[80vw] h-full bg-fd-background border-e border-fd-border overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
