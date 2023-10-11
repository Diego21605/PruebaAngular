import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private msg : MessagesService,
    private router : Router){

    let usuario : any = localStorage.getItem('user');

    if (![null, undefined].includes(usuario)) this.router.navigate(['/Home']);

    this.formLogin = this.frmBuilder.group({
      UserName: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  validateLogin(){
    if (this.formLogin.valid) {
      let user : string = this.formLogin.value.UserName;
      let pass : string = this.formLogin.value.Password;
      let response : any = this.loginService.postValidataLogin(user, pass);
      if (response) {
        localStorage.setItem('user', 'Admin');
        this.router.navigateByUrl('/Home');
      } else this.msg.errorMessage(`¡The credentials are incorrect, please verify and try again!`);
    } else this.msg.warningMessage(`¡There are empty fields in the form!`);
  }

}
