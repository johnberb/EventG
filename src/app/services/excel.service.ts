import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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