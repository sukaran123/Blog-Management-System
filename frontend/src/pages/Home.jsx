import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../api';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs();
      setBlogs(res.data.data);
    } catch (err) {
      setError('Failed to load blogs. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>
        <div className="container hero__content">
          <div className="hero__eyebrow">
            <span className="tag">The Inkwell Journal</span>
          </div>
          <h1 className="hero__title">
            Stories worth<br />
            <em>reading.</em>
          </h1>
          <p className="hero__subtitle">
            A curated space for ideas, perspectives, and long-form thinking.
          </p>
          <div className="hero__actions">
            <Link to="/create" className="btn btn-primary">
              Start Writing
            </Link>
            <a href="#blogs" className="btn btn-ghost">
              Browse Posts
            </a>
          </div>
        </div>
        <div className="hero__scroll">
          <div className="scroll-indicator" />
        </div>
      </section>

      {/* Blog listing */}
      <section className="blogs-section container" id="blogs">
        <div className="blogs-header">
          <h2 className="blogs-heading">Latest Posts</h2>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search posts..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading && (
          <div className="spinner-wrap">
            <div className="spinner" />
            <p>Loading posts...</p>
          </div>
        )}

        {error && !loading && (
          <div className="state-card">
            <span className="state-icon">⚠</span>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-secondary" onClick={fetchBlogs}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state-card">
            <span className="state-icon">✦</span>
            <h3>{search ? 'No results found' : 'No posts yet'}</h3>
            <p>{search ? `No posts match "${search}"` : 'Be the first to share your story.'}</p>
            {!search && (
              <Link to="/create" className="btn btn-primary">
                Write First Post
              </Link>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="blogs-grid">
              {filtered.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>
            <p className="blogs-count">
              {filtered.length} post{filtered.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
            </p>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
