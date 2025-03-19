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
  file: File | null = null; // Variable to store the selected file
  uploadStatus: string = ''; // Variable to store upload status messages
  fileData: any[] = []; // Variable to store parsed file data

  constructor(private excelService: ExcelService) {}

  // Method to handle file selection
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.uploadStatus = 'File selected: ' + this.file.name;

      // Parse the file and display its contents
      this.excelService.parseExcel(this.file).then((data) => {
        this.fileData = data;
      }).catch((error) => {
        console.error('Error parsing file:', error);
        this.uploadStatus = 'Error parsing file.';
      });
    }
  }

  // Method to upload the file
  uploadFile() {
    if (this.file) {
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
}