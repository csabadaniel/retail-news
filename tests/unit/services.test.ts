import { GeminiClient } from '../../src/services/geminiClient';
describe('GeminiClient Service', () => {
  it('should instantiate', () => {
    const client = new GeminiClient('key', 'endpoint');
    expect(client).toBeInstanceOf(GeminiClient);
  });
});
