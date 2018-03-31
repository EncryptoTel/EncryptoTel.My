import {Component} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';

@Component({
  selector: 'my-index',
  templateUrl: 'template.html'
})

export class IndexComponent {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  constructor() {
    this.pageInfo = {
      title: 'Index page',
      description:
      `The entire Cardano team is made up of experts around the world, and the core technology team<br class="hidden_sm_down">
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
    this.loading = true;
  }
}
