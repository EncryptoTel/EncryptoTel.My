import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel, Tags} from '../../../models/bug.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
    'summary': new FormControl(null, Validators.minLength(5)),
    'description': new FormControl(null, Validators.minLength(10))
  });

  priorities: string[] = [
    'Fault - non-service related fault, such as spelling mistake, text error etc',
    'Minor - non-critical error, that does not significantly affect the service',
    'Major - significant error leading to service malfunction',
    'Critical - error leading to service stop'
  ];

  priority = 'Select one';

  private newBug = {
    summary: '',
    description: '',
    kind: 1
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
    if (this.newBugForm.valid) {
      this.newBug = {
        summary: this.newBugForm.value.summary,
        description: this.newBugForm.value.description,
        kind: 1
      };
      this._service.create(this.newBug).then(() => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      }).catch(err => {
        console.error(err);
      })
    }
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  setTag(event) {
    this.priority = event;
  }
}
