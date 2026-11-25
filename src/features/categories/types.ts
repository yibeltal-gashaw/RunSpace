export interface SubCategory {
  id: string;
  name: string;
  description?: string;
}

export interface CommandItem {
  id: string;
  title: string;
  command: string;
  description: string;
  subCategory?: string; // matches SubCategory.id
  tags?: string[];
  isDangerous?: boolean;
}

export interface CommandCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  accentColor: string;
  badgeColor: string;
  subCategories?: SubCategory[];
  commands: CommandItem[];
}
