import { NewsSummary } from '../../src/models/NewsSummary';
describe('NewsSummary Model', () => {
  it('should have required fields', () => {
    const summary: NewsSummary = {
      title: 'Test',
      summary: 'Test summary',
      url: 'https://example.com',
      publishedAt: '2025-09-06'
    };
    expect(summary.title).toBeDefined();
    expect(summary.summary).toBeDefined();
    expect(summary.url).toBeDefined();
    expect(summary.publishedAt).toBeDefined();
  });
});
