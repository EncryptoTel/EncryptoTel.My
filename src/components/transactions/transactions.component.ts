import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {TransactionsServices} from '../../services/transactions.services';


@Component({
  selector: 'transactions-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionsComponent {
  pageInfo: PageInfo;
  transactions: Transaction[][];
  address = '3P7tNYakdeYkR48XQoDRhdvYbmmESznb4WS';
  course: Course;
  filterType = 'all';

  constructor(private _service: TransactionsServices) {
    this._service.getTransactions(this.address).then((res: Transaction[][]) => {
      this.transactions = res;
      console.log(this.transactions);
    }).catch(err => {
      console.error(err);
    });
    this._service.getCourse().then((res: Course) => {
      this.course = res;
      console.log(this.course);
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

  filter(value: string): void {
    this.filterType = value;
  }
}
