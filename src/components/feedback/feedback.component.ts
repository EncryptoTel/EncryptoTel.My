import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BugsServices} from '../../services/bugs.services';

@Component({
  selector: 'feedback-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class FeedbackComponent {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _service: BugsServices) {

  }

  newBugForm: FormGroup = new FormGroup({
    'summary': new FormControl(),
    'description': new FormControl()
  });

  create() {
    const feedback = {
      summary: this.newBugForm.value.summary,
      description: this.newBugForm.value.description,
      kind: 2
    };
    this._service.create(feedback).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }
}
