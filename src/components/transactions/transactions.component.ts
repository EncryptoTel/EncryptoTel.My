import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {TransactionsService} from '../../services/transactions.service';


@Component({
  selector: 'transactions-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionsComponent {
  pageInfo: PageInfo;
  transactions: TransactionsModel;

  constructor(private _service: TransactionsService) {
    this._service.getTransactions().then((res: TransactionsModel) => {
      this.transactions = res;
      console.log(this.transactions);
    }).catch(err => {
      console.error(err);
    });
    this.pageInfo = {
      title: 'Transactions',
      description:
        `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    }
  }
}
