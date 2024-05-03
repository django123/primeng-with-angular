import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logingForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private mesgService: MessageService 
  ){}

  get email(){
    return this.logingForm.controls['email'];
  }
  get password(){
    return this.logingForm.controls['password'];
  }

  loginUser(){
    const {email, password} = this.logingForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          sessionStorage.setItem('email', email as string);
          this.router.navigate(['/home']);
        } else{
          this.mesgService.add({severity:'error', summary:'Error', detail:'Email or password is wrong'});
        }
      }, 
      error =>{
        this.mesgService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
      }
    )
  }

}
