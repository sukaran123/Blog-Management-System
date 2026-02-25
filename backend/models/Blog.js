const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Auto-generate excerpt from content before saving
blogSchema.pre('save', function (next) {
  if (this.content && !this.excerpt) {
    this.excerpt = this.content.substring(0, 160) + (this.content.length > 160 ? '...' : '');
  }
  next();
});

blogSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.content) {
    update.excerpt = update.content.substring(0, 160) + (update.content.length > 160 ? '...' : '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
