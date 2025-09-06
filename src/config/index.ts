import dotenv from 'dotenv';
dotenv.config();

export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiEndpoint: process.env.GEMINI_ENDPOINT || '',
  emailFrom: process.env.EMAIL_FROM || '',
  emailTransport: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  },
  recipientEmail: process.env.RECIPIENT_EMAIL || '',
  fetchInterval: process.env.FETCH_INTERVAL || 'daily',
  fetchTime: process.env.FETCH_TIME || '08:00'
};
