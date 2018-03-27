import {Component} from '@angular/core';

import {BonusesServices} from '../../services/bonuses.services';

import {PageInfo} from '../../models/page-info.model';
import {Bonuse} from '../../models/bonuse.model';

@Component({
  selector: 'bonuses-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [BonusesServices]
})

export class BonusesComponent {

  pageInfo: PageInfo;
  loading: boolean;

  bonusesList: Bonuse[];

  constructor(private _services: BonusesServices) {

    this.pageInfo = {
      title: 'EncryptoTel Bonuses',
      description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
    this.loading = true;

    this.bonusesList = [];

    this.fetchList();
  }

  fetchList(): void {
    this.loading = true;
    this._services.fetchBonuses().then(list => {
      this.bonusesList = list;
      this.loading = false;
    }).catch(() => this.loading = false)
  }
}
