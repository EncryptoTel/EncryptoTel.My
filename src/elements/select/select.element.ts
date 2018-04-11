import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'select-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
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

