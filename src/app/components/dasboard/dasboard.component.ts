import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/modal/item';
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {


  item:Item={
    title:'',
    description:'',
    

  }
  items!: Item[];
   editState:boolean=false;
   itemToEdit!: Item;
   isLoading:boolean=true;
   error!:string;

  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    console.log('ngOninit run');
    
    this.itemService.getItems().subscribe(items=>{
      this.items=items;
      this.isLoading=false;
      
    },(error)=>{
      console.log(error);
      this.error=error;
      
    });
  }

  deleteItem(event:any,item:any){
    this.itemService.deleteItem(item);
}

editItem(event:any,item:any){
    this.editState=true;
    this.itemToEdit=item;
}
updateItem(item:any){
    try{
      this.itemService.updateItem(item);
      this.clearState();
    }
    catch(error){
        return error;
    }
}
clearState(){
  this.editState=false;
  this.itemToEdit={};
}



}
