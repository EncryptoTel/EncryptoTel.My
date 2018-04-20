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

  @Input() values: any[] = [];
  @Input() currentValue = '';
  @Output() getValue = new EventEmitter<string>();

  toggleVisible() {
    this.state = !this.state;
  }

  setValue(value) {
    this.currentValue = value;
    this.getValue.emit(this.currentValue);
  }
}

