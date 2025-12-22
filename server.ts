import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store votes in memory
let votes = {
  avatar: 0,
  mario: 0,
};

app.use(cors());
app.use(express.json());

// Serve static files from the dist folder (for production)
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
// GET current votes
app.get('/api/votes', (req, res) => {
  res.json(votes);
});

// POST a vote
app.post('/api/votes', (req, res) => {
  const { movie } = req.body;

  if (movie === 'avatar') {
    votes.avatar += 1;
  } else if (movie === 'mario') {
    votes.mario += 1;
  } else {
    return res.status(400).json({ error: 'Invalid movie' });
  }

  res.json(votes);
});

// DELETE to reset votes
app.delete('/api/votes', (req, res) => {
  votes = {
    avatar: 0,
    mario: 0,
  };
  res.json(votes);
});

// Reset votes (for testing - kept for backward compatibility)
app.post('/api/votes/reset', (req, res) => {
  votes = {
    avatar: 0,
    mario: 0,
  };
  res.json(votes);
});

// Serve the frontend for all other routes (SPA fallback)
// Use `app.use` to avoid path-to-regexp parsing issues with '*' wildcard
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎄 Vote server running on http://localhost:${PORT}`);
});
