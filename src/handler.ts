import { GeminiClient } from './services/geminiClient';
import { EmailService } from './services/emailService';
import { config } from './config';
import { Recipient } from './models/Recipient';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './logger';

export const handler = async (): Promise<void> => {
  try {
    const gemini = new GeminiClient(config.geminiApiKey, config.geminiEndpoint);
    const emailService = new EmailService(config.emailTransport);
    const recipient: Recipient = { email: config.recipientEmail };
    const summaries = await gemini.fetchTopRetailNews();
    await emailService.sendNewsSummary(recipient, summaries);
    logger.info({ event: 'EmailSent', recipient: recipient.email, count: summaries.length });
  } catch (error) {
    errorHandler(error as Error, { function: 'handler' });
  }
};
