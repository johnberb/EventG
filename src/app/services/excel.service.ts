import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as ExcelJS from 'exceljs'; // Import ExcelJS

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
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  // Parse an Excel file using ExcelJS
  parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
  
        workbook.xlsx.load(arrayBuffer)
          .then(() => {
            const worksheet = workbook.worksheets[0]; // Get the first sheet
            if (!worksheet) {
              reject(new Error('No worksheets found in the Excel file.'));
              return;
            }
  
            const jsonData = this.sheetToJson(worksheet); // Convert sheet to JSON
            resolve(jsonData);
          })
          .catch((error) => {
            reject(error);
          });
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  // Helper method to convert a worksheet to JSON
  private sheetToJson(worksheet: ExcelJS.Worksheet): any[] {
    const jsonData: any[] = [];
    const columnCount = worksheet.columnCount; // Get the total number of columns
  
    worksheet.eachRow((row, rowNumber) => {
      const rowData: any[] = [];
      for (let col = 1; col <= columnCount; col++) {
        const cell = row.getCell(col); // Get the cell at the current column
        rowData.push(cell.value === undefined ? '' : cell.value); // Replace undefined with empty string
      }
      jsonData.push(rowData);
    });
  
    return jsonData;
  }

  // Fetch shared file data
  getSharedFile(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/share/${filename}`);
  }

  // Download modified Excel file
  downloadFile(headers: string[], rows: any[], fileName?: string): Observable<any> {
    const payload = { headers, rows, fileName };
    return this.http.post(`${this.apiUrl}/download`, payload);
  }
}