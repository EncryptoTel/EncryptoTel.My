import {Component} from '@angular/core';

import {BonusesServices} from '../../services/bonuses.services';

import {PageInfo} from '../../models/page-info.model';
import {Bonus} from '../../models/bonus.model';

@Component({
  selector: 'bonuses-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [BonusesServices]
})

export class BonusesComponent {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  // Bonuses list
  bonusesList: Bonus[];

  constructor(private _services: BonusesServices) {
    this.pageInfo = {
      title: 'EncryptoTel Bonuses',
      description:
      `The entire Cardano team is made up of experts around the world, and the core technology team<br class="hidden_sm_down">
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
    this.loading = true;
    this.bonusesList = [];
    this.fetchList();
  }

  // Fetch bonuses list
  fetchList(): void {
    this.loading = true;
    this._services.fetchBonuses().then(list => {
      this.bonusesList = list;
      this.loading = false;
    }).catch(() => this.loading = false)
  }
}
