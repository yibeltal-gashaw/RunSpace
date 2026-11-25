'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { Kbd } from '../ui-elements';

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center border-b border-fd-border bg-fd-background/80 px-4 sm:px-6 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between max-w-[1400px] mx-auto">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg border border-fd-border bg-fd-muted text-fd-foreground shadow-xs">
            <Terminal className="size-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[0.9375rem] font-medium tracking-tight text-fd-foreground font-mono">
              RUNSPACE<span className="text-fd-muted-foreground font-normal">.DEV</span>
            </span>
            <Kbd>v1.0</Kbd>
          </div>
        </div>

        {/* Status / Meta Indicators */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-fd-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px]">Static SSG</span>
          </div>
          <Kbd>Waku RSC</Kbd>
        </div>
      </div>
    </header>
  );
};
