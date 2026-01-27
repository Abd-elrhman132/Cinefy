# Cinefy 🎬

**Cinefy** is a modern, minimal movie tracking application built with React. It allows users to search for movies, view details, and track their watched list with personal ratings.

## ✨ Features

- **Search Movies**: Real-time search using the OMDb API.
- **Movie Details**: View plot, cast, director, and ratings.
- **Watch List**: Add movies to your personal watched list.
- **Rating System**: Rate movies and track your user score vs. IMDb.
- **Stats Summary**: See total watched time and average ratings.
- **Persistent Data**: Your watched list is saved locally in your browser.
- **Dark Mode UI**: A sleek, "Slate & Violet" glassmorphism interface.

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- An API Key from [OMDb API](http://www.omdbapi.com/apikey.aspx) (Free)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/cinefy.git
    cd cinefy
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure API Key**
    Create a `.env.local` file in the root directory and add your OMDb API key:
    ```env
    REACT_APP_OMDB_KEY=your_api_key_here
    ```

4.  **Start the app**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🛠️ Built With

- **React 18** - UI Library
- **CSS3** - Custom styling (Variables, Flexbox, Grid, Glassmorphism)
- **OMDb API** - Movie Data

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

This creates a `build` folder with optimized static assets ready for deployment (e.g., Vercel, Netlify).