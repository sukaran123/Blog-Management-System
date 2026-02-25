import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlog, deleteBlog } from '../api';
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(id);
        setBlog(res.data.data);
      } catch (err) {
        setError('Blog not found or server unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBlog(id);
      navigate('/', { state: { deleted: true } });
    } catch (err) {
      setError('Failed to delete. Please try again.');
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const readTime = blog ? Math.max(1, Math.ceil(blog.content.length / 1000)) : 0;
  const formattedDate = blog
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      })
    : '';

  if (loading)
    return (
      <div className="spinner-wrap">
        <div className="spinner" />
        <p>Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <div className="state-card">
          <span className="state-icon">⚠</span>
          <h3>Error</h3>
          <p>{error}</p>
          <Link to="/" className="btn btn-secondary">← Back to Home</Link>
        </div>
      </div>
    );

  return (
    <div className="blog-detail page-enter">
      {/* Hero image */}
      {blog.thumbnail && !imgError ? (
        <div className="blog-detail__hero">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            onError={() => setImgError(true)}
          />
          <div className="blog-detail__hero-overlay" />
        </div>
      ) : (
        <div className="blog-detail__hero blog-detail__hero--placeholder">
          <div className="blog-detail__hero-letter">{blog.title?.[0]?.toUpperCase()}</div>
        </div>
      )}

      <div className="container blog-detail__container">
        {/* Back */}
        <Link to="/" className="blog-detail__back">
          ← Back to posts
        </Link>

        <article className="blog-detail__article">
          {/* Meta */}
          <div className="blog-detail__meta">
            <div className="blog-detail__author-wrap">
              <div className="blog-detail__avatar">{blog.author?.[0]?.toUpperCase()}</div>
              <div>
                <div className="blog-detail__author">{blog.author}</div>
                <div className="blog-detail__date-time">
                  {formattedDate} · {readTime} min read
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="blog-detail__title">{blog.title}</h1>

          {/* Divider */}
          <div className="blog-detail__divider">
            <span>✦</span>
          </div>

          {/* Content */}
          <div className="blog-detail__content">
            {blog.content.split('\n').map((para, i) =>
              para.trim() ? <p key={i}>{para}</p> : <br key={i} />
            )}
          </div>

          {/* Actions */}
          <div className="blog-detail__actions">
            <Link to={`/edit/${blog._id}`} className="btn btn-secondary">
              ✏ Edit Post
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => setShowConfirm(true)}
              disabled={deleting}
            >
              🗑 Delete
            </button>
          </div>
        </article>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__icon">🗑</div>
            <h3 className="modal__title">Delete this post?</h3>
            <p className="modal__body">
              This action is permanent and cannot be undone.
            </p>
            <div className="modal__actions">
              <button
                className="btn btn-ghost"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
