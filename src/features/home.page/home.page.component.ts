import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('notfirst')==null){
      localStorage.setItem('notfirst',"1");
      window.location.reload()
    }
  }

  onBuyClicked(){
    this.router.navigate(['products'],{queryParams: {c: "Cveke"}})
  }

  go(){
  }


}
