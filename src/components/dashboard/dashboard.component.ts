import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

import {PageInfo} from '../../models/page-info.model';
import {RequestServices} from '../../services/request.services';
import {StorageServices} from '../../services/storage.services';
import {AssetServices} from '../../services/asset.services';
import {ConfirmDialogServices} from '../../services/confirm-dialog.services';
import {FadeAnimation} from '../../shared/functions';


@Component({
  selector: 'my-index',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  providers: [DatePipe, AssetServices],
  animations: [FadeAnimation('150ms')]
})

export class DashboardComponent implements OnInit {
  // Page data
  pageInfo: PageInfo;
  loading = true;
  loadingAssets = true;
  loaderGraph = true;
  period = this._storage.readItem('period') || 'month';
  rates = [
    {
      name: 'Waves',
      series: []
    }
  ];
  curse_details;


  //

  show_form = false;
  assets;
  picked_assets = [];
  address;
  asset_id;
  current_asset;
  networks = [
    {id: 1, name: 'Waves'},
    {id: 2, name: 'Ethereum'}
  ];
  selectedNetwork = {
    id: 1,
    name: 'Waves'
  };
  selectedAsset = '[Select asset]';

  changeNetwork(network) {
    this.selectedNetwork = network;
    this.selectedAsset = this.filteredAssets().length > 0 ? '[Select asset]' : 'Sorry, there is no assets for this network';
  }

  showForm() {
    this.show_form = true;
  }

  hideForm() {
    this.show_form = false;
  }

  filteredAssets() {
    return this.assets.filter(asset => asset.blockchain_id === this.selectedNetwork.id);
  }

  nameShorter = (item, max, required): string => {
    return (
      item.length > max
        ? item.slice(0, required) + '...'
        : item);
  };

  setAddress(text) {
    this.address = text.value;
  }

  setAssetId(event) {
    this.selectedAsset = event.name;
    this.asset_id = event.identifier;
  }

  getAssets() {
    this._assets.getAssets().then(res => {
      this.assets = res['list'].sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0;
      });
      this.loadingAssets = false;
    })
  }

  addNewAsset() {
    this.loadingAssets = true;
    this._assets.addAsset({
      address: this.address,
      kind: 'waves',
      asset_id: this.asset_id
    })
      .then(() => {
        this.hideForm();

        this.getAccountAssets();
      }).catch();
  }

  removeAsset(asset) {
    this.current_asset = asset;
    this._confirmDialog.showDialog();
  }

  //
  constructor(private _req: RequestServices,
              private _date: DatePipe,
              private _storage: StorageServices,
              private _router: Router,
              private _assets: AssetServices,
              public _confirmDialog: ConfirmDialogServices) {
    this.pageInfo = {
      title: 'Index page',
      description:
        `The entire Cardano team is made up of experts around the world, and the core technology team<br class="hidden_sm_down">
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
  }

  setPeriod(period: string): void {
    this.period = period;
    this._storage.writeItem('period', this.period);
    this.getCurse();
  }

  getCurse(): void {
    this.loaderGraph = true;
    this.rates[0].series = [];
    const calcFormat = (): string => {
      switch (this.period) {
        case 'day': {
          return 'HH:mm'
        }
        case 'week': {
          return 'MM/dd HH:mm'
        }
        case 'month': {
          return 'MM/dd'
        }
      }
    };
    this._req.getWavesRates(this.period)
      .then(res => {
        this.curse_details = {
          price: res[0].price,
          diff: res[0].diff,
          percentage: res[0].percent,
          mark: res[0].mark
        };
        this.rates = res;
        for (const rate of this.rates) {
          rate.series.map(item => item.name = this._date.transform(item.timestamp, calcFormat()));
          this.rates[this.rates.indexOf(rate)] = {name: rate['currency_from'], series: rate.series};
        }
        this.loading = false;
        this.loaderGraph = false;
      }).catch(() => this.loading = false);
  }

  getAccountAssets(): void {
    this._assets.getAccountAssets()
      .then(res => {
        this.picked_assets = [];
        res.account.wallets.map(wallet => {
          wallet.assets.map(asset => {
            this.picked_assets.push({...asset, address: wallet.address})
          });
          this.getAssets();
        });
      }).catch();
  }

  confirmDelAsset(): void {
    console.log(this.current_asset);
    this._assets.removeAsset({address: this.current_asset.address, asset_id: this.current_asset.blockchain_asset.identifier})
      .then(() => {
        this.getAccountAssets();
        this._confirmDialog.hideDialog();
      }).catch()
  }

  cancelDelAsset(): void {
    this._confirmDialog.hideDialog();
    this.current_asset = undefined;
  }

  ngOnInit(): void {
    this.getCurse();
    this.getAccountAssets();
  }
}

