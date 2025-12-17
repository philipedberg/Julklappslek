import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3001;

// Store votes in memory
let votes = {
  avatar: 0,
  mario: 0,
};

app.use(cors());
app.use(express.json());

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

// Reset votes (for testing)
app.post('/api/votes/reset', (req, res) => {
  votes = {
    avatar: 0,
    mario: 0,
  };
  res.json(votes);
});

app.listen(PORT, () => {
  console.log(`Vote server running on http://localhost:${PORT}`);
});
