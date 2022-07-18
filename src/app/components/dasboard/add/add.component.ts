import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/modal/item';
import { ItemService } from 'src/app/shared/item.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  item:Item={
    title:'',
    description:'',
    

  }

  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.item.title!='' && this.item.description!=''){
       this.itemService.addItem(this.item,new Date());
       this.item.title='';
       this.item.description='';

    }
  }


}
