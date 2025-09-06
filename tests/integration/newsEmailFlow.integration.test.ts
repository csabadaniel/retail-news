import { GeminiClient } from '../../src/services/geminiClient';
import { EmailService } from '../../src/services/emailService';
import { Recipient } from '../../src/models/Recipient';
import { NewsSummary } from '../../src/models/NewsSummary';
describe('News Email Flow Integration', () => {
  it('should fetch news and send email', async () => {
    const gemini = new GeminiClient('test-key', 'https://example.com/api');
    const emailService = new EmailService({
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'user', pass: 'pass' }
    });
    const recipient: Recipient = { email: 'test@example.com' };
    const summaries: NewsSummary[] = await gemini.fetchTopRetailNews();
    await expect(emailService.sendNewsSummary(recipient, summaries)).resolves.toBeUndefined();
  });
});
jest.mock('../../src/services/geminiClient', () => ({
  GeminiClient: jest.fn().mockImplementation(() => ({
    fetchTopRetailNews: jest.fn().mockResolvedValue([
      { title: 'Retail News', summary: 'Summary', url: 'https://example.com', publishedAt: '2025-09-06' }
    ])
  }))
}));

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn().mockResolvedValue(true)
  })
}));
