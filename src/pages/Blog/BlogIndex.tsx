// Blog index page - displays list of articles with filtering
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { loadArticles, getCategories, getTags } from '../../data/articles-loader';
import { ArticleList } from '../../components/blog/ArticleList';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { BlogLayout } from '../../components/blog/BlogLayout';
import { ARTICLE_CATEGORIES_LABEL } from '../../types/article';

export function BlogIndex() {
  const [popularTags, setPopularTags] = useState<string[]>([]);

  const loadTags = useCallback(async () => {
    const allArticles = await loadArticles();
    const tags = [...new Set(allArticles.flatMap((a) => a.tags))];
    setPopularTags(tags.slice(0, 15));
  }, []);

  useEffect(() => {
    loadTags();
  }, [loadTags]);

  return (
    <BlogLayout
      title="Blog"
      subtitle="Insights on frontend engineering, design systems, performance, and more."
    >
      {/* Tags section */}
      <div className="blog-tags-section">
        <span className="blog-tags-label">Browse by tag:</span>
        <div className="blog-tags">
          {popularTags.map((tag) => (
            <Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`} className="blog-tag-link">
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Article list */}
      <div className="blog-content-section">
        <ArticleList />
      </div>
    </BlogLayout>
  );
}

export default BlogIndex;
