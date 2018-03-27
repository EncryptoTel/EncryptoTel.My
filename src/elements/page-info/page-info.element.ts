import {Component, Input} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';

@Component({
  selector: 'page-info-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class PageInfoElement {
  @Input()
    pageInfo: PageInfo;
}
