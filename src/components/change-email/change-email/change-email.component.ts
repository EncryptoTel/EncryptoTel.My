import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ChangeEmailServices} from '../../../services/change-email.services';

@Component({
  selector: 'change-email-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class ChangeEmailComponent {
  constructor(private _service: ChangeEmailServices,
              private router: ActivatedRoute) {
    this._service.changeEmail(this.router.snapshot.params.token).then(res => {
      this.success = res.success;
      this.message = res.message;
      this.loader = false;
    }).catch(err => {
      console.error(err);
      this.errors = err.errors.token;
      this.loader = false;
    })
  }
  loader = true;
  success: boolean;
  errors: string[];
  message: string;
}
