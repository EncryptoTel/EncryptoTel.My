import {Component} from '@angular/core';
import {BugsServices} from '../../../services/bugs.services';
import {ActivatedRoute} from '@angular/router';
import {BugReview, Comments, File} from '../../../models/bug.model';
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
    this.getBug();
    this.getFiles();
  }

  id = this.activatedRoute.snapshot.params.id;
  details: BugReview = {
    claim_exists: 0,
    claims_count: 0,
    comments: [],
    created_at: '',
    description: '',
    id: 0,
    kind_id: 1,
    priority: {
      name: '',
      id: undefined,
      description: ''
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
      full_name: '',
      is_admin: 0,
      hash: ''
    },
    vote_exists: 0,
    votes_count: 0
  };
  loading = true;
  showAllComments = false;
  adminComments: Comments[] = [];
  files: File[] = [];
  root = 'http://investor-back.encry.ru/';

  getBug(): void {
    this._service.getBug({id: this.id}).then((res: BugReview) => {
      this.details = res;
      this.getAdminComments();
      this.loading = false;
    }).catch(err => {
      console.error(err);
    })
  }

  getAdminComments(): void {
    this.details.comments.forEach(el => {
      if (el.user.is_admin === 1 && el.status) {
        this.adminComments.push(el);
      }
    });
    this.adminComments.reverse();
  };

  postComment(commentField): void {
    if (this.validation(commentField)) {
      this._service.postComment({issue_id: this.id, comment: commentField.value}).then(() => {
        this.getBug();
        commentField.value = null;
      }).catch(err => {
        console.error(err);
      })
    }
  }

  formatClaims(item): number {
    if (item.claims_count !== 0) {
      return item.claims_count
    }
  }

  showAllAdminComments(): void {
    this.showAllComments = true;
  }

  report(): void {
    if (this.details.claim_exists === 0) {
      this._service.report(this.details.id).then(() => {
        this.getBug();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  reportComment(comment): void {
    if (comment.claim_exists === 0) {
      this._service.reportComment(comment.id).then(() => {
        this.getBug();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  vote(): void {
    if (this.details.vote_exists === 0) {
      this._service.vote(this.details.id).then(() => {
        this.getBug();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  setTagStyle(status: number): string {
    switch (status) {
      case (1):
        return 'new';
      case (2):
        return 'planned';
      case (3):
        return 'in_progress';
      case (4):
        return 'done';
      case (5):
        return 'known_issue';
      case (6):
        return 'closed';
      default:
        return
    }
  }

  validation(commentField): boolean {
    const isValid = commentField.value.length > 9 && commentField.value.length < 255;
    isValid ? commentField.classList.remove('invalid') : commentField.classList.add('invalid');
    return isValid;
  }

  showAlert(commentField): void {
    commentField.classList.contains('invalid')
  }

  getFiles(): void {
    this._service.getFiles(this.id).then((res: File[]) => {
      this.files = res;
    }).catch(err => {
      console.error(err);
    })
  }
}
