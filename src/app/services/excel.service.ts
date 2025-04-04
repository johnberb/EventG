// excel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Parse Excel file (frontend parsing - if you still need it)
  parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!file || !file.name.endsWith('.xlsx')) {
        reject(new Error('Invalid file type. Please upload an Excel file.'));
        return;
      }

      // If you want to keep frontend parsing, implement it here
      // Otherwise, just call the backend API:
      const formData = new FormData();
      formData.append('excelFile', file);
      
      this.http.post<any[]>(`${this.apiUrl}/upload`, formData).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err)
      });
    });
  }

  // Upload file to backend
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('excelFile', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}