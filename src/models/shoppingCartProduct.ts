import { Product } from "./product";

export class ShoppingCartProduct{
    id: number = 0;
    product: Product = new Product();
    quantity: number = 0;

    constructor(id: number, product: Product, quantity: number){
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }
}