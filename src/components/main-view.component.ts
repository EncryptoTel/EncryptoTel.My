import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'main-view',
  template: '<header-element></header-element><router-outlet></router-outlet>'
})

export class MainViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
