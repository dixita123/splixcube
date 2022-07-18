import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }

    return null;
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  name:string=''
  email : string = '';
  password : string = '';
  id:string='';

  constructor(private auth : AuthService,
    private user:UserService) { }

  ngOnInit(): void {
  }

  async register() {

    if (!this.signUpForm.valid) return;

    await this.auth.register(this.signUpForm.value.email!,this.signUpForm.value.password!);
    
    const u={name:this.signUpForm.value.name!,email:this.signUpForm.value.email!};
    
    this.user.addUser(u);
   this.signUpForm.reset();
}
}