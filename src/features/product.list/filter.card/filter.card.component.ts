import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtercard',
  templateUrl: './filter.card.component.html',
  styleUrls: ['./filter.card.component.css']
})
export class FilterCardComponent implements OnInit {

  rangeunder500: boolean = false;
  color: string = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

  updateAllComplete(){}

}
