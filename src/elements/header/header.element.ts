import {Component, OnInit} from '@angular/core';

import {environment as _env} from '../../environments/environment';

import {NavigationItem} from '../../models/navigation-item.model';

@Component({
  selector: 'header-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class HeaderElement implements OnInit {

  navigationItems: NavigationItem[];

  constructor() {
    this.navigationItems = _env.navigation;
  }

  logout = (): void => {
    console.log('Logout called!');
  };

  ngOnInit() {}
}
