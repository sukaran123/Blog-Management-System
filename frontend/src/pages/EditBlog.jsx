import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { getBlog, updateBlog } from '../api';
import './FormPage.css';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getBlog(id);
        const { title, content, author, thumbnail } = res.data.data;
        setInitialData({ title, content, author, thumbnail: thumbnail || '' });
      } catch {
        setError('Could not load blog for editing.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      await updateBlog(id, data);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post. Try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page page-enter">
      <div className="form-page__header form-page__header--edit">
        <div className="form-page__header-bg">
          <div className="form-page__orb form-page__orb--purple" />
        </div>
        <div className="container">
          <Link to={`/blog/${id}`} className="form-page__back">← Back to Post</Link>
          <div className="form-page__eyebrow">
            <span className="tag">Editing</span>
          </div>
          <h1 className="form-page__title">
            Refine your<br /><em>words</em>
          </h1>
          <p className="form-page__subtitle">
            Update your post and keep the story alive.
          </p>
        </div>
      </div>

      <div className="container form-page__body">
        {loading && (
          <div className="spinner-wrap">
            <div className="spinner" />
            <p>Loading post...</p>
          </div>
        )}

        {error && !loading && (
          <div className="form-page__error">
            <span>⚠</span> {error}
          </div>
        )}

        {!loading && initialData && (
          <BlogForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Save Changes"
          />
        )}
      </div>
    </div>
  );
}

export default EditBlog;
