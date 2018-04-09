import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class BugsServices {
  constructor(private request: RequestServices) {
  }

  search(value: string) {
    return this.request.post('issues', {my: false, q: value}, true);
  }
  getBugs() {
    return this.request.post('issues', {my: false}, true);
  }
}
