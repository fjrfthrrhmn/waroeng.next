import { googleSheets, headersSheets } from '@/service/service';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_RANGE = 'Sheet1!A2:E2';

export async function GET(request: Request) {
  try {
    const headers = await headersSheets();

    // query search parameter
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    // get data from google sheets
    const { data } = await googleSheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:Z',
      majorDimension: 'ROWS',
    });

    const rows = data.values;

    // if no data
    if (!rows?.length) {
      return Response.json({ message: 'Data tidak ditemukan' }, { status: 404 });
    }

    // Build structured objects
    const mappedData = rows.map((row, index) => {
      const item: Record<string, string | number> = { id: index };

      headers.forEach((key, i) => {
        item[key] = row[i] ?? null;
      });

      return item;
    });

    // filter data by query
    const filtered = query
      ? mappedData.filter(item => {
          return Object.values(item).some(value => {
            return String(value).toLowerCase().includes(query);
          });
        })
      : mappedData;

    return Response.json({ message: 'Data berhasil diambil', data: filtered }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Ups, terjadi kesalahan di server', error: `${error}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const headers = await headersSheets();

    // if no headers
    if (!headers.length) {
      return Response.json({ message: 'Header kolom tidak ditemukan di Google Sheets' }, { status: 500 });
    }

    // name and price is required
    if (!requestBody.Name || !requestBody.Price) {
      return Response.json({ message: 'Nama dan harga wajib diisi' }, { status: 400 });
    }

    // build row
    const row = headers.map(item => {
      const value = requestBody[item];
      return typeof value === 'string' ? value : '';
    });

    // append data to google sheets
    await googleSheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return Response.json({ message: 'Data berhasil ditambahkan', data: requestBody }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Ups, terjadi kesalahan di server', error: `${error}` }, { status: 500 });
  }
}
