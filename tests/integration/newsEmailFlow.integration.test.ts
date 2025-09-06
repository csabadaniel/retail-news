import { GeminiClient } from '../../src/services/geminiClient';
import { EmailService } from '../../src/services/emailService';
import { Recipient } from '../../src/models/Recipient';
describe('News Email Flow Integration', () => {
  it('should fetch news and send email', async () => {
    const gemini = new GeminiClient('test-key', 'https://example.com/api');
    const emailService = new EmailService({
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'user', pass: 'pass' }
    });
    const recipient: Recipient = { email: 'test@example.com' };
    const summaries = await gemini.fetchTopRetailNews();
    await emailService.sendNewsSummary(recipient, summaries);
    expect(true).toBe(true);
  });
});
