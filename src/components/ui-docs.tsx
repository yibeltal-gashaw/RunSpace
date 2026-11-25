'use client';

import React from 'react';
import { Play, Download, Check, Plus, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

export interface BtnProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'action' | 'play' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: 'play' | 'download' | 'check' | 'plus' | 'external' | 'none';
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
    'inline-flex items-center justify-center font-medium select-none transition-all duration-150 align-middle whitespace-nowrap cursor-default [&_p]:m-0 [&_p]:inline';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1 mx-0.5',
    md: 'text-xs px-2.5 py-1 rounded-md gap-1.5 mx-1 shadow-xs',
    lg: 'text-sm px-3.5 py-1.5 rounded-lg gap-2 mx-1 shadow-sm',
  }[size];

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm border border-blue-500/50 active:scale-95',
    secondary:
      'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600 font-semibold shadow-xs',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm border border-emerald-500/50 active:scale-95',
    action:
      'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm border border-indigo-500/50 active:scale-95',
    play:
      'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm border border-emerald-500/50 active:scale-95',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm border border-rose-500/50 active:scale-95',
    ghost:
      'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-dashed border-neutral-300 dark:border-neutral-700',
  }[variant];

  const showPlayIcon = icon === 'play' || variant === 'play';
  const showDownloadIcon = icon === 'download';
  const showCheckIcon = icon === 'check';
  const showPlusIcon = icon === 'plus';
  const showExternalIcon = icon === 'external';

  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} {...props}>
      {showPlayIcon && <Play className="w-3 h-3 fill-current" />}
      {showDownloadIcon && <Download className="w-3 h-3" />}
      {showCheckIcon && <Check className="w-3 h-3" />}
      {showPlusIcon && <Plus className="w-3 h-3" />}
      <span>{children}</span>
      {showExternalIcon && <ExternalLink className="w-3 h-3 opacity-70" />}
    </span>
  );
}

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'success' | 'action' | 'secondary';
  icon?: 'download' | 'external' | 'play' | 'arrow' | 'none';
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = 'primary',
  icon = 'download',
  children,
  className = '',
  ...props
}: ButtonLinkProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 gap-2 my-2 no-underline cursor-pointer [&_p]:m-0 [&_p]:inline';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border border-blue-400/30',
    success:
      'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border border-emerald-400/30',
    action:
      'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border border-purple-400/30',
    secondary:
      'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-600',
  }[variant];

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer noopener' : undefined}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon === 'download' && <Download className="w-4 h-4" />}
      {icon === 'play' && <Play className="w-4 h-4 fill-current" />}
      {icon === 'arrow' && <ArrowRight className="w-4 h-4" />}
      <span>{children}</span>
      {icon === 'external' || (isExternal && icon !== 'none' && !icon) ? (
        <ExternalLink className="w-4 h-4 opacity-80" />
      ) : null}
    </a>
  );
}

export function Kbd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={`inline-block px-1.5 py-0.5 text-xs font-mono font-semibold rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 shadow-2xs mx-0.5 align-middle ${className}`}
    >
      {children}
    </kbd>
  );
}

export function MenuPath({ path, className = '' }: { path: string; className?: string }) {
  const parts = path.split('->').map((p) => p.trim());

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1 px-2 py-0.5 my-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300/80 dark:border-neutral-700/80 text-xs font-medium text-neutral-800 dark:text-neutral-200 align-middle ${className}`}
    >
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          <span className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold shadow-2xs">
            {part}
          </span>
          {i < parts.length - 1 && (
            <span className="text-blue-500 dark:text-blue-400 text-[10px] font-bold">›</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}

export function Badge({
  variant = 'blue',
  children,
  className = '',
}: {
  variant?: 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'neutral';
  children: React.ReactNode;
  className?: string;
}) {
  const variantClasses = {
    blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25',
    green: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
    amber: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/25',
    purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25',
    red: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
    neutral: 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border align-middle mx-0.5 [&_p]:m-0 [&_p]:inline ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

export function Checkbox({
  checked = true,
  children,
  className = '',
}: {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium align-middle mx-0.5 [&_p]:m-0 [&_p]:inline ${
        checked
          ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30 font-semibold'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
      } ${className}`}
    >
      <span
        className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
          checked ? 'bg-blue-600 text-white font-bold' : 'border border-neutral-400 dark:border-neutral-500'
        }`}
      >
        {checked ? '✓' : ''}
      </span>
      <span>{children}</span>
    </span>
  );
}

export function Radio({
  checked = true,
  children,
  className = '',
}: {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium align-middle mx-0.5 [&_p]:m-0 [&_p]:inline ${
        checked
          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
      } ${className}`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
          checked ? 'border-2 border-emerald-600 dark:border-emerald-400' : 'border border-neutral-400'
        }`}
      >
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
      </span>
      <span>{children}</span>
    </span>
  );
}

export function Toggle({
  checked = true,
  children,
  className = '',
}: {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border align-middle mx-0.5 [&_p]:m-0 [&_p]:inline ${
        checked
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
          : 'bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
      } ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${checked ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'}`} />
      <span>{children}</span>
      <span
        className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
          checked ? 'bg-emerald-600 text-white' : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
        }`}
      >
        {checked ? 'ON' : 'OFF'}
      </span>
    </span>
  );
}
