import { GeminiClient } from '../../src/services/geminiClient';
describe('GeminiClient contract', () => {
  it('should fetch retail news summaries', async () => {
    const client = new GeminiClient('test-key', 'https://example.com/api');
    // Mock axios or use a test endpoint
    const summaries = await client.fetchTopRetailNews();
    expect(Array.isArray(summaries)).toBe(true);
  });
});
