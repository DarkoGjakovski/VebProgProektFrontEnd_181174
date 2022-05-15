import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-filtercard',
  templateUrl: './filter.card.component.html',
  styleUrls: ['./filter.card.component.css']
})
export class FilterCardComponent implements OnInit {

  rangeunder500: boolean = false;
  color: string = 'primary';
  selectedSort: string = '';
  selectedPrice: number = 0;
  selectedOccasion: string = '';
  selectedColor: string = '';

  constructor(private productService: ProductService, private  activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  updateAllComplete(){}

  changeSort(event: any){
    this.productService.sortChange.emit(event)
  }

  filterProducts(){
    this.productService.filterProducts(this.selectedOccasion,this.selectedColor).subscribe(newProductList => {
      console.log(newProductList)

      if(this.selectedOccasion == "" && this.selectedColor == ""){
          this.productService.getProducts(this.activeRoute.snapshot.queryParamMap.get('c')!).subscribe(updatedList => {
            newProductList = updatedList;
            if(this.selectedSort == "asc"){
              newProductList.sort((a, b) => Number(a.price) - Number(b.price));
            }else if(this.selectedSort == "des"){
              newProductList.sort((a, b) => Number(b.price) - Number(a.price));
            }
            
            if(this.selectedPrice == 500){
              newProductList = newProductList.filter(i => i.price! <= 500)
            }else if(this.selectedPrice == 1000){
              newProductList = newProductList.filter(i => i.price! > 500 || i.price! <1000)
            }else if(this.selectedPrice == 1500){
              newProductList = newProductList.filter(i => i.price! >= 1000)
            }
      
            this.productService.filter.emit(newProductList);
          })
      }
      else
      {
          if(this.selectedSort == "asc"){
            newProductList = newProductList.sort((a, b) => Number(a.price) - Number(b.price));
          }else if(this.selectedSort == "des"){
            newProductList = newProductList.sort((a, b) => Number(b.price) - Number(a.price));
          }
          
          if(this.selectedPrice == 500){
            newProductList = newProductList.filter(i => i.price! <= 500)
          }else if(this.selectedPrice == 1000){
            newProductList = newProductList.filter(i => i.price! > 500 && i.price! <1000)
          }else if(this.selectedPrice == 1500){
            newProductList = newProductList.filter(i => i.price! >= 1000)
          }

          this.productService.filter.emit(newProductList);
      }
    }
  )}
}
