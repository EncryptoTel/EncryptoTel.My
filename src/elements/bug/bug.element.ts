import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Bug} from '../../models/bug.model';

@Component({
  selector: 'bug-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugElement {

  @Input() issue: Bug;
  @Output() clickHandlerFallback = new EventEmitter<object>();
  @Output() vote = new EventEmitter<number>();
  @Output() report = new EventEmitter<number>();

  getBug() {
    this.clickHandlerFallback.emit({id: this.issue.id});
  }

  voteHandler() {
    if (this.issue.vote_exists === 0) {
      this.vote.emit(this.issue.id);
    }
  }

  reportHandler() {
    if (this.issue.claim_exists === 0) {
      this.report.emit(this.issue.id);
    }
  }

  formatClaims() {
    if (this.issue.claims !== 0) {
      return this.issue.claims;
    }
  }
}
