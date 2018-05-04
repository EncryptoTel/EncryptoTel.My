import {Component, Input, OnInit} from '@angular/core';
import {TransactionsServices} from '../../services/transactions.services';
import {Asset, Course, Transaction} from '../../models/transactions.model';

@Component({
  selector: 'transaction-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class TransactionElement implements OnInit {
  constructor(private _service: TransactionsServices) {
  }

  @Input() transaction: Transaction;
  @Input() address: string;
  @Input() currency: string;
  asset: string;
  type: string;
  course: Course = {
    course: 1
  };
  K = 100000000;


  setTypeTransaction(sender: string): string {
    return this.type = sender === this.address ? 'Send' : 'Received';
  }

  convertToUSD(): number {
    return (this.transaction.amount / this.K) * this.course.course;
  }

  private getAssetsId(): void {
    if (this.transaction && this.transaction.assetId) {
      this._service.getAssetsId(this.transaction.assetId).then((res: Asset) => {
        this.asset = res.name;
      }).catch(err => {
        console.error(err);
      });
    }
  }

  private getCourse(): void {
    if (this.transaction || this.transaction.assetId) {
      this._service.getCourse(this.transaction.assetId ? this.transaction.assetId : this.currency).then((res: Course) => {
        this.course = res;
      }).catch(err => {
        console.error(err);
      });
    }
  }

  ngOnInit() {
    this.getAssetsId();
    this.getCourse();
  }
}
