import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../../services/authorization.services';

import {emailRegExp} from '../../shared/vars';
import {validateForm, inputValidation, FadeAnimation} from '../../shared/functions';
import {environment as _env} from '../../environments/environment';

@Component({
  selector: 'sign-in-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class SignInComponent {

  copyright: string;

  signInForm: FormGroup;
  loading: boolean;
  formMessage: string;

  subscription: Subscription;

  constructor(private _services: AuthorizationServices) {
    this.signInForm = new FormGroup({
      'username': new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegExp)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]),
    });
    this.copyright = _env.copyright;
    this.subscription = this._services.subscribeAuth()
      .subscribe(() => this.formMessage = this._services.formMessage);
  }

  clearMessage(ev?: KeyboardEvent): void {
    if (ev && ev.code) {
      this._services.clearMessage();
    }
  }

  hasError(control: string, type?: string): boolean {
    return inputValidation(this.signInForm, control, type)
  }

  signIn(ev?: Event): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    validateForm(this.signInForm);
    if (this.signInForm.valid && !this.formMessage) {
      this.loading = true;
      this._services.signIn(this.signInForm.value)
        .then(() => this.loading = false)
        .catch(() => this.loading = false)
    }
  }
}
