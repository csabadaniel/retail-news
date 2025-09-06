import nodemailer from 'nodemailer';
import { Recipient } from '../models/Recipient';
import { NewsSummary } from '../models/NewsSummary';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: any) {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendNewsSummary(recipient: Recipient, summaries: NewsSummary[]): Promise<void> {
    const html = summaries.map(s => `<h3>${s.title}</h3><p>${s.summary}</p><a href='${s.url}'>Read more</a>`).join('<hr/>');
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: recipient.email,
      subject: 'UK Retail News Summary',
      html
    });
  }
}
