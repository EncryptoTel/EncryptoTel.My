import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';

@Component({
  selector: 'transactions-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionsComponent {
  pageInfo: PageInfo;

  constructor() {
    this.pageInfo = {
      title: 'Transactions',
      description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    }
  }
}
