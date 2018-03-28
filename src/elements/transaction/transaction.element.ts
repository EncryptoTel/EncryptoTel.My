import {Component, Input, Output} from '@angular/core';

@Component({
  selector: 'transaction-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionElement {
  @Input() transaction: Transaction;
  @Input() address: string;
  @Input() course: Course;
  type: string;

  setTypeTransaction(sender: string): string {
    return this.type = sender === this.address ? 'Send' : 'Received';
  }

  convertToUSD(): string {
    return this.transaction.amount * this.course.ett_course;
  }
}
