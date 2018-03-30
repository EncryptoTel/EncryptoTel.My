import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {UserTokenInterceptor} from '../shared/user-token.interceptor';

import {ComponentsModule} from './components.module';

import {LoggerServices} from '../services/logger.services';
import {StorageServices} from '../services/storage.services';
import {RequestServices} from '../services/request.services';

import {MainViewComponent} from '../components/main-view.component';
import {TransactionsServices} from '../services/transactions.services';
import {AuthorizationServices} from '../services/authorization.services';

@NgModule({
  declarations: [
    MainViewComponent
  ],
  imports: [
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    LoggerServices,
    StorageServices,
    {provide: HTTP_INTERCEPTORS, useClass: UserTokenInterceptor, multi: true},
    RequestServices,
    AuthorizationServices,
    TransactionsServices
  ],
  bootstrap: [MainViewComponent]
})
export class AppModule { }
