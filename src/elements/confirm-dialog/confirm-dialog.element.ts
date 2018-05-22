import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmDialogServices} from '../../services/confirm-dialog.services';

@Component({
  selector: 'confirm-dialog-element',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class ConfirmDialogElement {
  @Input() text = 'Are you sure?';
  @Output() accept = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor(private _service: ConfirmDialogServices) {}

  acceptHandler(): void {
    this.accept.emit(true);
  }

  cancelHandler(): void {
    this.cancel.emit(true);
  }

  closeDialog(): void {
    this._service.visible = false;
  }
}

