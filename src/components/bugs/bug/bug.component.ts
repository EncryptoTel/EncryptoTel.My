import {Component} from '@angular/core';
import {BugsServices} from '../../../services/bugs.services';
import {ActivatedRoute} from '@angular/router';
import {BugReview} from '../../../models/bug.model';
import {FadeAnimation} from '../../../shared/functions';

@Component({
  selector: 'bug-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class BugComponent {
  constructor(private _service: BugsServices,
              private activatedRoute: ActivatedRoute) {
    this.getBag();
  }

  id = this.activatedRoute.snapshot.params.id;
  details: BugReview = {
    claim_exists: 0,
    claims_count: 0,
    comments: [],
    description: '',
    id: 0,
    kind_id: 1,
    priority: {
      name: ''
    },
    status: {
      name: '',
      is_closed: 0,
      issues: 0,
      id: 0
    },
    summary: '',
    user: {
      email: '',
      is_admin: 0,
      hash: ''
    },
    vote_exists: 0,
    votes_count: 0
  };
  loading = false
  ;

  getBag(): void {
    this.loading = true;
    this._service.getBug({id: this.id}).then((res: BugReview) => {
      this.details = res;
      this.loading = false;
    }).catch(err => {
      console.error(err);
    })
  }

  postComment(commentField): void {
    this._service.postComment({issue_id: this.id, comment: commentField.value}).then(() => {
      this.getBag();
      commentField.value = null;
    }).catch(err => {
      console.error(err);
    })
  }

  formatClaims(item) {
    if (item.claims_count !== 0) {
      return item.claims_count
    }
  }

  report(): void {
    if (this.details.claim_exists === 0) {
      this._service.report(this.details.id).then(() => {
        this.getBag();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  reportComment(comment): void {
    if (comment.claim_exists === 0) {
      this._service.reportComment(comment.id).then(() => {
        this.getBag();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  vote(): void {
    if (this.details.vote_exists === 0) {
      this._service.vote(this.details.id).then(() => {
        this.getBag();
      }).catch(err => {
        console.error(err);
      })
    }
  }
}
