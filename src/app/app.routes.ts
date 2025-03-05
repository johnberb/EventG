import { Routes } from '@angular/router';
import {LoginComponent} from "../pages/login/loginComponent";


export const routes: Routes = [

    {
        path:'',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path:'login',
       component:LoginComponent
    }
];
