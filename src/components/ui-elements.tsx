'use client';

import React from 'react';
import { Play, Download, Check, Plus, ExternalLink, ArrowRight } from 'lucide-react';

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'icon' | 'icon-xs';
  icon?: 'play' | 'download' | 'check' | 'plus' | 'external' | 'arrow' | 'none';
  children?: React.ReactNode;
}

export function Btn({
  variant = 'secondary',
  size = 'sm',
  icon,
  children,
  className = '',
  ...props
}: BtnProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium select-none transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring cursor-pointer';

  const sizeClasses = {
    sm: 'gap-1 px-2.5 py-1 text-xs rounded-md',
    md: 'gap-1.5 px-3 py-1.5 text-sm rounded-md shadow-xs',
    icon: 'p-1.5 rounded-md [&_svg]:size-4',
    'icon-xs': 'p-1 rounded-md [&_svg]:size-3.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80 shadow-xs',
    secondary:
      'border border-fd-border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
    ghost:
      'hover:bg-fd-accent hover:text-fd-accent-foreground text-fd-muted-foreground',
    outline:
      'border border-fd-border hover:bg-fd-accent hover:text-fd-accent-foreground',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 shadow-xs',
  }[variant];

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {icon === 'play' && <Play className="size-3.5 fill-current" />}
      {icon === 'download' && <Download className="size-3.5" />}
      {icon === 'check' && <Check className="size-3.5" />}
      {icon === 'plus' && <Plus className="size-3.5" />}
      {icon === 'arrow' && <ArrowRight className="size-3.5" />}
      {children && <span>{children}</span>}
      {icon === 'external' && <ExternalLink className="size-3 opacity-70" />}
    </button>
  );
}

export function Kbd({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <kbd
      className={`inline-flex items-center rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 text-[10px] font-mono font-medium text-fd-muted-foreground select-none align-middle ${className}`}
    >
      {children}
    </kbd>
  );
}

export function Badge({
  variant = 'neutral',
  children,
  className = '',
}: {
  variant?: 'neutral' | 'blue' | 'green' | 'amber' | 'red';
  children: React.ReactNode;
  className?: string;
}) {
  const variantClasses = {
    neutral: 'bg-fd-secondary text-fd-muted-foreground border-fd-border',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium align-middle ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
