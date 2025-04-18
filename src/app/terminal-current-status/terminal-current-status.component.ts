import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-current-status',
  templateUrl: './terminal-current-status.component.html',
  styleUrls: ['./terminal-current-status.component.css'],
  imports: [CommonModule]
})
export class TerminalCurrentStatusComponent {
  file: File | null = null;
  uploadStatus: string = '';
  fileData: any[] = [];
  isProcessing = false;

  constructor(private excelService: ExcelService) {}

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.uploadStatus = '';
      this.fileData = [];
      
      if (this.file.name.endsWith('.json')) {
        this.parseJsonFile(this.file);
      } else if (this.file.name.endsWith('.xlsx') || this.file.name.endsWith('.xls')) {
        this.displayExcelFile(this.file);
      } else {
        this.uploadStatus = 'Unsupported file type';
      }
    }
  }

  private parseJsonFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        this.fileData = JSON.parse(e.target.result);
        this.uploadStatus = 'JSON file loaded successfully';
      } catch (error) {
        this.uploadStatus = 'Error parsing JSON file';
        console.error(error);
      }
    };
    reader.readAsText(file);
  }

  private displayExcelFile(file: File): void {
    this.uploadStatus = 'Processing Excel file...';
    this.isProcessing = true;
    
    this.excelService.uploadExcel(file).subscribe({
      next: (response: any) => {
        if (response?.data?.length > 0) {
          this.fileData = response.data;
          this.uploadStatus = `Processed ${response.data.length} rows`;
        } else {
          this.uploadStatus = response?.message || 'No data received';
        }
        this.isProcessing = false;
      },
      error: (error) => {
        this.uploadStatus = `Error: ${error.message}`;
        console.error('Error:', error);
        this.isProcessing = false;
      }
    });
  }

  uploadData(): void {
    if (this.fileData.length === 0) {
      this.uploadStatus = 'No data to upload';
      return;
    }
  
    this.isProcessing = true;
    this.uploadStatus = 'Uploading data...';
  
    const originalFilename = this.file?.name || 'terminal_data';
    
    this.excelService.uploadJson(this.fileData, originalFilename).subscribe({
      next: (response: any) => {
        this.uploadStatus = `Successfully uploaded ${response.insertedCount} records`;
        this.isProcessing = false;
      },
      error: (error) => {
        this.uploadStatus = `Upload failed: ${error.message}`;
        console.error('Upload error:', error);
        this.isProcessing = false;
      }
    });
  }

  downloadJson(): void {
    if (this.fileData.length === 0) {
      this.uploadStatus = 'No data to download';
      return;
    }

    const jsonStr = JSON.stringify(this.fileData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = this.file?.name.replace(/\.[^/.]+$/, '') + '.json' || 'terminal_data.json';
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    this.uploadStatus = 'JSON download started';
  }

  getHeaders(): string[] {
    if (this.fileData.length === 0) return [];
    
    const allKeys = new Set<string>();
    this.fileData.forEach(row => {
      Object.keys(row).forEach(key => allKeys.add(key));
    });
    
    return Array.from(allKeys);
  }

  formatCellValue(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return value.toString();
  }
}