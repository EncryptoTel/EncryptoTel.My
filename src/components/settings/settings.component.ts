import {Component} from '@angular/core';

import {PageInfo} from '../../models/page-info.model';
import {FormControl, FormGroup} from '@angular/forms';

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
  settings: FormGroup = new FormGroup({
    'name': new FormControl(),
    'email': new FormControl(),
    'language': new FormControl()
  });

  constructor() {

  }

}
