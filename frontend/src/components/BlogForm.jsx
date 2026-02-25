import React, { useState, useEffect } from 'react';
import './BlogForm.css';

const INITIAL = { title: '', content: '', author: '', thumbnail: '' };

function validate(data) {
  const errors = {};
  if (!data.title.trim()) errors.title = 'Title is required';
  else if (data.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
  if (!data.author.trim()) errors.author = 'Author name is required';
  if (!data.content.trim()) errors.content = 'Content is required';
  else if (data.content.trim().length < 20) errors.content = 'Content must be at least 20 characters';
  if (data.thumbnail && !/^https?:\/\/.+/.test(data.thumbnail)) {
    errors.thumbnail = 'Must be a valid URL starting with http:// or https://';
  }
  return errors;
}

function BlogForm({ initialData, onSubmit, submitting, submitLabel }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = { title: true, content: true, author: true };
    setTouched(all);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = form.content.length;

  return (
    <form className="blog-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="title">Post Title *</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Give your story a compelling title..."
          className={errors.title ? 'error' : ''}
          maxLength={200}
        />
        {errors.title && <span className="field-error">⚠ {errors.title}</span>}
        <span className="char-count">{form.title.length}/200</span>
      </div>

      <div className="form-group">
        <label htmlFor="author">Author Name *</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name or pen name..."
          className={errors.author ? 'error' : ''}
        />
        {errors.author && <span className="field-error">⚠ {errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="thumbnail">Cover Image URL <span className="optional">(optional)</span></label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          value={form.thumbnail}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://example.com/image.jpg"
          className={errors.thumbnail ? 'error' : ''}
        />
        {errors.thumbnail && <span className="field-error">⚠ {errors.thumbnail}</span>}
        {form.thumbnail && !errors.thumbnail && (
          <div className="thumbnail-preview">
            <img
              src={form.thumbnail}
              alt="Preview"
              onError={(e) => e.target.style.display = 'none'}
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Share your story, ideas, or perspectives..."
          rows={14}
          className={errors.content ? 'error' : ''}
        />
        {errors.content && <span className="field-error">⚠ {errors.content}</span>}
        <div className="content-stats">
          <span>{wordCount} words</span>
          <span>·</span>
          <span>{charCount} characters</span>
          <span>·</span>
          <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-submit" disabled={submitting}>
        {submitting ? (
          <>
            <div className="btn-spinner" />
            Publishing...
          </>
        ) : (
          submitLabel || 'Publish Post'
        )}
      </button>
    </form>
  );
}

export default BlogForm;
