import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm  = new FormGroup({
    userName: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required)
  })
  invalid: boolean = false;

  constructor(private api:ApiService,private router: Router){}

  login(){
    const payload = {username: this.loginForm.get('userName')?.value, password: this.loginForm.get('pass')?.value}
    this.api.login('/login',payload).subscribe((res: any) => {
      if(res){
        this.invalid = false;
        localStorage.setItem('user',res.data?.uid);
        this.router.navigate(['/home'])
      }
    },(err: any) => {
      this.invalid = true;
    })
  }
}
