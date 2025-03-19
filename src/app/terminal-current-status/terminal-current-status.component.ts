import { Component } from '@angular/core';
import { ExcelService } from '.././services/excel.service'; // Adjust the path as needed



@Component({
  selector: 'app-terminal-current-status',
 
  templateUrl: './terminal-current-status.component.html',
  styleUrls: ['./terminal-current-status.component.css'],
})
export class TerminalCurrentStatusComponent {
  file: File | null = null; // Variable to store the selected file
  uploadStatus: string = ''; // Variable to store upload status messages

  constructor(private excelservice: ExcelService) {}

  // Method to handle file selection
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      this.uploadStatus = 'File selected: ' + this.file.name;
    }
  }

  // Method to upload the file
  uploadFile() {
    if (this.file) {
      this.excelservice.uploadFile(this.file).subscribe({
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