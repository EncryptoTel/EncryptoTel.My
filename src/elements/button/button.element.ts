import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'button-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class ButtonElement {
  @Input() value: string;
  @Input() buttonType: string;
  @Input() loading: boolean;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('button') button: ElementRef;

  constructor() {
    if (!this.value) {
      this.value = 'Submit'
    }
    if (!this.buttonType) {
      this.buttonType = 'accent'
    }
  }

  clicked(ev?: MouseEvent): void {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    const div = document.createElement('div');
    this.button.nativeElement.appendChild(div);
    const radius = this.button.nativeElement.clientWidth;
    div.style.width = div.style.height = radius + 'px';
    div.style.top = ev.offsetY - radius / 2 + 'px';
    div.style.left = ev.offsetX - radius / 2 + 'px';
    div.classList.add('button_overlay');
    if (radius < 150) {
      div.classList.add('small');
      setTimeout(() => {
        this.button.nativeElement.removeChild(div);
      }, 300);
    } else if (radius >= 150 && radius < 300) {
      div.classList.add('medium');
      setTimeout(() => {
        this.button.nativeElement.removeChild(div);
      }, 400);
    } else {
      setTimeout(() => {
        this.button.nativeElement.removeChild(div);
      }, 550);
    }
    this.onClick.emit();
  }
}
