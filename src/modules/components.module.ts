import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsModule} from './elements.module';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {IndexComponent} from '../components/index/index.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ElementsModule
  ],
  declarations: [
    PageNotFoundComponent,
    IndexComponent,
    TransactionsComponent
  ],
  exports: [
    ElementsModule,
    PageNotFoundComponent,
    IndexComponent,
    TransactionsComponent
  ]
})
export class ComponentsModule {}
