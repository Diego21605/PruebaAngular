import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CrudService } from 'src/app/Services/Crud/crud.service';
import { MessagesService } from 'src/app/Services/MessagesService/messages.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  formData !: FormGroup;
  infoTable : any [] = [];
  infoSelected : any [] = [];
  @ViewChild('dt') dt : Table | undefined;
  modalEditInfo : boolean = false;
  key : string = '';
  idSelected : number = 0;
  load : boolean = false;

  constructor(private crudService : CrudService,
    private messageService : MessageService,
    private msj : MessagesService,
    private frmBuilder : FormBuilder) {
    
    this.formData = this.frmBuilder.group({
      Id : [null, Validators.required],
      UserId : [null, Validators.required],
      Title : [null, Validators.required],
      Body : [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.searchInformation();
  }

  clearAll(){
    this.infoTable = [];
    this.infoSelected = [];
    this.idSelected = 0;
    this.onReject();
    this.modalEditInfo = false;
    this.key = '';
    this.formData.reset();
    this.load = false;
  }

  searchInformation(){
    this.clearAll();
    this.crudService.GetAll().subscribe(data => this.infoTable = data);
  }

  cargeData(data : any){
    this.key = 'update';
    this.idSelected = data.id;
    this.formData.patchValue({
      Id : data.id,
      UserId : data.userId,
      Title : data.title,
      Body : data.body,
    });
    this.modalEditInfo = true;
  }

  validateForm(){
    if (this.formData.valid){
      if (this.key == 'update') this.sendEditData();
      else this.sendNewData();
    } else this.msj.warningMessage(`¡There are empty fields, please check!`);
  }

  sendEditData(){
    this.load = true;
    let data : any = {
      "userId": this.formData.value.UserId,
      "id": this.formData.value.Id,
      "title": this.formData.value.Title,
      "body": this.formData.value.Body
    }
    this.crudService.Put(this.idSelected, data).subscribe(() => {
      this.msj.successMessage(`¡Updated information has been sent successfully!`);
      this.searchInformation();
    }, () => this.msj.errorMessage(`¡An error occurred while editing the Item information ${this.idSelected}!`));
  }

  sendNewData(){
    this.load = true;
    let data : any = {
      "userId": this.formData.value.UserId,
      "id": this.formData.value.Id,
      "title": this.formData.value.Title,
      "body": this.formData.value.Body
    }
    this.crudService.Post(data).subscribe(() => {
      this.searchInformation();
      this.msj.successMessage(`¡The information has been sent and saved successfully!`);
    }, () => this.msj.errorMessage(`¡An error occurred while trying to save information!`));
  }

  deleteData(id : number = this.idSelected){
    if (this.infoSelected.length == this.infoTable.length) this.deleteAll();
    else {
      this.load = true;
      this.crudService.Delete(id).subscribe(() => {
        this.msj.successMessage(`¡The Item with the Id ${id} has been deleted!`);
        this.searchInformation();
      }, () => this.msj.errorMessage(`¡An error occurred while deleting information!`));
    } 
  }

  deleteAll(){
    this.load = true;
    let count : number = 0;
    this.infoTable.forEach(data => {
      this.crudService.Delete(data.id).subscribe(() => {
        count++;
        if (count == this.infoTable.length) {
          this.searchInformation();
          this.msj.successMessage(`¡All data has been deleted!`);
        }
      })
    });
  }

  showElection(item : any, mode : string){
    this.key = mode;
    this.idSelected = item.id;
    if(this.key == 'delete') this.messageService.add({severity:'warn', key: this.key, summary:`¿Are you sure to delete this item??`, sticky: true});
    else if(this.key == 'update') this.messageService.add({severity:'warn', key: this.key, summary:`¿Be sure to update this item?`, sticky: true});
  }

  onReject = () => this.messageService.clear(this.key);

  filterData = ($event : any, campo : any) => this.dt!.filter(($event.target as HTMLInputElement).value, campo, 'contains');
}