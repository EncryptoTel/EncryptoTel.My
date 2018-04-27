import {Injectable} from '@angular/core';
import {RequestServices} from './request.services';
import {Bug, BugModel, Statuses} from '../models/bug.model';

@Injectable()
export class BugsServices {
  constructor(private request: RequestServices) {
  }

  filter = {
    page: 1,
    my: false,
    status: '',
    q: ''
  };
  bugs: Bug[];
  statuses: Statuses = {
    all: 0,
    my: 0,
    statuses: []
  };
  listLoading = true;
  statusLoading = true;

  getStatuses(): void {
    this.request.get('issues/statuses', true).then((res: Statuses) => {
      this.statuses = res;
      this.statusLoading = false;
    }).catch(err => {
      console.error(err);
    });
  }

  getBugs() {
    this.request.post('issues', this.filter, true).then((res: BugModel) => {
      this.bugs = res.data;
      this.listLoading = false;
    }).catch(err => {
      console.error(err);
    });
  }

  getBug(id: object) {
    return this.request.post('issues/get', id, true);
  }

  getTags() {
    return this.request.get('issues/tags', true);
  }

  search(value: string) {
    return this.request.post('issues', {my: false, q: value}, true);
  }

  create(bug: object) {
    return this.request.post('issues/create', bug, true);
  }

  postComment(comment: object) {
    return this.request.post('issues/comment', comment, true)
  }

  vote(id: number) {
    return this.request.post('issues/vote', {issue_id: id}, true)
  }

  report(id: number) {
    return this.request.post('issues/claim', {issue_id: id}, true);
  }

  reportComment(id: number) {
    return this.request.post('issues/comment/claim', {comment_id: id}, true);
  }

  getPriorities() {
    return this.request.get('issues/priorities', true);
  }

  uploadFile(file: FormData) {
    return this.request.postFile('issues/upload', file);
  }

  getFiles(id: number) {
    return this.request.get(`issues/files?issue_id=${id}`, true)
  }
}
