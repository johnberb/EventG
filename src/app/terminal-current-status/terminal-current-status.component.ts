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

  constructor(private excelService: ExcelService) {}

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.uploadStatus = `File selected: ${this.file.name}`;

      this.excelService.parseExcel(this.file).then((data: any[]) => {
        this.fileData = data;
      }).catch((error: any) => {
        console.error('Error:', error);
        this.uploadStatus = 'Error parsing file';
        this.fileData = [];
      });
    }
  }

  uploadFile(): void {
    if (this.file) {
      this.excelService.uploadFile(this.file).subscribe({
        next: (response) => {
          this.uploadStatus = 'Upload successful!';
        },
        error: (error) => {
          this.uploadStatus = 'Upload failed';
          console.error('Upload error:', error);
        }
      });
    }
  }

  downloadJson(): void {
    if (this.fileData.length === 0) {
      this.uploadStatus = 'No data to download';
      return;
    }

    try {
      // Convert data to JSON string
      const jsonString = JSON.stringify(this.fileData, null, 2);
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = 'terminal_data.json';
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      this.uploadStatus = 'JSON download started!';
    } catch (error) {
      console.error('Error generating JSON:', error);
      this.uploadStatus = 'Error generating download';
    }
  }

  getHeaders(): string[] {
    return this.fileData.length > 0 ? Object.keys(this.fileData[0]) : [];
  }
}