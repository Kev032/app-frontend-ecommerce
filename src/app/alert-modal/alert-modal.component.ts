import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.sass'],
})
export class AlertModalComponent {
  @Input() typeMessage: string = '';
  @Input() mensaje: string = '';
}
