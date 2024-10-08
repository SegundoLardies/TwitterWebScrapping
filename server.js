import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const client = new TwitterApi({
  appKey: process.env.VITE_TWITTER_API_KEY,
  appSecret: process.env.VITE_TWITTER_API_SECRET,
  accessToken: process.env.VITE_TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.VITE_TWITTER_ACCESS_TOKEN_SECRET,
});

app.get('/api/tweets', async (req, res) => {
  try {
    const { theme } = req.query;
    const result = await client.v2.search(theme, {
      'tweet.fields': ['created_at', 'author_id'],
      max_results: 10,
    });

    const tweets = result.data.data.map((tweet) => ({
      text: tweet.text,
      url: `https://twitter.com/user/status/${tweet.id}`,
    }));

    res.json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Error fetching tweets' });
  }
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});