import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ blog, index = 0 }) {
  const [imgError, setImgError] = useState(false);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const readTime = Math.max(1, Math.ceil((blog.content?.length || 0) / 1000));

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="blog-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="blog-card__thumbnail">
        {blog.thumbnail && !imgError ? (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="blog-card__thumbnail-placeholder">
            <span>{blog.title?.[0]?.toUpperCase() || '✦'}</span>
          </div>
        )}
        <div className="blog-card__thumbnail-overlay" />
      </div>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__author">
            <span className="blog-card__avatar">{blog.author?.[0]?.toUpperCase()}</span>
            {blog.author}
          </span>
          <span className="blog-card__dot">·</span>
          <span>{formattedDate}</span>
          <span className="blog-card__dot">·</span>
          <span>{readTime} min read</span>
        </div>

        <h3 className="blog-card__title">{blog.title}</h3>
        <p className="blog-card__excerpt">{blog.excerpt || blog.content?.substring(0, 130) + '...'}</p>

        <div className="blog-card__footer">
          <span className="blog-card__read">Read more →</span>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
