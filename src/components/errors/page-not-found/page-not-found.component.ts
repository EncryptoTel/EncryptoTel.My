import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'page-not-found-component',
  template: ''
})

export class PageNotFoundComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {
    this._router.navigateByUrl('/');
  }
}
