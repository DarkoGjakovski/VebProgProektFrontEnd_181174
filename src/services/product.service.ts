import { Product } from "src/models/product";

export class ProductService{
    products: Product[] = [
        {id: 1,image:'assets/cactus.jpg',title:'Кактус',description:'Цвеќе со боцки в пустина',price:150},
        {id:2,image:'assets/ficus.jpg',title:'Фикус',description:'Фикусче',price:200},
        {id:3,image:'assets/flower.jpg',title:'Бонбончиња',description:'Како шо не ми донесе Стефан',price:300},
        {id:4,image:'assets/hibiskus.jpg',title:'Хибискус',description:'Не знам шо е то',price:100},
        {id:5,image:'assets/rose.jpg',title:'Роза',description:'Црвена',price:500},
        {id:6,image:'assets/cactus.jpg',title:'Кактус',description:'Цвеќе со боцки в пустина',price:150},
        {id:7,image:'assets/ficus.jpg',title:'Фикус',description:'Фикусче',price:200},
        {id:8,image:'assets/flower.jpg',title:'Бонбончиња',description:'Како шо не ми донесе Стефан',price:300},
        {id:9,image:'assets/hibiskus.jpg',title:'Хибискус',description:'Не знам шо е то',price:100},
        {id:10,image:'assets/rose.jpg',title:'Роза',description:'Црвена',price:500},
        {id:11,image:'assets/cactus.jpg',title:'Кактус',description:'Цвеќе со боцки в пустина',price:150},
        {id:12,image:'assets/ficus.jpg',title:'Фикус',description:'Фикусче',price:200},
        {id:13,image:'assets/flower.jpg',title:'Бонбончиња',description:'Како шо не ми донесе Стефан',price:300},
        {id:14,image:'assets/hibiskus.jpg',title:'Хибискус',description:'Не знам шо е то',price:100},
        {id:15,image:'assets/rose.jpg',title:'Роза',description:'Црвена',price:500},
      ]
    
      getProducts(){
          return this.products.slice()
      }
}