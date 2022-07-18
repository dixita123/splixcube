import { Injectable } from '@angular/core';
import { User } from '../modal/user';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { doc, setDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  u!:string;
  UsersCollection!: AngularFirestoreCollection<any>;
  users!: Observable<any[]>;
  userDoc!:AngularFirestoreDocument<any>

  constructor(
    public afs:AngularFirestore, private auth:AuthService
  ) { 
  this.UsersCollection=this.afs.collection('users', ref=>ref.orderBy('updatedAt','asc'));
  this.users=this.afs.collection('users').snapshotChanges().pipe(
    map((changes)=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as User;
        data.uid=a.payload.doc.id;
       
        return data;
      })
}));

}
getUsers(){
 
  return this.users.pipe(catchError(this.handleError));
  
}

handleError(error:any){
  console.log(error+"this is my error");
  
  return throwError(error.message||"Something went wrong");
}

async addUser(user:User){
  try
  {
    
    user.uid=this.auth.id;
    console.log("here i am"+user+user.uid);
    await this.afs.collection("users").doc(user.uid).set(user);
  }
  catch(error){
    alert(error)
  }
}
updateStorage(user:User){
  try{
  
    
    this.userDoc=this.afs.doc(`users/${user.uid}`);
  
  }
   catch(error){
     alert(error);
  }
}


}
