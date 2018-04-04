import {Component} from '@angular/core';
import {PageInfo} from '../../../models/page-info.model';


@Component({
  selector: 'bugs-form-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsFormComponent {
  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  }
}
