import {Component} from '@angular/core';
import {DialogServices} from '../../services/dialog.services';


@Component({
  selector: 'dialog-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class DialogElement {
  constructor(public _service: DialogServices) {
  }

  time = 59;
}

