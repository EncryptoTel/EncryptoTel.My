import {Component} from '@angular/core';
import {DialogServices} from '../../services/dialog.services';
import {AuthorizationServices} from '../../services/authorization.services';
import {StorageServices} from '../../services/storage.services';


@Component({
  selector: 'dialog-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class DialogElement {
  constructor(public _service: DialogServices,
              private auth: AuthorizationServices,
              private storage: StorageServices) {
  }

  signOut() {
    this.auth.logout();
    this.close();
  }

  stayIn() {
    this._service.stayIn().then(res => {
      this.storage.writeItem('_auth_tk', res);
    }).catch()
  }

  close() {
    this._service.visible = false;
    this._service.isClosed = true;
  }
}

