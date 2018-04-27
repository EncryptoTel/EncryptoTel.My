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
  currentValue = '[Select one]';
  @Input() values: object[] = [];
  @Input() keys: string [] = [];
  @Input() returnedValue: string;

  @Output() getValue = new EventEmitter<any>();

  toggleVisible() {
    this.state = !this.state;
  }

  setValue(value) {
    this.currentValue = `${value[this.keys[0]]} (${value[this.keys[1]]})`;
    this.getValue.emit(value);
  }

  firstWordHandler(element: string) {
    const firstWord = element.search(/\(/);
    if (firstWord !== -1) {
      const firstWordValue = element.slice(0, firstWord);
      const otherWords = element.slice(firstWord);
      return {firstWord: firstWordValue, otherWords: otherWords};
    } else {
      return {firstWord: element, otherWords: ''};
    }
  }
}

