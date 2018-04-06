import {Component} from '@angular/core';
import {PopupServices} from '../../services/popup.services';


@Component({
  selector: 'popup-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class PopupElement {
  constructor(public _service: PopupServices) {}

}

