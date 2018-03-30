import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardServices} from '../services/auth-guard.services';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {IndexComponent} from '../components/index/index.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';
import {BonusesComponent} from '../components/bonuses/bonuses.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';

const Routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'dashboard', component: IndexComponent, canActivate: [AuthGuardServices]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuardServices]},
  {path: 'bonuses', component: BonusesComponent, canActivate: [AuthGuardServices]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-up/:hash', component: SignUpComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(Routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardServices
  ]
})
export class MainRouterModule {  }
