import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {ClickOutsideDirective} from '../shared/click-outside.directive';

import {HeaderElement} from '../elements/header/header.element';
import {MainRouterModule} from './router.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {PageInfoElement} from '../elements/page-info/page-info.element';
import {TransactionElement} from '../elements/transaction/transaction.element';
import {LoaderElement} from '../elements/loader/loader.element';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AngularSvgIconModule,
    MainRouterModule
  ],
  declarations: [
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    TransactionElement
  ],
  exports: [
    CommonModule,
    BrowserModule,
    AngularSvgIconModule,
    MainRouterModule,
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    TransactionElement
  ]
})
export class ElementsModule {}
