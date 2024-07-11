import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'luna-alert',
  standalone: true,
  imports: [CommonModule, MatIconButton, MatIcon],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; action: string },
    private snackRef: MatSnackBarRef<AlertComponent>,
  ) {}

  dismiss(): void {
    this.snackRef.dismiss();
  }
}
