import {Injectable} from '@angular/core';

@Injectable()
export class PopupServices {
  visible = false;
  private type: string;
  private text: string;

  showError(text: string, enableTimer = true): void {
    this.show(text, 'error', enableTimer);
  }

  showSuccess(text: string, enableTimer = true): void {
    this.show(text, 'success', enableTimer);
  }

  private show(text: string, type: string, enableTimer) {
    this.visible = true;
    this.type = type;
    this.text = text;
    if (enableTimer) {
      setTimeout(() => {
        this.visible = false;
      }, 5000)
    }
  }
}
