import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../../services/authorization.services';

import {validateForm, inputValidation, FadeAnimation} from '../../shared/functions';
import {emailRegExp} from '../../shared/vars';
import {environment as _env} from '../../environments/environment';

@Component({
  selector: 'sign-in-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class SignInComponent implements OnInit, OnDestroy {

  // Copyright string
  copyright: string;

  // Form parameters
  signInForm: FormGroup;
  loading: boolean;
  formMessage: string;

  // Authorization services updates subscription
  subscription: Subscription;

  constructor(private _services: AuthorizationServices,
              private router: Router) {
    this.signInForm = new FormGroup({
      'email': new FormControl('', [
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

  // Services form message clearing
  clearMessage(ev?: KeyboardEvent): void {
    if (ev.keyCode && ev.keyCode !== 13) {
      this._services.clearMessage();
    }
  }

  // Form control validation
  hasError(control: string, type?: string): boolean {
    return inputValidation(this.signInForm, control, type)
  }

  // Authorization method
  signIn(ev?: Event): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    validateForm(this.signInForm);
    if (this.signInForm.valid && !this.formMessage) {
      this.loading = true;
      this._services.signIn(this.signInForm.value)
        .then(() => {
          this.loading = false;
          this.router.navigateByUrl('dashboard');
        })
        .catch(() => this.loading = false)
    }
  }

  ngOnInit(): void {
    if (this._services.fetchAuth()) {
      this.router.navigateByUrl('dashboard')
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
