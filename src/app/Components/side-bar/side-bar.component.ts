import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  items: MegaMenuItem[] | undefined;

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command : () => this.router.navigateByUrl('/Home'),
      },
      {
        label: 'Crud Api',
        icon: 'pi pi-th-large',
        command : () => this.router.navigateByUrl('/CrudAPI'),
      },
      {
        label: 'Read CSV',
        icon: 'pi pi-file-import',
        command : () => this.router.navigateByUrl('/ReadCSV'),
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-file-import',
        command : () => {
          localStorage.clear();
          this.router.navigateByUrl('/');
        },
      },
    ];
  }
  
}
