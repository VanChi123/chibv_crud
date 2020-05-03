import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fis-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  constructor() { }
  @Input()title: string;
  // phuowng thuc tim kiem click
  keyWordSearch: any;

  // lay du lieu de truyen di,any la kieu du lieu bat ki
  @Output() search = new EventEmitter<any>();

  ngOnInit(): void {
  }
  onSearch(keyword: any){
    console.log('keyword', keyword);
    this.search.emit(keyword);
  }

}
