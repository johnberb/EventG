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
  file: File | null = null; // Stores the selected file
  uploadStatus: string = ''; // Stores upload status messages
  fileData: any[] = []; // Stores parsed file data

  constructor(private excelService: ExcelService) {}

  // Handles file selection
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.uploadStatus = 'File selected: ' + this.file.name;

      // Calls the service to parse the file
      this.excelService.parseExcel(this.file).then((data) => {
        this.fileData = data; // Stores parsed data
        console.log(this.fileData); // Debugging
      }).catch((error) => {
        console.error('Error parsing file:', error);
        this.uploadStatus = 'Error parsing file.';
      });
    }
  }

  // Handles file upload
  uploadFile() {
    if (this.file) {
      // Calls the service to upload the file
      this.excelService.uploadFile(this.file).subscribe({
        next: (response) => {
          this.uploadStatus = 'File uploaded successfully!';
          console.log('Upload response:', response);
        },
        error: (error) => {
          this.uploadStatus = 'Error uploading file.';
          console.error('Upload error:', error);
        },
      });
    } else {
      this.uploadStatus = 'No file selected.';
    }
  }

  // Helper method to get headers (keys) from the first object
  getHeaders(): string[] {
    if (this.fileData.length > 0) {
      return Object.keys(this.fileData[0]);
    }
    return [];
  }

  // Helper method to get values from an object
  getValues(row: any): any[] {
    return Object.values(row);
  }
}