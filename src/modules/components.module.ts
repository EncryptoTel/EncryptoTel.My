import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsModule} from './elements.module';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {IndexComponent} from '../components/index/index.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';
import {BonusesComponent} from '../components/bonuses/bonuses.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {RoadmapComponent} from '../components/roadmap/roadmap.component';
import {SwapComponent} from '../components/swap/swap.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ElementsModule
  ],
  declarations: [
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    IndexComponent,
    TransactionsComponent,
    BonusesComponent,
    RoadmapComponent,
    SwapComponent,
    SettingsComponent
  ],
  exports: [
    ElementsModule,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    IndexComponent,
    TransactionsComponent,
    BonusesComponent,
    SettingsComponent,
    RoadmapComponent,
    SwapComponent
  ]
})
export class ComponentsModule {}
