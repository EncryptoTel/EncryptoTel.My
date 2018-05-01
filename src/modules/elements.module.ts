import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClickOutsideDirective} from '../shared/click-outside.directive';

import {HeaderElement} from '../elements/header/header.element';
import {MainRouterModule} from './router.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {PageInfoElement} from '../elements/page-info/page-info.element';
import {LoaderElement} from '../elements/loader/loader.element';
import {ButtonElement} from '../elements/button/button.element';
import {TransactionElement} from '../elements/transaction/transaction.element';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PopupElement} from '../elements/popup/popup.element';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MainRouterModule,
    NgxChartsModule
  ],
  declarations: [
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    ButtonElement,
    TransactionElement,
    PopupElement
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MainRouterModule,
    NgxChartsModule,
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    ButtonElement,
    TransactionElement,
    PopupElement
  ]
})
export class ElementsModule {}
