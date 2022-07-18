import { Timestamp } from "rxjs";

export interface Item{
    
    id?:string;
    title?:string;
    description?:string;
    createdAt?:Date;
    updatedAt?:Date;
  }