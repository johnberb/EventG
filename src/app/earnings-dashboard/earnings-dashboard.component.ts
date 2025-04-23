import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface EarningsData {
  terminalId: string;
  amount: number;
  durationDisplay: string;
  currentStatus: string;
  statusDurationMinutes: number;
}




@Component({
  selector: 'app-earnings-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './earnings-dashboard.component.html',
  styleUrl: './earnings-dashboard.component.css'
})






export class EarningsDashboardComponent implements OnInit {
  earningsData: EarningsData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/data/earnings?limit=5').subscribe({
      next: (data) => {
        this.earningsData = data;
      },
      error: (err) => {
        console.error('Error loading earnings data:', err);
      }
    });
  }
}
