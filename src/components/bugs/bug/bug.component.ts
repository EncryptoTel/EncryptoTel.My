import {Component} from '@angular/core';
import {BugsServices} from '../../../services/bugs.services';
import {ActivatedRoute} from '@angular/router';
import {BugReview} from '../../../models/bug.model';

@Component({
  selector: 'bug-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugComponent {
  constructor(private _service: BugsServices,
              private activatedRoute: ActivatedRoute) {
    this.getBag();
  }

  id = this.activatedRoute.snapshot.params.id;
  details: BugReview = {
    comments: [],
    description: '',
    id: 0,
    status: {
      name: '',
      is_closed: 0
    },
    summary: '',
    user: {
      email: '',
      deleted_at: '',
      hash: ''
    },
    votes: 0
  };

  getBag(): void {
    this._service.getBug({id: this.id}).then((res: BugReview) => {
      this.details = res;
    }).catch(err => {
      console.error(err);
    })
  }

  postComment(commentField): void {
    console.log(commentField.value);
    this._service.postComment({issue_id: this.id, comment: commentField.value}).then(res => {
      this.getBag();
      commentField.value = null;
    }).catch(err => {
      console.error(err);
    })
  }
}
