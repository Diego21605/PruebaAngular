import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/Login/login.service';
import { MessagesService } from 'src/app/Services/MessagesService/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin : FormGroup;
  load : boolean = false;

  constructor(private frmBuilder : FormBuilder,
    private loginService : LoginService,
    private msg : MessagesService,){

    this.formLogin = this.frmBuilder.group({
      UserName: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  validateLogin(){
    if (this.formLogin.valid) {
      let user : string = this.formLogin.value.UserName;
      let pass : string = this.formLogin.value.Password;
      let response : any = this.loginService.postValidataLogin(user, pass);
      if (response) true;
      else this.msg.errorMessage(`¡Las credenciales son incorrectas, por favor verifique e intente de nuevo!`);
    } else this.msg.warningMessage(`¡Hay campos vacios en el formulario!`);
  }

}
