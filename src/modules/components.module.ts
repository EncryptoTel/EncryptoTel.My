import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ElementsModule} from './elements.module';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {IndexComponent} from '../components/index/index.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ElementsModule
  ],
  declarations: [
    PageNotFoundComponent,
    IndexComponent
  ],
  exports: [
    ElementsModule,
    PageNotFoundComponent,
    IndexComponent
  ]
})
export class ComponentsModule {}
