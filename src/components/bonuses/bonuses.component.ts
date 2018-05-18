import {Component, ElementRef, ViewChild} from '@angular/core';

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

  @ViewChild('tableBody') tableBody: ElementRef;

  constructor(private _services: BonusesServices) {
    this.pageInfo = {
      title: 'EncryptoTel Bonuses',
      description:
      `Track upcoming bonus distributions from us and our partners. Earn bonuses<br class="hidden_sm_down">
       for engaging in community activities`
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
