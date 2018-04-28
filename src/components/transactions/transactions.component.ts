import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {TransactionsServices} from '../../services/transactions.services';
import {StorageServices} from '../../services/storage.services';


@Component({
  selector: 'transactions-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionsComponent {
  pageInfo: PageInfo = {
    title: 'Transactions',
    description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
  };
  transactions: Transaction[][] = this.storage.readItem('transactions') || [];
  filteredTransactions: Transaction[] = [];
  address = '3P7tNYakdeYkR48XQoDRhdvYbmmESznb4WS';
  course: Course = this.storage.readItem('course') || 1;
  filterType = 'all';
  date: boolean[] = [];

  constructor(private _service: TransactionsServices,
              private storage: StorageServices) {
    this.getCourse();
    this.getTransactions();
    this.filter(this.filterType);
  }

  private getTransactions() {
    this._service.getTransactions(this.address).then((res: Transaction[][]) => {
      this.storage.writeItem('transactions', res);
      this.transactions = res;
      this.filter(this.filterType);
    }).catch(err => {
      console.error(err);
    });
  }

  private getCourse() {
    this._service.getCourse().then((res: Course) => {
      this.course = res;
      this.storage.writeItem('course', res);
    }).catch(err => {
      console.error(err);
    });
  }

  private filter(value: string): void {
    this.filterType = value;
    switch (value) {
      case ('all'):
        this.filteredTransactions = this.transactions[0];
        break;
      case ('send'):
        this.filteredTransactions = [];
        this.sortingSend();
        break;
      case ('received'):
        this.filteredTransactions = [];
        this.sortingReceived();
        break;
      default:
        this.filteredTransactions = this.transactions[0];
        break;
    }
    this.date = new Array(this.filteredTransactions.length);
    this.date.fill(false);
    this.sortByDate();
  }

  private sortingSend(): void {
    this.transactions[0].forEach((el: Transaction) => {
      if (el.sender === this.address) {
        this.filteredTransactions.push(el);
      }
    })
  }

  private sortingReceived(): void {
    this.transactions[0].forEach((el: Transaction) => {
      if (el.recipient === this.address) {
        this.filteredTransactions.push(el);
      }
    })
  }

  private sortByDate(): void {
    let day = new Date(this.filteredTransactions[0].timestamp).getDate();
    this.date[0] = true;
    for (let i = 0; i < this.filteredTransactions.length; i++) {
      if (day !== new Date(this.filteredTransactions[i].timestamp).getDate()) {
        this.date[i] = true;
        day = new Date(this.filteredTransactions[i].timestamp).getDate();
      }
    }
  }

  private getAddress() {
    this._service.getAddress().then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }
}

