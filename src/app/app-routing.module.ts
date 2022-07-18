import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { Router } from '@angular/router';
  import {
   // canActivate,
    redirectUnauthorizedTo,
    redirectLoggedInTo,
  
 } from '@angular/fire/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component';
 const redirectToLogin = () => redirectUnauthorizedTo(['login']);
 const redirectToHome = () => redirectLoggedInTo(['dashboard']);
const routes: Routes = [
  {path: '', pathMatch:'full' ,redirectTo:'login'},
  {path:'login' ,component:LoginComponent,
     canActivate:[LoginGuard]
  
 },
  {path: 'dashboard', component : DasboardComponent,
   canActivate:[AuthGuard]
     
},
 {path: 'register', component : RegisterComponent,
 canActivate:[LoginGuard]

},
 {path: 'varify-email', component : VerifyEmailComponent,
 canActivate:[LoginGuard]},
 {path: 'forgot-password', component : ForgotPasswordComponent,
 canActivate:[LoginGuard]},
 {path:'**',component:NotFoundComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
