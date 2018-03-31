import {Component} from '@angular/core';

import {SwapServices} from '../../services/swap.services';
import {PageInfo} from '../../models/page-info.model';

@Component({
  selector: 'swap-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [SwapServices]
})

export class SwapComponent {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  constructor(private _services: SwapServices) {
    this.pageInfo = {
      title: 'Welcome to Swap service',
      description:
        `This service allows swapping of ETT tokens between two blockchains right<br class="hidden_sm_down">
         from the dashboard, sending your funds directly to your wallet`
    };
    this.loading = true;
  }
}
