import {Component} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';
import {BugsServices} from '../../services/bugs.services';
import {FadeAnimation} from '../../shared/functions';
import {Router} from '@angular/router';


@Component({
  selector: 'bugs-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class BugsComponent {
  constructor(private _service: BugsServices,
              private router: Router) {
    this._service.getStatuses();
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  showButtonCreate = true;

  filter(filter): void {
    this._service.filter.q = '';
    if (filter === 'all' || filter === 'my') {
      this._service.filter.my = filter === 'my';
      this._service.filter.status = '';
    } else {
      this._service.filter.status = filter;
      this._service.filter.my = false;
    }
    this._service.getBugs();
    this.router.navigate(['bugs']);
  }

  search(searchField: HTMLInputElement): void {
    this._service.filter.q = searchField.value;
    this._service.filter.my = false;
    this._service.filter.status = '';
    this._service.getBugs();
    this.router.navigate(['bugs']);
  }

  onActivate(component): void {
    component.title && component.title === 'Bugs Create' ? this.showButtonCreate = false : this.showButtonCreate = true;
  }
}
