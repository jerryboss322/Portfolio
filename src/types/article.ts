// Article types for the Blog system

export type ArticleCategory = 'technology' | 'design' | 'development' | 'productivity' | 'tutorials';

export interface Author {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio: string;
  email: string;
  Twitter?: string;
  GitHub?: string;
  LinkedIn?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[];
  author: Author;
  coverImage?: string;
  featured?: boolean;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  wordCount: number;
 seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface BlogPost {
  articles: Article[];
  categories: ArticleCategory[];
  authors: Author[];
}

export interface PaginatedArticles {
  items: Article[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchResult {
  articles: Article[];
  totalCount: number;
  searchTerm: string;
}

export interface SortOption {
  key: keyof Article;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  category?: ArticleCategory;
  tags?: string[];
  author?: string;
  featured?: boolean;
  search?: string;
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'technology',
  'design',
  'development',
  'productivity',
  'tutorials',
];

export const ARTICLE_CATEGORIES_LABEL: Record<ArticleCategory, string> = {
  technology: 'Technology',
  design: 'Design',
  development: 'Development',
  productivity: 'Productivity',
  tutorials: 'Tutorials',
};

export const DEFAULT_PAGE_SIZE = 9;

// Get all article categories
export function getCategories(): ArticleCategory[] {
  return ARTICLE_CATEGORIES;
}

// Get category label
export function getCategoryLabel(category: ArticleCategory): string {
  return ARTICLE_CATEGORIES_LABEL[category];
}

// Article data keys for JSON loading
export const BLOG_ARTICLE_KEYS = [
  'react-19-new-features-guide',
  'building-design-systems-at-scale',
  'optimizing-react-performance-2026',
  'typescript-mastery-patterns-2026',
  'the-importance-of-accessibility-in-modern-web',
  'typescript-v5-10-new-features',
  'nextjs-15-app-router-best-practices',
  'automating-workflows-with-automation-tools',
  'building-interactive-dashboards-react',
  'design-tokens-tooling-2026',
  'react-hooks-deep-dive-2026',
  'enterprise-api-design-best-practices',
];

