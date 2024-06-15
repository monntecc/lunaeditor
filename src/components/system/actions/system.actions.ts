import { appWindow } from '@tauri-apps/api/window';
import { TSystemTheme } from '@/components/system/models';

export const minimizeApp = () => {
  appWindow.minimize().catch();
};

export const maximizeApp = () => {
  appWindow.toggleMaximize().catch();
};

export const closeApp = (): void => {
  appWindow.close().catch();
};

export const systemTheme = (): TSystemTheme => {
  const isDarkTheme: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDarkTheme ? 'dark' : 'light';
};
