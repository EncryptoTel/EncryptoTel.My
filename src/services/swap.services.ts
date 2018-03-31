import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class SwapServices {
  constructor(private _req: RequestServices) {}
}

