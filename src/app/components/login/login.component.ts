import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
    
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
   
    },
   
  );


  constructor(private auth : AuthService,
    private user:UserService) { }

  ngOnInit(): void {
  }

  login() {
    
   
    this.auth.login(this.loginForm.value.email!,this.loginForm.value.password!);
    const u={email:this.loginForm.value.email};
    localStorage.setItem('email',this.loginForm.value.email!);
    this.loginForm.reset();


  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
