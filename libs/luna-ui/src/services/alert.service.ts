import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  durationInSeconds = 10;

  message: Subject<string> = new Subject<string>();

  constructor(
    private alertBar: MatSnackBar,
  ) {}

  info(message: string) {
    this.alertBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message, action: 'confirm' },
      panelClass: ['info-snackbar'],
      horizontalPosition: 'end'
    });
  }

  error(message: string) {
    this.alertBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      data: { message, action: 'error' },
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end'
    });
  }
}
