import {Component} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';
import {BugsServices} from '../../services/bugs.services';
import {Statuses} from '../../models/bug.model';


@Component({
  selector: 'bugs-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsComponent {
  constructor(private _service: BugsServices) {
    this.getStatuses();
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };

  showButtonCreate = true;
  statuses: Statuses = {
    all: 0,
    my: 0,
    statuses: []
  };

  filter(value: string): void {
    if (value === 'my') {
      this._service.filter.my = true;
    } else if (value === 'all') {
      this._service.filter.my = false;
    }
    this._service.getBugs();
  }

  filterStatus(id: number): void {
    this._service.filter.status = id;
    this._service.getBugs();
  }

  onActivate(component): void {
    component.title && component.title === 'Bugs Create' ? this.showButtonCreate = false : this.showButtonCreate = true;
  }

  private getStatuses(): void {
    this._service.getStatuses().then((res: Statuses) => {
      this.statuses = res;
    }).catch(err => {
      console.error(err);
    })
  }
}
