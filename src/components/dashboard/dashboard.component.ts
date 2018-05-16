import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {PageInfo} from '../../models/page-info.model';
import {RequestServices} from '../../services/request.services';
import {StorageServices} from '../../services/storage.services';


@Component({
  selector: 'my-index',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [DatePipe]
})

export class DashboardComponent implements OnInit {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;
  period = 'month';

  rates = [
    {
      name: 'Waves',
      series: []
    }
  ];
  curse_details;

  constructor(private _req: RequestServices,
              private _date: DatePipe,
              private _storage: StorageServices,
              private _router: Router) {
    this.pageInfo = {
      title: 'Index page',
      description:
        `The entire Cardano team is made up of experts around the world, and the core technology team<br class="hidden_sm_down">
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
    this.loading = true;
  }

  setPeriod(period: string): void {
    this.period = period;
    this.getCurse();
  }

  getCurse(): void {
    this.loading = true;
    this.rates[0].series = [];
    const calcFormat = (): string => {
      switch (this.period) {
        case 'day': {
          return 'HH:mm'
        }
        case 'week': {
          return 'dd/MM HH:mm'
        }
        case 'month': {
          return 'dd/MM'
        }
      }
    };
    this._req.getWavesRates(this.period)
      .then(res => {
        this.curse_details = {
          price: Math.round(res[0].price * 100) / 100,
          diff: Math.round(res[0].diff * 100) / 100,
          percentage: Math.round(res[0].percent * 100) / 100,
          mark: res[0].mark
        };
        this.rates = res;
        for (const rate of this.rates) {
          rate.series.map(item => item.name = this._date.transform(item.timestamp, calcFormat()));
          this.rates[this.rates.indexOf(rate)] = {name: rate['currency_from'], series: rate.series};
        }
        console.log(this.rates);
        this.loading = false;
      }).catch(() => this.loading = false);
  }

  private navigateToLastUrl() {
    if (this._storage.readItem('last_url')) {
      this._router.navigate([this._storage.readItem('last_url')]);
    }
  }

  ngOnInit(): void {
    this.getCurse();
    // this.navigateToLastUrl();
  }
}
