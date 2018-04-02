import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {SettingsServices} from '../../services/settings.services';

@Component({
  selector: 'settings-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class SettingsComponent {
  pageInfo: PageInfo = {
    title: 'Transactions',
    description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
  };
  status = false;
  comments = false;
  editStatus = {
    name: false,
    email: false,
    language: false
  };
  account: AccoutModel = {
    account: {
      email: '',
      profile: {
        firstname: '',
        language_id: 0,
        lastname: '',
        new_comments: 0,
        status_updates: 0
      }
    }
  };

  constructor(private _service: SettingsServices) {
    this.getAccount();
  }

  statusUpdates(): void {
    this.status = !this.status;
  }

  newComments(): void {
    this.comments = !this.comments;
  }

  edit(type: string, field: HTMLInputElement): void {
    this.editStatus[type] = true;
    field.focus();
  }

  getAccount() {
    this._service.getAccount().then((res: AccoutModel) => {
      console.log(res);
      this.account = res;
    }).catch(err => {
      console.error(err);
    })
  }
}
