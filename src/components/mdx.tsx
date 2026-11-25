import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Callout } from 'fumadocs-ui/components/callout';
import {
  Btn,
  ButtonLink,
  Kbd,
  MenuPath,
  Badge,
  Checkbox,
  Radio,
  Toggle,
} from '@/components/ui-docs';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    Steps,
    Step,
    Callout,
    Btn,
    ButtonLink,
    Kbd,
    MenuPath,
    Badge,
    Checkbox,
    Radio,
    Toggle,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
