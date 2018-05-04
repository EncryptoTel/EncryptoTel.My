import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FadeAnimation} from '../../shared/functions';

@Component({
  selector: 'select-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass'],
  animations: [FadeAnimation('150ms')]
})

export class SelectElement {
  state = false;
  @Input() currentValue = '[Select one]';
  @Input() values: object[] = [];
  @Input() keys: string [] = [];
  @Input() isInvalid;
  @Input() returnedValue: string;
  @Input() oneKey: boolean;
  @Input() split: boolean;

  @Output() getValue = new EventEmitter<any>();

  toggleVisible() {
    this.state = !this.state;
  }

  setValue(value) {
    this.currentValue = value[this.keys[0]];
    this.getValue.emit(value);
  }
}

