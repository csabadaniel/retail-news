// Mock nodemailer at the top of the file
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'test-message-id',
      response: '250 OK'
    })
  })
}));

import { EmailService } from '../../src/services/emailService';
import { Recipient } from '../../src/models/Recipient';
import { NewsSummary } from '../../src/models/NewsSummary';
import nodemailer from 'nodemailer';

describe('EmailService contract', () => {
  let emailService: EmailService;
  let mockTransport: any;

  beforeEach(() => {
    mockTransport = {
      sendMail: jest.fn().mockResolvedValue({
        messageId: 'test-message-id',
        response: '250 OK'
      })
    };
    
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransport);
    
    emailService = new EmailService({
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'user', pass: 'pass' }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send news summary email', async () => {
    const recipient: Recipient = { email: 'test@example.com' };
    const summaries: NewsSummary[] = [{
      title: 'Test News',
      summary: 'Test summary content',
      url: 'https://example.com',
      publishedAt: '2025-09-06'
    }];

    await emailService.sendNewsSummary(recipient, summaries);

    // Assert on primitive values only
    expect(mockTransport.sendMail).toHaveBeenCalledTimes(1);
    
    // Verify the email content structure without circular references
    const callArgs = mockTransport.sendMail.mock.calls[0][0];
    expect(callArgs.to).toBe('test@example.com');
    expect(callArgs.subject).toBe('UK Retail News Summary');
    expect(callArgs.html).toContain('Test News');
  });

  it('should handle email sending errors', async () => {
    const recipient: Recipient = { email: 'test@example.com' };
    const summaries: NewsSummary[] = [];
    
    mockTransport.sendMail.mockRejectedValue(new Error('SMTP connection failed'));

    await expect(emailService.sendNewsSummary(recipient, summaries))
      .rejects
      .toThrow('SMTP connection failed');
  });
});
