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
  editStatus = {
    firstName: false,
    lastName: false,
    email: false,
    language: false
  };  // enable/disable edit fields
  loadersIcons = {
    firstName: false,
    lastName: false,
    email: false,
    status: false,
    comments: false
  };  // enable/disable loaders icons
  account: AccoutModel = {  // account data from backend
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
  languages: LanguagesModel[] = []; // array of available languages from back
  isValid = false; // is validity input fields?

  constructor(private _service: SettingsServices) {
    this.getAccount();  // get date about account
    this.getLanguages();  // get all languages
  }

  // controller 'status' checkbox
  setStatusUpdates(): void {
    this.account.account.profile.status_updates = this.account.account.profile.status_updates === 1 ? 0 : 1;
    this.save('status');
  }

  // controller 'comments' checkbox
  setNewComments(): void {
    this.account.account.profile.new_comments = this.account.account.profile.new_comments === 1 ? 0 : 1;
    this.save('comments');
  }

  // // controller 'language' checkbox
  setLanguage(language: LanguagesModel): void {
    this.account.account.profile.language_id = language.id;
    this.save('language');
    this.editStatus.language = false;
  }

  // activate edit status of field
  edit(type: string, field: HTMLInputElement): void {
    this.editStatus[type] = true;
    field.focus();
  }

  // save data
  save(loader: string): void {
    if (this.account.account.email.length < 255 && this.account.account.profile.firstname.length < 255 && this.account.account.profile.lastname.length < 255) {
      this.loadersIcons[loader] = true;
      this._service.save(this.account.account).then(() => {
        this.loadersIcons[loader] = false;
        this.resetStatuses();
      }).catch(err => {
        console.error(err);
      });
    }
  }

  // reset all statuses of edit
  resetStatuses(): void {
    this.editStatus = {
      firstName: false,
      lastName: false,
      email: false,
      language: false
    };
  }

  // controller of select
  showLanguages(): void {
    this.editStatus.language = !this.editStatus.language;
  }

  //  find current lang from array lang
  currentLanguage(): string {
    const language = this.languages.find(el => {
      if (el.id === this.account.account.profile.language_id) {
        return true;
      }
    });
    if (language && language.hasOwnProperty('name')) {
      return language.name;
    }
  }

  // get account data from back
  private getAccount(): void {
    this._service.getAccount().then((res: AccoutModel) => {
      this.account = res;
    }).catch(err => {
      console.error(err);
    })
  }

  // get languages from back
  private getLanguages(): void {
    this._service.getLanguages().then((res: LanguagesModel[]) => {
      this.languages = res;
    }).catch(err => {
      console.error(err);
    })
  }
}
