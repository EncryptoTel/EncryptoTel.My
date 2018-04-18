import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel, Tags} from '../../../models/bug.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'bugs-create-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsCreateComponent {
  constructor(private _service: BugsServices,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  title = 'Bugs Create';
  similarBugs: BugModel = {
    issues: []
  };
  newBugForm: FormGroup = new FormGroup({
    'summary': new FormControl(),
    'description': new FormControl()
  });

  priorities: string[] = [
    'text',
    'warning',
    'error',
    'critical'
  ];

  priority = 'Select one';

  private newBug = {
    summary: '',
    description: ''
  };

  search(event) {
    const title = event.target.value;
    this._service.search(title).then((res: BugModel) => {
      this.similarBugs = res;
    }).catch(err => {
      console.error(err);
    })
  }

  create() {
    this.newBug = {
      summary: this.newBugForm.value.summary,
      description: this.newBugForm.value.description
    };
    this._service.create(this.newBug).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }
  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }
  setTag(event) {
    this.priority = event;
  }
}
