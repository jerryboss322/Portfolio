// Article list component with filtering and pagination
import { useEffect, useState, useCallback } from 'react';
import type { Article, FilterOptions, PaginatedArticles } from '../../types/article';
import { loadArticles, getCategories, searchArticles } from '../../data/articles-loader';
import { ARTICLE_CATEGORIES_LABEL } from '../../types/article';
import { ArticleCard } from './ArticleCard';

interface ArticleListProps {
  initialCategory?: string;
  initialSearch?: string;
}

export function ArticleList({ initialCategory, initialSearch }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  const loadData = useCallback(async () => {
    const allArticles = await loadArticles();
    setArticles(allArticles);
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredArticles = searchQuery
    ? searchArticles(searchQuery)
    : selectedCategory
      ? articles.filter((a) => a.category === selectedCategory)
      : articles;

  const totalItems = filteredArticles.length;
  const totalPagesValue = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + pageSize);

  const hasNext = page < totalPagesValue;
  const hasPrev = page > 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="blog-article-list">
      <div className="blog-list-controls">
        <div className="blog-filters">
          <select
            value={selectedCategory || ''}
            onChange={(e) => handleCategoryChange(e.target.value || undefined)}
            className="blog-select"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {ARTICLE_CATEGORIES_LABEL[cat as any] || cat}
              </option>
            ))}
          </select>
          <input
            type="search"
            className="blog-search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="blog-article-grid">
        {paginatedArticles.length === 0 ? (
          <div className="blog-empty-state">
            <p>No articles found matching your criteria.</p>
          </div>
        ) : (
          paginatedArticles.map((article, idx) => (
            <ArticleCard key={article.id} article={article} index={startIndex + idx} />
          ))
        )}
      </div>

      {totalItems > 0 && (
        <div className="blog-pagination">
          <button
            className="blog-pagination-btn blog-pagination-btn-prev"
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
          >
            ← Previous
          </button>
          <span className="blog-pagination-info">
            Page {page} of {totalPagesValue} ({totalItems} articles)
          </span>
          <button
            className="blog-pagination-btn blog-pagination-btn-next"
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNext}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticleList;
