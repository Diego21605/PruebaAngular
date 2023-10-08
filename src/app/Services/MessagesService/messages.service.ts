import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private messageService: MessageService,) { }

  errorMessage = (title : string, details : string = '', time : number = 3000) => this.messageService.add({severity:'error', summary: title, detail: details, life: time });

  warningMessage = (title : string, details : string = '', time : number = 3000) => this.messageService.add({severity:'warn', summary: title, detail: details, life: time });

  successMessage = (title : string, details : string = '', time : number = 3000) => this.messageService.add({severity:'success', summary: title, detail: details, life: time });
}
