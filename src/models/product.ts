import { Category } from "./category";

export class Product{
    constructor(
        public id?:number,
        public title?:string,
        public price?:number,
        public image?:string,
        public description?:string,
        public categories?: Category[]
        ){
    }
}

