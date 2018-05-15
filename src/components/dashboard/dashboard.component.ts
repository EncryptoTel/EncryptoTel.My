import {Component, OnInit} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';
import {RequestServices} from '../../services/request.services';
import {DatePipe} from '@angular/common';

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
              private _date: DatePipe) {
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
        res.reverse().map((item, ix) => {
          if (this.period !== 'day') {
            if (Number(item.close) !== 0 && ix % 2 === 0) {
              this.rates[0].series.push({
                name: this._date.transform(item.timestamp, calcFormat()),
                value: item.close
              })
            }
          } else {
            if (Number(item.close) !== 0) {
              this.rates[0].series.push({
                name: this._date.transform(item.timestamp, calcFormat()),
                value: item.close
              })
            }
          }
        });
        const last = res[res.length - 1].close;
        const first = res[0].close;
        this.curse_details = {
          price: last,
          diff: Math.abs(Math.round((last - first) * 100) / 100),
          percentage: Math.abs(Math.round(((last - first) / first) * 10000) / 100),
          mark: last - first > 0 ? '+' : '-'
        };
        this.loading = false;
      }).catch(() => this.loading = false);
  }

  ngOnInit(): void {
    this.getCurse();
  }
}
