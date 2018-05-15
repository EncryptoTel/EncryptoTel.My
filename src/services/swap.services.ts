import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class SwapServices {
  constructor(private _req: RequestServices) {}
  getSupply(): Promise<any> {
    return this._req.getSwap('supply');
  }
  getEthereumStatus(): Promise<any> {
    return this._req.getSwapStatus('status/ethereum');
  }
  getWavesStatus(): Promise<any> {
    return this._req.getSwapStatus('status/waves');
  }
  getWavesAmount(): Promise<any> {
    return this._req.getWaves('assets/balance/3PPk9fmA1GGXhpVfJwBzj9hQbj6HiL9TSbn/8ofu3VpEaVCFjRqLLqzTMNs5URKUUQMrPp3k6oFmiCc6', true)
  }
  getEthAmount(): Promise<any> {
    return this._req.getEth('module=account&action=tokenbalance&contractaddress=0xe0c72452740414d861606a44ccd5ea7f96488278&address=0x53a3acb0c205fce16b58c05d145009dc83af0b38' +
      '&tag=latest&apikey=6IUI24CQUWUPAS3N2QYFVT9R6BFY5F1HAN', true)
  }
  postData(data): Promise<any> {
    return this._req.post('address/bind', data, true);
  }
}

