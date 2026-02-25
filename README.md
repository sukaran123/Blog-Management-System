# ✦ Inkwell — MERN Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js.  
Features a dark editorial aesthetic with smooth animations, full CRUD operations, and a responsive design.

---

## 🗂 Project Structure

```
blog-app/
├── backend/               # Express.js + MongoDB API
│   ├── models/
│   │   └── Blog.js        # Mongoose Blog schema
│   ├── routes/
│   │   └── blogRoutes.js  # REST API routes
│   ├── server.js          # Entry point
│   ├── .env.example       # Environment variables template
│   └── package.json
│
└── frontend/              # React.js app
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx / .css
    │   │   ├── BlogCard.jsx / .css
    │   │   └── BlogForm.jsx / .css
    │   ├── pages/
    │   │   ├── Home.jsx / .css        # Listing page
    │   │   ├── BlogDetail.jsx / .css  # Single post view
    │   │   ├── CreateBlog.jsx         # Create form
    │   │   ├── EditBlog.jsx           # Edit form
    │   │   └── FormPage.css           # Shared form styles
    │   ├── styles/
    │   │   └── global.css             # Design system & tokens
    │   ├── api.js                     # Axios API helper
    │   ├── App.jsx                    # Router setup
    │   └── index.js                   # Entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### 1. Clone / Extract the project

```bash
cd blog-app
```

---

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp
```

Start the backend:
```bash
npm start
# or for development with auto-reload:
npm run dev   # (requires: npm install -g nodemon)
```

The API will run at **http://localhost:5000**

---

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:
```bash
npm start
```

The app will open at **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/blogs       | Get all blogs      |
| POST   | /api/blogs       | Create a new blog  |
| GET    | /api/blogs/:id   | Get single blog    |
| PUT    | /api/blogs/:id   | Update a blog      |
| DELETE | /api/blogs/:id   | Delete a blog      |

### Blog Schema
```json
{
  "title": "string (required, max 200)",
  "content": "string (required)",
  "author": "string (required)",
  "thumbnail": "string (optional, URL)",
  "excerpt": "string (auto-generated)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

## ✨ Features

- **Create** posts with title, content, author, and optional cover image
- **List** all posts in a beautiful card grid with search
- **View** full post on a dedicated detail page
- **Edit** posts with pre-filled form
- **Delete** posts with confirmation modal
- **Animations** — page transitions, hover effects, floating orbs, hero animations
- **Responsive** — works on mobile, tablet, and desktop
- **Form validation** — client-side with helpful error messages
- **Loading/error states** — throughout the app
- **Auto-excerpt** — auto-generated from content on the server
- **Read time** — estimated reading time per post

---

## 🎨 Design

- **Theme**: Dark editorial / luxury journal aesthetic
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Colors**: Deep navy-black with gold accent (#e8b86d)
- **Animations**: CSS keyframes, staggered card reveals, floating orbs, scroll indicator
