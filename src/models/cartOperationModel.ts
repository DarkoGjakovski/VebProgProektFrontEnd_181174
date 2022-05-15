export class cartOperationModel{
    userId: number = 0;
    productId: number = 0;

    constructor(userId: number, productId: number){
        this.productId = productId;
        this.userId = userId;
    }
}