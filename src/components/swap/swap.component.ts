import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {SwapServices} from '../../services/swap.services';
import {PageInfo} from '../../models/page-info.model';
import {SwapDetails} from '../../models/swap-details.model';
import {PopupServices} from '../../services/popup.services';
import {FadeAnimation} from '../../shared/functions';
import {ethRegExp, wavesRegExp} from '../../shared/vars';
import {StorageServices} from '../../services/storage.services';


@Component({
  selector: 'swap-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [SwapServices],
  animations: [FadeAnimation('150ms')]
})

export class SwapComponent implements OnInit, AfterViewChecked {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;
  token = '';
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

  form: FormGroup = new FormGroup({
    'addressWaves': new FormControl(null, [Validators.pattern(wavesRegExp), Validators.required]),
    'addressEth': new FormControl(null, [Validators.pattern(ethRegExp), Validators.required])
  });

  constructor(private _services: SwapServices,
              private popup: PopupServices,
              private storage: StorageServices) {
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
    this.form.reset();
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
    win.test = (token) => {
      this.token = token;
    };
  }

  postData(e) {
    e.preventDefault();
    e.stopPropagation();
    if ((this.form.controls.addressWaves.valid || this.form.controls.addressEth.valid) && this.token) {
      const data = {
        network: this.network,
        address: this.network === 'waves' ? this.form.controls.addressWaves.value : this.form.controls.addressEth.value,
        coinhiveCaptchaToken: this.token
      };
      this._services.postData(data).then(res => {
        console.log(res);
        this.popup.showSuccess(`${res.network} ${res.address}`, false);
      }).catch(err => {
        console.error(err);
        this.popup.showError('Captcha is invalid. Please update the page.')
      })
    }
  }

  private createCaptcha(captcha: HTMLElement): void {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://authedmine.com/lib/captcha.min.js');
    captcha.appendChild(script);
  }

  private checkToken() {
    this._services.checkToken().then(res => {
      this.storage.writeItem('_auth_tk', res);
    }).catch(err => {
      console.error(err);
    });
  }

  ngOnInit(): void {
    this.callbackCaptcha();
    this.loading = true;
    this.checkToken();
    this.getInitialParams()
      .then(() => {
        this.loading = false;
      });
  }

  ngAfterViewChecked() {
    const captcha = document.getElementById('captcha');
    if (captcha && captcha.children.length < 1) {
      this.createCaptcha(captcha);
    }
  }
}
