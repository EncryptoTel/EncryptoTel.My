import {Component} from '@angular/core';
import {DialogServices} from '../../services/dialog.services';
import {AuthorizationServices} from '../../services/authorization.services';


@Component({
  selector: 'dialog-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class DialogElement {
  constructor(public _service: DialogServices,
              private auth: AuthorizationServices) {
  }

  signOut() {
    this.auth.logout();
  }

  stayIn() {
    this._service.stayIn().then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  close() {
    this._service.visible = false;
    this._service.isClosed = true;
  }
}

