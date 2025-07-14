import { googleSheets } from '@/lib/api/auth';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_RANGE = 'Sheet1!A2:E2';

export async function GET(request: Request) {
  try {
    // query search parameter
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    // get data from google sheets
    const { data } = await googleSheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:E',
      majorDimension: 'ROWS',
    });

    const rows = data.values;

    // if no data
    if (!rows || rows.length < 2) {
      return Response.json({ message: 'Data tidak ditemukan' }, { status: 404 });
    }

    const [headers, ...entries] = rows;

    // Build structured objects
    const mappedData = entries.map((row, index) => {
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

    return Response.json({ message: 'Data berhasil diambil', data: filtered, dataAll: data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Ups, terjadi kesalahan di server', error: `${error}` }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, price, kilogram, description } = await request.json();
    const requestBody = { name, category, price, kilogram, description };

    // name and prince is required
    if (!name || !price) {
      return Response.json({ message: 'Nama dan harga wajib diisi' }, { status: 400 });
    }

    // convert data to array
    const data = Object.entries(requestBody).map(([key, value]) => ({ key, value }));

    // append data to google sheets
    const values = [[name, category, Number(price), description, kilogram]];
    await googleSheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return Response.json({ message: 'Data berhasil ditambahkan', data }, { status: 201 });
  } catch (error) {
    return Response.json({ message: 'Ups, terjadi kesalahan di server', error: `${error}` }, { status: 500 });
  }
}
