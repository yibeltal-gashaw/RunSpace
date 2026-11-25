'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import type { CommandItem } from '../types';
import { Kbd, Badge } from '../../../components/ui-elements';

interface SnippetItemProps {
  item: CommandItem;
}

export function SnippetItem({ item }: SnippetItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.command);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <figure className="relative border border-fd-border rounded-xl bg-fd-card not-prose overflow-hidden shadow-xs my-2">
      {/* Title & Copy Bar */}
      <div className="flex text-fd-muted-foreground items-center justify-between h-9 border-b border-fd-border px-3 text-xs bg-fd-secondary/30">
        <div className="flex items-center gap-2 truncate">
          <figcaption className="font-medium text-fd-foreground truncate">
            {item.title}
          </figcaption>
          {item.isDangerous && (
            <Badge variant="red" className="text-[10px] py-0 px-1.5">
              <AlertTriangle className="size-2.5" />
              Destructive
            </Badge>
          )}
        </div>

        {/* Copy Button (Fumadocs style) */}
        <button
          onClick={handleCopy}
          type="button"
          aria-label={copied ? 'Copied' : 'Copy command'}
          className={`flex items-center gap-1 rounded-md p-1 text-xs transition-colors cursor-pointer ${
            copied
              ? 'text-emerald-400'
              : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground'
          }`}
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-[11px] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span className="text-[11px] hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Snippet Box */}
      <div
        onClick={handleCopy}
        title="Click to copy command"
        className="text-[0.8125rem] py-2.5 px-3.5 font-mono text-fd-foreground overflow-x-auto flex items-center cursor-pointer hover:bg-fd-accent/20 transition-colors"
      >
        <span className="select-none text-fd-muted-foreground mr-2.5 font-bold">$</span>
        <code className="text-fd-foreground whitespace-pre-wrap break-all flex-1">
          {item.command}
        </code>
      </div>

      {/* Description & Tags */}
      {(item.description || (item.tags && item.tags.length > 0)) && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-fd-border text-xs text-fd-muted-foreground bg-fd-secondary/15">
          <p className="m-0 text-xs text-fd-muted-foreground line-clamp-1">
            {item.description}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-1 shrink-0">
              {item.tags.map((tag) => (
                <Kbd key={tag}>#{tag}</Kbd>
              ))}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
