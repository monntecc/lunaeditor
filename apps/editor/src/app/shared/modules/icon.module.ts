import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class IconModule {
  readonly _path: string = '../../../assets/icons';

  readonly _icons: ReadonlyArray<string> = [
    'close',
    'minus',
    'maximize'
  ];

  constructor(private readonly domSanitizer: DomSanitizer, private readonly iconRegistry: MatIconRegistry) {
    this._icons.forEach((icon: string): void => {
      const path = `${this._path}/${icon}.svg`;
      this.iconRegistry.addSvgIcon(icon, this.bypass(path));
    });
  }

  private bypass(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
