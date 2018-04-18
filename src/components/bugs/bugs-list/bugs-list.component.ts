import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {BugModel} from '../../../models/bug.model';
import {Router} from '@angular/router';


@Component({
  selector: 'bugs-list-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsListComponent {
  constructor(private _service: BugsServices,
              private router: Router) {
    this.getBugs();
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  bugs: BugModel[];
  page = 1;


  getBug(bug): void {
    this.router.navigate(['bugs', bug.id])
  }

  vote(id) {
    this._service.vote(id).then(res => {
      this.getBugs();
    }).catch(err => {
      console.error(err);
    })
  }

  prevPage(): void {
    if (this.page !== 1) {
      this.page -= 1;
      this.getBugs();
    }
  }

  nextPage(): void {
    this.page += 1;
    this.getBugs();
  }

  private getBugs(): void {
    this._service.getBugs(this.page).then(res => {
      this.bugs = res.issues;
    }).catch(err => {
      console.error(err);
    });
  }
}
