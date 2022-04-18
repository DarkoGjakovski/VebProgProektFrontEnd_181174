import { Product } from "./product";

export class ShoppingCartProduct{
    product: Product = new Product();
    quantity: number = 0;

    constructor(product: Product, quantity: number){
        this.product = product;
        this.quantity = quantity;
    }
}