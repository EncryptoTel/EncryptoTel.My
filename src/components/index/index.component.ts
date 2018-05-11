import {Component, OnInit} from '@angular/core';
import {PageInfo} from '../../models/page-info.model';
import {RequestServices} from '../../services/request.services';
import {StorageServices} from '../../services/storage.services';
import {Router} from '@angular/router';

@Component({
  selector: 'my-index',
  templateUrl: 'template.html'
})

export class IndexComponent implements OnInit {

  // Page data
  pageInfo: PageInfo;
  loading: boolean;

  constructor(private req: RequestServices,
              private storage: StorageServices,
              private router: Router) {
    this.pageInfo = {
      title: 'Index page',
      description:
        `The entire Cardano team is made up of experts around the world, and the core technology team<br class="hidden_sm_down">
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
    };
    this.loading = true;
  }

  ngOnInit() {
    const last_url = this.storage.readItem('last_url') || 'dashboard';
    if (last_url !== '/sign-in') {
      // this.router.navigate([last_url]);
    }
    console.log(last_url);
    this.req.post('account/me', {}, true).then(res => {
      localStorage.removeItem('_auth_tk');
      this.storage.writeItem('_auth_tk', res);
    }).catch(err => {
      console.error(err);
    })
  }
}
