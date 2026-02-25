const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blogs - Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// GET /api/blogs/:id - Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST /api/blogs - Create blog
router.post('/', async (req, res) => {
  try {
    const { title, content, author, thumbnail } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: 'Title, content, and author are required' });
    }
    const blog = await Blog.create({ title, content, author, thumbnail });
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Validation error', error: err.message });
  }
});

// PUT /api/blogs/:id - Update blog
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author, thumbnail } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ success: false, message: 'Title, content, and author are required' });
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, thumbnail },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Validation error', error: err.message });
  }
});

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
