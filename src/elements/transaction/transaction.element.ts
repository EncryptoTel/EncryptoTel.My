import {Component, Input} from '@angular/core';
import {Transaction} from '../../models/transactions.model';

@Component({
  selector: 'transaction-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionElement {
  @Input() transaction: Transaction;
  @Input() address: string;

  type: string;

  setTypeTransaction(sender: string): string {
    return this.type = sender === this.address ? 'Send' : 'Received';
  }
}
