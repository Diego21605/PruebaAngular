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
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';
import { HomeComponent } from './Components/home/home.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressComponent } from './Components/progress/progress.component';
import { DndDirective } from './Directives/dnd.directive';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReadCSVComponent,
    CrudComponent,
    SideBarComponent,
    HomeComponent,
    ProgressComponent,
    DndDirective,
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
    SidebarModule,
    MegaMenuModule,
    CardModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    FileUploadModule,
    ChartModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
