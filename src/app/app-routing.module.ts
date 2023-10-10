import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ReadCSVComponent } from './Components/read-csv/read-csv.component';
import { CrudComponent } from './Components/crud/crud.component';
import { ValidateToutesGuard } from './Guards/validate-routes.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'ReadCSV', canActivate: [ValidateToutesGuard], component: ReadCSVComponent},
  {path: 'CrudAPI', canActivate: [ValidateToutesGuard], component: CrudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
