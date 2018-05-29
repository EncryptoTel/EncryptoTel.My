import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import {AuthorizationServices} from '../../services/authorization.services';

import {FadeAnimation, inputValidation, validateForm, passwordConfirmation} from '../../shared/functions';
import {nameRegExp} from '../../shared/vars';
import {environment as _env} from '../../environments/environment';

@Component({
  selector: 'sign-up-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class SignUpComponent implements OnInit, OnDestroy {

  // Copyright string
  copyright: string;

  // Form parameters
  signUpForm: FormGroup;
  loading: {
    page: boolean,
    button: boolean
  };
  formMessage: string;

  // Route params subscription
  routeSubscription: Subscription;

  // Authorization services updates subscription
  serviceSubscription: Subscription;

  constructor(private _services: AuthorizationServices,
              private route: ActivatedRoute,
              private router: Router) {

    this.loading = {
      page: false,
      button: false
    };

    this.copyright = _env.copyright;
    this.formMessage = this._services.formMessage;
    this.serviceSubscription = this._services.subscribeAuth()
      .subscribe(() => this.formMessage = this._services.formMessage);

    this.signUpForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.pattern(nameRegExp)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255)
      ]),
      'password_confirmation': new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        passwordConfirmation()
      ]),
      'wallet': new FormControl('', [
        Validators.required
      ]),
      'hash': new FormControl(null, [
        Validators.required
      ])
    });

    this.routeSubscription = this.route.params
      .subscribe(params => {
        if (params['hash']) {
          this.loading.page = true;
          this._services.validateHash(params['hash'])
            .then(() => {
              this.signUpForm.controls['hash'].setValue(params['hash']);
              this.loading.page = false;
            })
            .catch(() => this.loading.page = false)
        } else {
          this._services.setMessage('Hash is not presented');
        }
      });
  }

  // Services form message clearing
  clearMessage(ev?: KeyboardEvent): void {
    if (ev.keyCode && ev.keyCode !== 13 && this.signUpForm.controls['hash'].valid) {
      this._services.clearMessage();
    }
  }

  // Form control validation
  hasError(control: string, type?: string): boolean {
    return inputValidation(this.signUpForm, control, type)
  }

  // Registration method
  signUp(ev?: Event): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    validateForm(this.signUpForm);
    if (this.signUpForm.valid && !this.formMessage) {
      this.loading.button = true;
      this._services.validateWallet(this.signUpForm.get('wallet').value)
        .then(() => {
          this._services.signUp(this.signUpForm.value)
            .then(() => {
              this.loading.button = false;
              this.router.navigateByUrl('');
            })
            .catch(err => {
              const control = Object.keys(err.errors);
              for (const c of control) {
                this.signUpForm.controls[c].setErrors({response: err.errors[c].join('')});
              }
              this.loading.button = false
            });
        }).catch(() => {
          this._services.setMessage('Invalid wallet address');
          this.loading.button = false;
      })
    }
  }

  ngOnInit(): void {
    if (this._services.fetchAuth()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }
}
