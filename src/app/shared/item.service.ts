import { Injectable } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { where } from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Item } from '../modal/item';
import { User } from '../modal/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  itemsCollection!: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc!:AngularFirestoreDocument<Item>
   id=localStorage.getItem('id') ;
 
  constructor(
    public afs:AngularFirestore,
    private userService:UserService,
    private auth:AuthService
  ) { 
    
    console.log("--------"+this.id);
    
    this.itemsCollection=this.afs.collection('users', ref=>ref.orderBy('createdAt','asc')).doc(this.id!).collection('todo');
    this.items=this.afs.collection('users',ref=>ref.orderBy('createdAt','asc')).doc(this.id!).collection('todo').snapshotChanges().pipe(
      map((changes)=>{
        return changes.map(a=>{
          const data=a.payload.doc.data() as Item;
          data.id=a.payload.doc.id;
          
          return data;
        })
  }));
  
  
  }
  
  getItems(){
    return this.items.pipe(catchError(this.handleError));
    
  }

  handleError(error:any){
    console.log(error+"this is my error"); 
    return throwError(error.message||"Something went wrong");
  }

  addItem(item:Item,time:Date){
    try{
      item.createdAt=time;
      item.updatedAt=time;
      this.itemsCollection.add(item);
    }
    catch(error){
      alert(error)
    }
  }
  deleteItem(item:Item){
      try{
        console.log(`users/${this.id}/todo/${item.id}`);
        
        this.itemDoc=this.afs.doc(`users/${this.id}/todo/${item.id}`);
      this.itemDoc.delete();
      }
      catch(error){
        alert(error);
      }
  }
  
  updateItem(item:Item){
    try{
      item.updatedAt=new Date();
      this.itemDoc=this.afs.doc(`users/${this.id}/todo/${item.id}`);
      this.itemDoc.update(item)
    }
     catch(error){
       alert(error);
    }
  }
}
