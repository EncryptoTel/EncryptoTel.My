import {Component, Input} from '@angular/core';

import {Bug} from '../../models/bug.model';

@Component({
  selector: 'bug-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugElement {
  @Input() issue: Bug;
}
