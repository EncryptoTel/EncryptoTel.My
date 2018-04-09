import {Component} from '@angular/core';

import {SettingsServices} from '../../services/settings.services';
import {PageInfo} from '../../models/page-info.model';
import {AccountModel, Profile} from '../../models/accout.model';
import {emailRegExp, nameRegExp} from '../../shared/vars';
import {PopupServices} from '../../services/popup.services';


@Component({
  selector: 'settings-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class SettingsComponent {
  pageInfo: PageInfo = {
    title: 'Settings',
    description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
  };
  editStatus = {
    firstname: false,
    lastname: false,
    email: false,
    language: false,
    status: false,
    comments: false
  };  // enable/disable edit fields
  loadersIcons = {
    firstname: false,
    lastname: false,
    email: false,
    status: false,
    comments: false
  };  // enable/disable loaders icons
  validState = {
    firstname: true,
    lastname: true,
    email: true
  };
  account: AccountModel = {  // account data from backend
    account: {
      hash: '',
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

  constructor(private _service: SettingsServices,
              private popup: PopupServices) {
    this.getAccount();  // get date about account
    this.getLanguages();  // get all languages
  }

  // controller 'status' checkbox
  setStatusUpdates(): void {
    this.account.account.profile.status_updates = this.account.account.profile.status_updates === 1 ? 0 : 1;
    this.save('status', {status_updates: this.account.account.profile.status_updates});
  }

  // controller 'comments' checkbox
  setNewComments(): void {
    this.account.account.profile.new_comments = this.account.account.profile.new_comments === 1 ? 0 : 1;
    this.save('comments', {new_comments: this.account.account.profile.new_comments});
  }

  // // controller 'language' checkbox
  setLanguage(language: LanguagesModel): void {
    this.account.account.profile.language_id = language.id;
    this.save('language', {language_id: this.account.account.profile.language_id});
    this.editStatus.language = false;
  }

  // activate edit status of field
  edit(type: string, field: HTMLInputElement): void {
    this.editStatus[type] = true;
    field.disabled = false;
    field.focus();
  }

  validation(event): void {
    const value = event.target.value;
    const id = event.target.id;
    if (id === 'firstname' || id === 'lastname') {
      this.validState[id] = nameRegExp.test(value);
    } else if (id === 'email') {
      this.validState[id] = emailRegExp.test(value);
    }
  }

  // validation
  saveValidation(value: string): boolean {
    return nameRegExp.test(this.account.account.profile[value]);
  }

  // save data
  save(loader: string, value): void {
    if (this.account.account.profile.firstname.length < 255 && this.account.account.profile.lastname.length < 255) {
      if (this.saveValidation(loader)) {
        this.resetStatuses(loader);
        this.loadersIcons[loader] = true;
        this._service.save(value).then((res: Profile) => {
          this.account.account.profile = res;
          this.loadersIcons[loader] = false;
        }).catch(err => {
          console.error(err);
          this.loadersIcons[loader] = false;
        });
      }
    }
  }

  changeEmail(email: string) {
    if (email.length < 255) {
      const validation = this.validState.email = emailRegExp.test(email);
      if (validation) {
        this.loadersIcons.email = true;
        this.editStatus.email = false;
        this._service.changeEmail({email: email}).then(res => {
          console.log(res);
          this.loadersIcons.email = false;
          this.popup.showSuccess(res.message);
        }).catch(err => {
          console.error(err);
          this.popup.showError(err.errors.email);
          this.loadersIcons.email = false;
        })
      }
    }
  }

  // reset all statuses of edit
  resetStatuses(type: string): void {
    this.editStatus[type] = false;
  }

  // controller of select
  showLanguages(): void {
    this.editStatus.language = !this.editStatus.language;
  }

  // global controller of lang select
  hideLanguages(event) {
    event.target.classList.contains('select_current') || (event.target.id === 'langEdit') || (event.target.id === 'arrow') ? this.editStatus.language = true : this.editStatus.language = false;
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
    this._service.getAccount().then((res: AccountModel) => {
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
