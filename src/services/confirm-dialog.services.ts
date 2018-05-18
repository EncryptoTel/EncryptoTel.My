import {Injectable} from '@angular/core';

@Injectable()

export class ConfirmDialogServices {
  visible = false;

  showDialog() {
    this.visible = true;
  }
  hideDialog() {
    this.visible = false;
  }
}
