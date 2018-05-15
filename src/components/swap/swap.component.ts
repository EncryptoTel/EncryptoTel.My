import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SwapServices} from '../../services/swap.services';
import {PageInfo} from '../../models/page-info.model';
import {SwapDetails} from '../../models/swap-details.model';

@Component({
  selector: 'swap-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [SwapServices]
})

export class SwapComponent implements OnInit, AfterViewChecked {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  details: SwapDetails = {
    waves: {
      status: true,
      amount: 0
    },
    eth: {
      status: true,
      amount: 0
    }
  };

  network: 'ethereum' | 'waves';

  amounts = {
    ett_supply: '0',
    waves_supply: '0',
    total: '0',
    circulating: '0'
  };

  @ViewChild('swapForm') form: ElementRef;

  constructor(private _services: SwapServices) {
    this.loading = true;
    this.network = 'waves';
    this.pageInfo = {
      title: 'Welcome to Swap service',
      description:
        `This service allows swapping of ETT tokens between two blockchains right<br class="hidden_sm_down">
         from the dashboard, sending your funds directly to your wallet`
    };
  }

  setTarget(target: 'ethereum' | 'waves'): void {
    this.network = target;
  }

  capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  round = (number): number => {
    const result = Number(number) / Math.pow(10, 8);
    return Math.round(result * 100) / 100;
  };
  numbersSplit = (number): string => {
    const num = String(number).split('.');
    if (num[0].length > 3) {
      num[0] = num[0].split(/(?=(?:...)*$)/).join(' ')
    }
    return num.join('.')
  };

  getInitialParams(): Promise<any> {
    const supply = this._services.getSupply().then(res => {
      this.amounts = {
        waves_supply: this.numbersSplit(this.round(res['waves'])),
        ett_supply: this.numbersSplit(this.round(res['ethereum'])),
        total: this.numbersSplit(73453410.48296180),
        circulating: this.numbersSplit(65687011.78296180)
      }
    });
    const wavesAmount = this._services.getWavesAmount().then(res => {
      this.details.waves.amount = this.round(res['balance'])
    });
    const ethAmount = this._services.getEthAmount().then(res => {
      this.details.eth.amount = this.round(res['result'])
    });
    return Promise.all([supply, wavesAmount, ethAmount]);
  }

  callbackCaptcha() {
    const win: any = window;
    win.test = (ev) => {
      console.log(ev);
    };
  }
  ngOnInit(): void {
    this.callbackCaptcha();
    this.loading = true;
    this.getInitialParams()
      .then(() => {
        this.loading = false;
        setTimeout(() => console.log(this.form.nativeElement));
      });
  }

  ngAfterViewChecked() {
    const captcha = document.getElementById('captcha');
    if (captcha) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://authedmine.com/lib/captcha.min.js');
      captcha.appendChild(script);
    }
  }
}
