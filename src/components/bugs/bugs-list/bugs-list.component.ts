import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';
import {Router} from '@angular/router';
import {FadeAnimation} from '../../../shared/functions';


@Component({
  selector: 'bugs-list-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class BugsListComponent {
  constructor(private _service: BugsServices,
              private router: Router) {
    this._service.getBugs();
    this._service.getStatuses();
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };

  getBug(bug): void {
    this.router.navigate(['bugs', bug.id])
  }

  vote(id: number): void {
    this._service.vote(id).then(() => {
      this._service.getBugs();
    }).catch(err => {
      console.error(err);
    })
  }

  report(id: number): void {
    this._service.report(id).then(() => {
      this._service.getBugs();
    }).catch(err => {
      console.error(err);
    })
  }

  prevPage(): void {
    if (this._service.filter.page !== 1) {
      this._service.filter.page -= 1;
      this._service.getBugs();
    }
  }

  nextPage(): void {
    if (this._service.filter.page < this._service.pagination.last_page) {
      this._service.filter.page += 1;
      this._service.getBugs();
    }
  }

  paginationControl(): boolean {
    if (this._service.bugs) {
      return (this._service.bugs.length >= this._service.pagination.per_page || (this._service.filter.page === this._service.pagination.last_page && this._service.pagination.last_page > 1));
    } else {
      return false;
    }
  }

  forcePagination(page: number): void {
    this._service.filter.page = page;
    this._service.getBugs();
  }
}
