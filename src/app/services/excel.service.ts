// excel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  parseExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.apiUrl}/upload-excel`, formData).pipe(
      catchError(error => {
        console.error('API Error:', error);
        throw new Error('Failed to parse Excel file. Status: ' + error.status);
      })
    );
  }

  uploadJson(jsonData: any, originalFilename: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-json`, {
      data: jsonData,
      originalFilename: originalFilename
    });
  }

  downloadJson(): Observable<any> {
    return this.http.get(`${this.apiUrl}/download-json`, {
      responseType: 'blob'
    });
  }
}