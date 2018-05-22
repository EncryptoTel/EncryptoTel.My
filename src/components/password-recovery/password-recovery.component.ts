import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FadeAnimation, inputValidation, passwordConfirmation, validateForm} from '../../shared/functions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {emailRegExp} from '../../shared/vars';
import {environment as _env} from '../../environments/environment';
import {PasswordRecoveryServices} from '../../services/password-recovery.services';
import {StorageServices} from '../../services/storage.services';
import {AuthorizationServices} from '../../services/authorization.services';

@Component({
  selector: 'password-recovery-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')],
  providers: [PasswordRecoveryServices]
})

export class PasswordRecoveryComponent implements OnInit {

  loading: boolean;

  copyright: string;

  hash: string;

  emailSent: boolean;

  invalidHash: {
    enabled: boolean;
    message: string;
  };

  recoveryForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _services: PasswordRecoveryServices,
              private _storage: StorageServices,
              private _auth: AuthorizationServices) {
    this.copyright = _env.copyright;
  }

  hasError(control: string, type?: string): boolean {
    return inputValidation(this.recoveryForm, control, type)
  }

  sendResetRequest(ev?: Event): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    validateForm(this.recoveryForm);
    if (this.recoveryForm.valid) {
      this._services.sendResetRequest(this.recoveryForm.value)
        .then((res) => {
          this.loading = false;
          if (res.success) {
            this.emailSent = true;
          }
        }).catch(res => {
          this.loading = false;
          Object.keys(res.errors).map(key => {
            this.recoveryForm.controls[key].setErrors({response: res.errors[key]})
          })
      })
    }
  }

  resetPassword(ev?: Event): void {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    validateForm(this.recoveryForm);
    if (this.recoveryForm.valid) {
      this._services.resetPassword(this.recoveryForm.value)
        .then((res) => {
          this.loading = false;
          this._storage.writeItem('_auth_tk', res);
          this._auth.authSubscription.next();
          this.router.navigateByUrl('/dashboard');
        }).catch(res => {
          this.loading = false;
          Object.keys(res.errors).map(key => {
            if (key !== 'token') {
              this.recoveryForm.controls[key].setErrors({response: res.errors[key]})
            } else {
              this.invalidHash = {
                enabled: true,
                message: res.errors[key]
              }
            }
          })
      })
    }
  }

  ngOnInit() {
    this.emailSent = false;
    this.loading = false;
    this.invalidHash = {
      enabled: false,
      message: ''
    };
    this.route.params.subscribe(params => {
      if (params['hash']) {
        this.hash = params['hash'];
        this.recoveryForm = new FormGroup({
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
          'token': new FormControl('', [
            Validators.required
          ])
        });
        this.recoveryForm.controls.token.setValue(params['hash'])
      } else {
        this.recoveryForm = new FormGroup({
          'email': new FormControl('', [
            Validators.required,
            Validators.pattern(emailRegExp)
          ])
        })
      }
    })
  }
}
