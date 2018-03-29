import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsModule} from './elements.module';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {IndexComponent} from '../components/index/index.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';
import {BonusesComponent} from '../components/bonuses/bonuses.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ElementsModule
  ],
  declarations: [
    PageNotFoundComponent,
    IndexComponent,
    TransactionsComponent,
    BonusesComponent,
    SignInComponent
  ],
  exports: [
    ElementsModule,
    PageNotFoundComponent,
    IndexComponent,
    TransactionsComponent,
    BonusesComponent,
    SignInComponent
  ]
})
export class ComponentsModule {}
