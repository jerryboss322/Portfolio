// Blog component tests
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ArticleCard } from '../components/blog/ArticleCard';
import { ArticleList } from '../components/blog/ArticleList';
import { BlogStatistics } from '../components/blog/BlogStatistics';
import { BlogLayout } from '../components/blog/BlogLayout';
import { loadArticles, searchArticles } from '../../data/articles-loader';

// Mock article data
const mockArticle = {
  id: '1',
  slug: 'test-article',
  title: 'Test Article',
  excerpt: 'This is a test excerpt for the article.',
  content: '<p>Test content</p>',
  category: 'technology',
  tags: ['test', 'example'],
  authorId: 'alex-chen',
  publishedAt: '2026-06-01',
  readingTime: 5,
  wordCount: 150,
};

describe('ArticleCard', () => {
  test('renders article title', () => {
    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });

  test('renders category badge', () => {
    render(
      <BrowserRouter>
        <ArticleCard article={mockArticle} />
      </BrowserRouter>
    );
    expect(screen.getByText('Technology')).toBeInTheDocument();
  });
});

describe('BlogStatistics', () => {
  test('renders statistics', () => {
    render(<BlogStatistics />);
    expect(screen.getByText('Articles')).toBeInTheDocument();
  });
});

describe('BlogLayout', () => {
  test('renders title and children', () => {
    render(
      <BrowserRouter>
        <BlogLayout title="Test">
          <p>Child content</p>
        </BlogLayout>
      </BrowserRouter>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});

describe('Article utilities', () => {
  test('getArticleBySlug finds article', () => {
    const articles = loadArticles();
    const result = articles.find((a) => a.slug === 'react-19-new-features-guide');
    expect(result).toBeDefined();
  });

  test('searchArticles finds matching articles', () => {
    const results = searchArticles('typescript');
    expect(results.length).toBeGreaterThan(0);
  });
});
