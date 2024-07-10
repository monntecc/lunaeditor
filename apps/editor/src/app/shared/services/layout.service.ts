import { Injectable } from '@angular/core';
import { appWindow } from '@tauri-apps/api/window';
import { SystemTheme } from '../interfaces/SystemTheme';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  minimizeApp(): void {
    appWindow.minimize().catch();
  }

  maximizeApp(): void {
    appWindow.toggleMaximize().catch();
  }

  closeApp(): void {
    appWindow.close().catch();
  }

  systemTheme(): SystemTheme {
    const isDarkTheme: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkTheme ? SystemTheme.DARK : SystemTheme.LIGHT;
  }
}
