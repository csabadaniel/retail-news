import { NewsSummary } from '../models/NewsSummary';
import axios from 'axios';

export class GeminiClient {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string, endpoint: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async fetchTopRetailNews(): Promise<NewsSummary[]> {
    // Placeholder: Replace with actual Gemini API call
    const response = await axios.get(this.endpoint, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    // Transform response to NewsSummary[]
    return response.data.articles.map((article: any) => ({
      title: article.title,
      summary: article.summary,
      url: article.url,
      publishedAt: article.publishedAt
    }));
  }
}
