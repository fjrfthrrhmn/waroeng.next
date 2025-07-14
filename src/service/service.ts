import { google } from 'googleapis';

export const authClient = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const googleSheets = google.sheets({ version: 'v4', auth: authClient });

export const headersSheets = async () => {
  const res = await googleSheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: 'Sheet1!A1:Z',
  });

  const headers = res.data.values?.[0] || [];
  return headers;
};
