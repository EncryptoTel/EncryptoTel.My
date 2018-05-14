import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsModule} from './elements.module';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';
import {BonusesComponent} from '../components/bonuses/bonuses.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {RoadmapComponent} from '../components/roadmap/roadmap.component';
import {SwapComponent} from '../components/swap/swap.component';
import {ChangeEmailComponent} from '../components/change-email/change-email/change-email.component';
import {ChangeEmailConfirmComponent} from '../components/change-email/change-email-confirm/change-email-confirm.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ElementsModule
  ],
  declarations: [
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    TransactionsComponent,
    BonusesComponent,
    RoadmapComponent,
    SwapComponent,
    SettingsComponent,
    ChangeEmailComponent,
    ChangeEmailConfirmComponent
  ],
  exports: [
    ElementsModule,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    TransactionsComponent,
    BonusesComponent,
    SettingsComponent,
    RoadmapComponent,
    SwapComponent,
    ChangeEmailComponent,
    ChangeEmailConfirmComponent
  ]
})
export class ComponentsModule {}
