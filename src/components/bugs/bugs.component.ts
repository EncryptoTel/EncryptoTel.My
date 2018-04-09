import {Component} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';


@Component({
  selector: 'bugs-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class BugsComponent {
  pageInfo: PageInfo = {
    title: 'Encryptotel: Bugs',
    description:
      `Here you can report found bugs and functionality issues, comment on existing problems or check their status. Your contributions will help us shape the future of Encryptotel.`
  };
  showButtonCreate = true;

  onActivate(component): void {
    component.title && component.title === 'Bugs Create' ? this.showButtonCreate = false : this.showButtonCreate = true;
  }
}
