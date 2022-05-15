import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-searchbox',
  templateUrl: './search.box.component.html',
  styleUrls: ['./search.box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {
  @Output() searchTerm = new EventEmitter<string>();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  keyPress(event: any): void {
    const target = event.target as HTMLTextAreaElement;
    this.searchService.search.emit(target.value)
  }
}
