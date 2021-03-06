import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id?:string;
  

  constructor(private fireauth : AngularFireAuth, private router : Router) { }


  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        
        
        

        if(res.user?.emailVerified == true) {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('id',res.user.uid);
        } else {
          this.router.navigate(['/varify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  
async register(email : string, password : string) {
    try{
      const data= await this.fireauth.createUserWithEmailAndPassword(email, password)
      alert('Registration Successful');
      this.sendEmailForVarification(data.user);
      this.router.navigate(['/login']);
      this.id=data.user?.uid;
    }
    catch(error){
      alert("Somthing went wrong");
    }

}


  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }


  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }


  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

 
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
}
