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

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MainRouterModule
  ],
  declarations: [
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    ButtonElement,
    TransactionElement
  ],
  exports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MainRouterModule,
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement,
    LoaderElement,
    ButtonElement,
    TransactionElement
  ]
})
export class ElementsModule {}
