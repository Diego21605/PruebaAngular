import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { CrudComponent } from './Components/crud/crud.component';
import { LoginComponent } from './Components/login/login.component';
import { ReadCSVComponent } from './Components/read-csv/read-csv.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReadCSVComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,   
    InputTextModule, 
    PasswordModule,
    ButtonModule,
    AutoFocusModule,
		ToastModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
