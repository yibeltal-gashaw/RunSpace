import React from 'react';
import type { CommandCategory } from '../types';
import { SnippetItem } from './snippet-item';
import { DynamicIcon } from '../../../components/icon-resolver';
import { Badge } from '../../../components/ui-elements';

interface CommandCardProps {
  category: CommandCategory;
  activeSubCategory?: string;
}

export function CommandCard({ category, activeSubCategory = 'all' }: CommandCardProps) {
  // If activeSubCategory is set, filter commands; otherwise show all
  const filteredCommands =
    activeSubCategory !== 'all'
      ? category.commands.filter((cmd) => cmd.subCategory === activeSubCategory)
      : category.commands;

  // Group commands by subCategory if category defines them and all are shown
  const hasSubCategories = Boolean(
    category.subCategories &&
      category.subCategories.length > 0 &&
      activeSubCategory === 'all'
  );

  return (
    <div className="block rounded-xl border border-fd-border bg-fd-card p-4 text-fd-card-foreground shadow-sm">
      {/* Category Header */}
      <div className="flex items-center justify-between pb-3 border-b border-fd-border">
        <div className="flex items-center gap-2.5">
          <div className="not-prose shadow-xs rounded-lg border border-fd-border bg-fd-muted p-1.5 text-fd-foreground">
            <DynamicIcon name={category.icon} className="size-4" />
          </div>
          <div>
            <h3 className="not-prose text-sm font-medium text-fd-foreground flex items-center gap-2">
              <span>{category.name}</span>
              {activeSubCategory !== 'all' && (
                <span className="text-xs font-normal text-fd-muted-foreground">
                  › {category.subCategories?.find((s) => s.id === activeSubCategory)?.name}
                </span>
              )}
            </h3>
            <p className="my-0 text-xs text-fd-muted-foreground line-clamp-1">
              {category.description}
            </p>
          </div>
        </div>

        {/* Count Badge */}
        <Badge variant="neutral" className="text-xs font-mono">
          {filteredCommands.length} cmds
        </Badge>
      </div>

      {/* Command List (Rendered directly or in sub-category groups) */}
      <div className="mt-3 flex flex-col gap-1">
        {hasSubCategories ? (
          category.subCategories!.map((sub) => {
            const subCommands = category.commands.filter(
              (c) => c.subCategory === sub.id
            );
            if (subCommands.length === 0) return null;

            return (
              <div key={sub.id} className="flex flex-col gap-1 mt-2 first:mt-0">
                {/* Sub-category group section heading */}
                <div className="flex items-center gap-2 pt-1 pb-0.5">
                  <span className="text-xs font-medium text-fd-foreground">
                    {sub.name}
                  </span>
                  <span className="h-px flex-1 bg-fd-border/70" />
                  <span className="text-[10px] font-mono text-fd-muted-foreground">
                    {subCommands.length}
                  </span>
                </div>

                {subCommands.map((cmd) => (
                  <SnippetItem key={cmd.id} item={cmd} />
                ))}
              </div>
            );
          })
        ) : (
          filteredCommands.map((cmd) => (
            <SnippetItem key={cmd.id} item={cmd} />
          ))
        )}
      </div>
    </div>
  );
}
