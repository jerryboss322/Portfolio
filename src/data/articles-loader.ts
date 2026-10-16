// Blog data loader - loads articles from JSON
import type { Article, Author } from '../types/article';
import { AUTHORS } from './authors';
import rawArticles from './articles.json';

const articles = rawArticles as (Article & { authorId: string })[];

let articlesCache: Article[] | null = null;

export function loadArticles(): Article[] {
  if (articlesCache) return articlesCache;

  try {
    const data = articles;
    // Convert authorId to full Author object
    articlesCache = data.map((article) => {
      const author = AUTHORS.find((a) => a.id === article.authorId) || AUTHORS[0];
      return {
        ...article,
        author,
      };
    });
    return articlesCache;
  } catch {
    // Fallback to hard-coded articles
    return [];
  }
}

export function getArticlesByCategory(category: string): Article[] {
  return loadArticles().filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): Article[] {
  return loadArticles().filter((a) => a.tags.includes(tag));
}

export function getFeaturedArticles(): Article[] {
  return loadArticles().filter((a) => a.featured).slice(0, 3);
}

export function getAllAuthors(): Author[] {
  return AUTHORS;
}

export function getAuthorById(id: string): Author | undefined {
  return AUTHORS.find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadArticles().find((a) => a.slug === slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return loadArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q)
  );
}

export function getCategories(): string[] {
  return [...new Set(loadArticles().map((a) => a.category))];
}

export function getTags(): string[] {
  return [...new Set(loadArticles().flatMap((a) => a.tags))];
}
