import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TerminalCurrentStatusComponent } from './terminal-current-status/terminal-current-status.component';
import { EarningsDashboardComponent } from './earnings-dashboard/earnings-dashboard.component'

export const routes: Routes = [

    {
        path:'',
        redirectTo: 'dashboard',
        pathMatch:'full'
    },
    {
        path:'login',
       component:LoginComponent
    },
    {
        path:'register',
       component:RegisterComponent
    },
    {
        path:'dashboard',
       component:DashboardComponent ,
       children: [
        { path: 'earnings', component: EarningsDashboardComponent }
      ]   },
       
    {path:'terminal-current-status',
    component:TerminalCurrentStatusComponent}
];
