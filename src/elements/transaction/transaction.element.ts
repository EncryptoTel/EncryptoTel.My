import {Component, Input, OnInit} from '@angular/core';
import {TransactionsServices} from '../../services/transactions.services';

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
      this._service.getAssetsId(this.transaction.assetId).then(res => {
        this.asset = res.name;
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
    }
  }

  private getCourse(): void {
    if (this.transaction && this.transaction.assetId) {
      this._service.getCourse(this.transaction.assetId ? this.transaction.assetId : this.type).then((res: Course) => {
        this.course = res;
      }).catch(err => {
        console.error(err);
      });
    }
  }

  ngOnInit() {
    this.getAssetsId();
    this.getCourse();
    console.log('1');
  }
}
