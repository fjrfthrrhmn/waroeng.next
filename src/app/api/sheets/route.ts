import { googleSheet, headersSheets } from '@/service/service';
import { v4 as uuidv4 } from 'uuid';

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!;
const SHEET_NAME = 'Sheet1';
const RANGE = `${SHEET_NAME}!A2:F`;

const success = (data: any, message = 'OK', status = 200) => Response.json({ message, data }, { status });
const fail = (message: string, status = 400, error?: unknown) => Response.json({ message, error }, { status });

/**
 * get all data from Google Sheets
 *
 * @param request
 * @returns {Response}
 */
export async function GET(request: Request) {
  try {
    const headers = await headersSheets();
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';

    // get all data
    const { data } = await googleSheet.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      majorDimension: 'ROWS',
    });

    // if data not found
    const rows = data.values;
    if (!rows?.length) return fail('Data tidak ditemukan', 404);

    // mapping data with headers
    const mappedData = rows.map(row => {
      const item: Record<string, string> = {};

      headers.forEach((key, i) => {
        item[key] = row[i] ?? '';
      });
      return item;
    });

    // filter data by query
    const filtered = query
      ? mappedData.filter(item => {
          return Object.values(item).some(value => {
            return value.toLowerCase().includes(query);
          });
        })
      : mappedData;

    // sort data
    filtered.sort((a, b) => {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    return success(filtered, 'Data berhasil diambil');
  } catch (error) {
    return fail('Ups, terjadi kesalahan di server', 500, `${error}`);
  }
}

/**
 * adding data to Google Sheets
 *
 * @param {Request} request
 * @returns {Response}
 */
export async function POST(request: Request) {
  try {
    // get request body
    const requestBody = await request.json();

    // get headers and if is empty
    const headers = await headersSheets();
    if (!headers.length) return fail('Header kolom tidak ditemukan di Google Sheets', 500);

    // validates
    const REQUIRED_FIELDS = ['Name', 'Price'];
    for (const field of REQUIRED_FIELDS) {
      if (!requestBody[field]) {
        return fail(`${field} wajib diisi`, 400);
      }
    }

    // adding ID with uuid v4
    requestBody['ID'] = uuidv4();

    // mapping data with headers
    const row = headers.map(key => requestBody[key] ?? '');

    // append data
    await googleSheet.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:E2`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    return success(requestBody, 'Data berhasil ditambahkan', 201);
  } catch (error) {
    return fail('Ups, terjadi kesalahan di server', 500, `${error}`);
  }
}

/**
 * Delete data by ID from Google Sheets
 *
 * @param request
 * @returns {Response}
 */
export async function DELETE(request: Request) {
  try {
    // Get ID from request body and if is empty
    const { id } = await request.json();
    if (!id) return fail('ID tidak ditemukan', 404);

    // Get all data
    const { data } = await googleSheet.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = data.values || [];

    // Search row by ID and if is not found
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return fail('Data dengan ID tersebut tidak ditemukan', 404);

    const sheetRow = rowIndex + 2; // Because the first row is the header

    // Using batchUpdate to delete row and shift rows up
    await googleSheet.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // default sheet ID
                dimension: 'ROWS',
                startIndex: sheetRow - 1,
                endIndex: sheetRow,
              },
            },
          },
        ],
      },
    });

    return success(null, 'Data berhasil dihapus');
  } catch (error) {
    return fail('Ups, terjadi kesalahan di server', 500, `${error}`);
  }
}

export async function PUT(request: Request) {
  try {
    // get request body
    const { id, ...updates } = await request.json();

    // get headers and if is empty
    const headers = await headersSheets();
    if (!headers.length) return fail('Header kolom tidak ditemukan di Google Sheets', 500);

    // get all data
    const { data } = await googleSheet.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = data.values || [];

    // find row by ID and if is not found
    const rowIndex = rows.findIndex(row => row[0] === id);
    if (rowIndex === -1) return fail('Data dengan ID tersebut tidak ditemukan', 404);

    const existingRow = rows[rowIndex];

    // mapping data with headers
    const updatedRow = headers.map(key => {
      return key in updates ? updates[key] : existingRow[headers.indexOf(key)];
    });

    // get sheet row index + 2, because the first row is the header
    const sheetRow = rowIndex + 2;

    // Update row in place
    await googleSheet.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A${sheetRow}:F${sheetRow}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [updatedRow],
      },
    });

    return success({ id, ...updates }, 'Data berhasil diperbarui');
  } catch (error) {
    return fail('Ups, terjadi kesalahan di server', 500, `${error}`);
  }
}
