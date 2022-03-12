import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent{
  title = 'anemona';
  sub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef){
  }


}
