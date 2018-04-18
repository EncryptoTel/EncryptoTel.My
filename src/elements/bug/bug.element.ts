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

  getBug() {
    this.clickHandlerFallback.emit({id: this.issue.id});
  }

  voteHandler() {
    this.vote.emit(this.issue.id);
  }
}
