import {Injectable} from '@angular/core';

import {RequestServices} from './request.services';

@Injectable()
export class TransactionsServices {
  constructor(private request: RequestServices) {}

  getTransactions(): Promise<Object> {
    return this.request.get('transactions.json');
  }
  getCourse() {
    return this.request.get('course.json');
  }
}
