import { Injectable } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  durationInSeconds = 15;

  message: Subject<string> = new Subject<string>();

  constructor(
    private alertBar: MatSnackBar,
  ) {}

  info(message: string) {
    this.alertBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message, action: 'confirm' },
      panelClass: ['info-snackbar'],
    });
  }

  error(message: string) {
    this.alertBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message, action: 'error' },
      panelClass: ['error-snackbar'],
    });
  }
}
