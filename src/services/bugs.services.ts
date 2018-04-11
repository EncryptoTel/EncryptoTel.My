import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';

@Injectable()
export class BugsServices {
  constructor(private request: RequestServices) {
  }

  search(value: string) {
    return this.request.post('issues', {my: false, q: value}, true);
  }

  getBugs(page: number) {
    return this.request.post('issues', {my: false, page: page}, true);
  }

  getBug(id: object) {
    return this.request.post('issues/get', id, true);
  }

  getTags() {
    return this.request.get('issues/tags', true);
  }

  create(bug: object) {
    return this.request.post('issues/create', bug, true);
  }

  postComment(comment: object) {
    return this.request.post('issues/comment', comment, true)
  }
}
