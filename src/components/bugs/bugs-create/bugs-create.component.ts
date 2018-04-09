import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';
import {BugsServices} from '../../../services/bugs.services';


@Component({
  selector: 'bugs-create-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsCreateComponent {
  constructor(private _service: BugsServices) {
  }

  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  title = 'Bugs Create';

  search(event) {
    const title = event.target.value;
    console.log(title);
    this._service.search(title).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    })
  }
}
