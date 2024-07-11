import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  readonly sidenavMinWidth = 250;
  readonly sidenavMaxWidth = window.innerWidth - 500;

  constructor() {
    document.body.style.setProperty('--sidenav-width', `${this.sidenavMinWidth}px`);
  }

  get sidenavWidth(): number {
    return parseInt(
      getComputedStyle(document.body).getPropertyValue('--sidenav-width'),
      10
    );
  }

  setSidenavWidth(width: number) {
    const clampedWidth = Math.min(
      Math.max(width, this.sidenavMinWidth),
      this.sidenavMaxWidth
    );

    document.body.style.setProperty('--sidenav-width', `${clampedWidth}px`);
  }
}
