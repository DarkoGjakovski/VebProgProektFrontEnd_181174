import { Product } from "src/models/product";

export class ProductService{
    products: Product[] = [
        {id: 1,image:'assets/cactus.jpg',title:'Кактус',description:'Цвеќе со боцки в пустина',price:150},
        {id:2,image:'assets/ficus.jpg',title:'Фикус',description:'Фикусче',price:200},
        {id:3,image:'assets/flower.jpg',title:'Бонбончиња',description:'Како шо не ми донесе Стефан',price:300},
        {id:4,image:'assets/hibiskus.jpg',title:'Хибискус',description:'Не знам шо е то',price:100},
        {id:5,image:'assets/rose.jpg',title:'Роза',description:'Црвена',price:500},
      ]
    
      getProducts(){
          return this.products.slice()
      }
}