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
    if (this.issue.claims_count !== 0) {
      return this.issue.claims_count;
    }
  }
  setTagStyle(status: number): string {
    switch (status) {
      case (1):
        return 'new';
      case (2):
        return 'planned';
      case (3):
        return 'in_progress';
      case (4):
        return 'done';
      case (5):
        return 'known_issue';
      case (6):
        return 'closed';
      default:
        return
    }
  }
}
