import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { createBlog } from '../api';
import './FormPage.css';

function CreateBlog() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      const res = await createBlog(data);
      navigate(`/blog/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page page-enter">
      <div className="form-page__header">
        <div className="form-page__header-bg">
          <div className="form-page__orb" />
        </div>
        <div className="container">
          <Link to="/" className="form-page__back">← Back</Link>
          <div className="form-page__eyebrow">
            <span className="tag">New Post</span>
          </div>
          <h1 className="form-page__title">
            Share your<br /><em>story</em>
          </h1>
          <p className="form-page__subtitle">
            Write something the world needs to read.
          </p>
        </div>
      </div>

      <div className="container form-page__body">
        {error && (
          <div className="form-page__error">
            <span>⚠</span> {error}
          </div>
        )}
        <BlogForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Publish Post" />
      </div>
    </div>
  );
}

export default CreateBlog;
