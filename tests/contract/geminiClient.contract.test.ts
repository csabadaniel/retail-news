// Mock axios at the top of the file
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      articles: [
        {
          title: 'Mock Retail News',
          summary: 'Mock summary',
          url: 'https://example.com',
          publishedAt: '2025-09-06'
        }
      ]
    }
  })
}));

import { GeminiClient } from '../../src/services/geminiClient';
import axios from 'axios';

describe('GeminiClient contract', () => {
  let client: GeminiClient;

  beforeEach(() => {
    client = new GeminiClient('test-api-key', 'https://api.example.com');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch retail news summaries', async () => {
    const summaries = await client.fetchTopRetailNews();

    // Assert on primitive values only - avoid circular references
    expect(Array.isArray(summaries)).toBe(true);
    expect(summaries).toHaveLength(1);
    expect(summaries[0].title).toBe('Mock Retail News');
    expect(summaries[0].summary).toBe('Mock summary');
    expect(summaries[0].url).toBe('https://example.com');
    expect(summaries[0].publishedAt).toBe('2025-09-06');
    
    // Verify API call was made
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.example.com', {
      headers: { 'Authorization': 'Bearer test-api-key' }
    });
  });

  it('should handle API errors', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API request failed'));

    await expect(client.fetchTopRetailNews())
      .rejects
      .toThrow('API request failed');
  });
});
