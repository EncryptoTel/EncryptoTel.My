import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {TransactionsServices} from '../../services/transactions.services';
import {AccountModel, Wallets} from '../../models/accout.model';
import {FadeAnimation} from '../../shared/functions';
import {Transaction, TransactionsModel} from '../../models/transactions.model';


@Component({
  selector: 'transactions-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class TransactionsComponent {
  pageInfo: PageInfo = {
    title: 'Transactions',
    description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consists of Well Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
  };
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  addresses: Wallets;
  address: string;
  filterType = 'all';
  date: boolean[] = [];
  loading = true;

  constructor(private _service: TransactionsServices) {
    this.getAddress();
    this.filter(this.filterType);
  }

  changeAddress(address): void {
    this.loading = true;
    this.address = address.address;
    this.getTransactions(this.address);
    this.filter(this.filterType);
  }

  private filter(value: string): void {
    this.filterType = value;
    switch (value) {
      case ('all'):
        this.filteredTransactions = this.transactions;
        break;
      case ('sent'):
        this.filteredTransactions = [];
        this.sortingSent();
        break;
      case ('received'):
        this.filteredTransactions = [];
        this.sortingReceived();
        break;
      default:
        this.filteredTransactions = this.transactions;
        break;
    }
    if (this.transactions.length > 0) {
      this.date = new Array(this.filteredTransactions.length);
      this.date.fill(false);
      this.sortByDate();
    }
  }

  private sortingSent(): void {
    this.transactions.forEach((el: Transaction) => {
      if (el.sender === this.address) {
        this.filteredTransactions.push(el);
      }
    })
  }

  private sortingReceived(): void {
    this.transactions.forEach((el: Transaction) => {
      if (el.sender !== this.address) {
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

  private getAddress(): void {
    this._service.getAddress().then((res: AccountModel) => {
      this.addresses = res.account.wallets;
      this.address = this.addresses[0].address;
      this.getTransactions(this.address);
    }).catch(err => {
      console.error(err);
    })
  }

  private getTransactions(address: string): void {
    this._service.getTransactions(address).then((res: TransactionsModel) => {
      this.transactions = res.items;
      this.filter(this.filterType);
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    })
  }
}

