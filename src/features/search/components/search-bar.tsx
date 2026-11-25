'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Kbd } from '../../../components/ui-elements';

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && !isInput) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        if (query) {
          onQueryChange('');
        }
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [query, onQueryChange]);

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* Fumadocs Search Input Container */}
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-fd-secondary/30 px-3 py-2 transition-colors ${
          isFocused
            ? 'border-fd-ring ring-1 ring-fd-ring'
            : 'border-fd-border hover:border-fd-accent'
        }`}
      >
        <Search className="size-4 text-fd-muted-foreground shrink-0" />

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search commands, flags, descriptions, and tags..."
          className="w-full bg-transparent text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none"
        />

        {/* Clear Button */}
        {query ? (
          <button
            type="button"
            onClick={handleClear}
            className="flex size-6 items-center justify-center rounded text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground cursor-pointer"
            title="Clear search (Esc)"
          >
            <X className="size-3.5" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            <Kbd>⌘K</Kbd>
            <Kbd>/</Kbd>
          </div>
        )}
      </div>
    </div>
  );
}
