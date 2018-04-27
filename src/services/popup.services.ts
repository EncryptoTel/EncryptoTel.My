import {Injectable} from '@angular/core';

@Injectable()
export class PopupServices {
  visible = false;
  private type: string;
  private text: string;

  showError(text: string): void {
    this.show(text, 'error');
  }

  showSuccess(text) {
    this.show(text, 'success');
  }

  private show(text: string, type: string) {
    this.visible = true;
    this.type = type;
    this.text = text;
    setTimeout(() => {
      this.visible = false;
    }, 5000)
  }
}
