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

  getBug() {
    this.clickHandlerFallback.emit({id: this.issue.id});
  }
}
