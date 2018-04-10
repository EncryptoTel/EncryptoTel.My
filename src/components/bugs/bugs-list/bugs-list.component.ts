import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel} from '../../../models/bug.model';


@Component({
  selector: 'bugs-list-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsListComponent {
  constructor(private _service: BugsServices) {
    this.getBugs();
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  bugs: BugModel[];

  getBugs() {
    this._service.getBugs().then(res => {
      console.log(res);
      this.bugs = res.issues;
    }).catch(err => {
      console.error(err);
    });
  }
}
