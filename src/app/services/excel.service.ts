import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  uploadExcel(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload-excel`, formData).pipe(
      catchError(this.handleError)
    );
  }

  uploadJson(jsonData: any, originalFilename: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/data/upload-json`, { // Note /data/ prefix
      data: jsonData,
      originalFilename: originalFilename
    }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error ${error.status}: ${error.error?.message || error.message}`;
    }

    console.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}