import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { LoginComponent } from '../pages/login/login.component'; // Adjust the path as necessary

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    LoginComponent // Add FormsModule to imports array
  ],
  providers: []
  
})
export class AppModule { }