import { Component } from '@angular/core';
import { EarningsDashboardComponent } from '../earnings-dashboard/earnings-dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [EarningsDashboardComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
