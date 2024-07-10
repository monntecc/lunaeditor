import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { IconModule } from './icon.module';

@NgModule({
  imports: [IconModule],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        disableClose: false,
        hasBackdrop: true,
        width: 'auto',
      } as MatDialogConfig,
    },
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
})
export class MaterialModule {}
