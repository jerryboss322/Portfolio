// Blog counter and statistics component
import { useEffect, useState } from 'react';
import { loadArticles, getCategories, getTags } from '../../data/articles-loader';

interface BlogStatisticsProps {
  showInRow?: boolean;
}

export function BlogStatistics({ showInRow = false }: BlogStatisticsProps) {
  const [stats, setStats] = useState({
    totalArticles: 0,
    categories: 0,
    tags: 0,
    authors: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const articles = await loadArticles();
      setStats({
        totalArticles: articles.length,
        categories: getCategories().length,
        tags: getTags().length,
        authors: 0,
      });
    }
    loadStats();
  }, []);

  if (showInRow) {
    return (
      <div className="blog-statistics-row">
        <div className="blog-stat-item">
          <span className="blog-stat-number">{stats.totalArticles}</span>
          <span className="blog-stat-label">Articles</span>
        </div>
        <div className="blog-stat-item">
          <span className="blog-stat-number">{stats.categories}</span>
          <span className="blog-stat-label">Categories</span>
        </div>
        <div className="blog-stat-item">
          <span className="blog-stat-number">{stats.tags}</span>
          <span className="blog-stat-label">Tags</span>
        </div>
        <div className="blog-stat-item">
          <span className="blog-stat-number">{stats.authors}</span>
          <span className="blog-stat-label">Authors</span>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-statistics">
      <div className="blog-stat">
        <span className="blog-stat-number">{stats.totalArticles}</span>
        <span className="blog-stat-label">Published Articles</span>
      </div>
      <div className="blog-stat">
        <span className="blog-stat-number">{stats.categories}</span>
        <span className="blog-stat-label">Categories</span>
      </div>
      <div className="blog-stat">
        <span className="blog-stat-number">{stats.tags}</span>
        <span className="blog-stat-label">Tags & Topics</span>
      </div>
      <div className="blog-stat">
        <span className="blog-stat-number">{stats.authors}</span>
        <span className="blog-stat-label">Expert Authors</span>
      </div>
    </div>
  );
}

export default BlogStatistics;
