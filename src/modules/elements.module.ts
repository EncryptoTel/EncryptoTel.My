import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

import {ClickOutsideDirective} from '../shared/click-outside.directive';

import {HeaderElement} from '../elements/header/header.element';
import {MainRouterModule} from './router.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {PageInfoElement} from '../elements/page-info/page-info.element';

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
    PageInfoElement
  ],
  exports: [
    CommonModule,
    BrowserModule,
    AngularSvgIconModule,
    MainRouterModule,
    ClickOutsideDirective,
    HeaderElement,
    PageInfoElement
  ]
})
export class ElementsModule {}
