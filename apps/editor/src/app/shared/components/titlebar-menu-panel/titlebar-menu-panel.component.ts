import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarLogoComponent } from '../titlebar-logo/titlebar-logo.component';
import { TitlebarMenu } from '../../interfaces/TitlebarMenu';
import { LayoutService } from '../../services/layout.service';
import { FileService } from '../../services/file.service';
import { KbdComponent } from '../kbd/kbd.component';
import { TitlebarMenuComponent } from '../titlebar-menu/titlebar-menu.component';

@Component({
  selector: 'luna-titlebar-menu-panel',
  standalone: true,
  imports: [CommonModule, TitlebarLogoComponent, KbdComponent, TitlebarMenuComponent],
  templateUrl: './titlebar-menu-panel.component.html',
  styleUrl: './titlebar-menu-panel.component.scss',
})
export class TitlebarMenuPanelComponent {
  menus: WritableSignal<TitlebarMenu[]> = signal([]);


  constructor(private readonly fileService: FileService, private readonly layoutService: LayoutService) {
    this.menus.set([
      {
        title: 'File',
        options: [
          {
            title: 'Open',
            onInteract: (): void =>  {
              this.fileService.open().catch();
            },
            shortcut: 'ctrl + o'
          },
          {
            title: 'New',
            onInteract: (): void => {
              this.fileService.new();
            },
            shortcut: 'ctrl + n'
          },
          {
            title: 'Save',
            onInteract: (): void => {
              this.fileService.saveActive().catch();
            },
            shortcut: 'ctrl + s'
          },
          {
            title: 'Close active',
            onInteract: (): void => {
              this.fileService.close(this.fileService.active()?.tabId as string);
            },
            shortcut: 'ctrl + w'
          },
          {
            title: 'Exit',
            onInteract: this.layoutService.closeApp,
            shortcut: 'alt + f4'
          }
        ]
      },
      {
        title: 'Edit',
        options: [
          {
            title: 'Cut',
            onInteract: () => console.log('Cut option selected'),
            shortcut: 'ctrl + x'
          },
          {
            title: 'Copy',
            onInteract: () => console.log('Copy option selected'),
            shortcut: 'ctrl + c'
          },
          {
            title: 'Paste',
            onInteract: () => console.log('Paste option selected'),
            shortcut: 'ctrl + v'
          }
        ]
      }
    ]);
  }
}
