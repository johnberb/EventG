import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Upload an Excel file
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError((error) => {
        console.error('Upload failed:', error);
        return throwError(error);
      })
    );
  }

  // Parse an Excel file using ExcelJS
  parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!file || !file.name.endsWith('.xlsx')) {
        reject(new Error('Invalid file type. Please upload an Excel file.'));
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const workbook = new ExcelJS.Workbook();

        workbook.xlsx.load(arrayBuffer)
          .then(() => {
            const worksheet = workbook.worksheets[0];
            if (!worksheet) {
              reject(new Error('No worksheets found in the Excel file.'));
              return;
            }

            const jsonData = this.sheetToJson(worksheet); // Convert sheet to JSON
            resolve(jsonData);
          })
          .catch((error) => {
            console.error('Error parsing Excel file:', error);
            reject(error);
          });
      };
      fileReader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  // Helper method to convert a worksheet to JSON
  private sheetToJson(worksheet: ExcelJS.Worksheet): any[] {
    const jsonData: any[] = [];
    const headers: string[] = [];

    // Get headers from the first row
    const firstRow = worksheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      headers.push(cell.text); // Use the cell text as the header
    });

    // Iterate over the remaining rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip the header row

      const rowData: any = {};
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber - 1]; // Get the corresponding header
        let value = cell.value === undefined ? null : cell.value;

        // Convert "Duration in the Current Status (Mins)" to "X hr Y mins"
        if (header === 'Duration in the Current Status (Mins)' && typeof value === 'number') {
          value = this.convertMinutesToHoursMins(value);
        }

        rowData[header] = value; // Add the value to the row data
      });
      jsonData.push(rowData); // Add the row data to the JSON array
    });

    return jsonData;
  }

  // Helper method to convert minutes to "X hr Y mins" format
  private convertMinutesToHoursMins(minutes: number): string {
    if (isNaN(minutes) || minutes < 0) {
      return 'Invalid duration';
    }

    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60); // Round off the minutes

    if (hours === 0) {
      return `${mins} mins`;
    } else if (mins === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${mins} mins`;
    }
  }

  // Fetch shared file data
  getSharedFile(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/share/${filename}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch shared file:', error);
        return throwError(error);
      })
    );
  }

  // Download modified Excel file
  downloadFile(headers: string[], rows: any[], fileName?: string): Observable<any> {
    const payload = { headers, rows, fileName };
    return this.http.post(`${this.apiUrl}/download`, payload).pipe(
      catchError((error) => {
        console.error('Failed to download file:', error);
        return throwError(error);
      })
    );
  }
}