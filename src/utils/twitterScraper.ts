import axios from 'axios';
import { Tweet, Insight } from '../types';

const API_URL = 'http://localhost:3001/api/tweets';

export const scrapeTweets = async (theme: string): Promise<Tweet[]> => {
  try {
    const response = await axios.get(API_URL, { params: { theme } });
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
};

export const generateInsights = (tweets: Tweet[]): Insight[] => {
  const insights: Insight[] = tweets.map((tweet) => ({
    text: `Insight: ${tweet.text.substring(0, 100)}...`,
    link: tweet.url,
  }));

  return insights;
};