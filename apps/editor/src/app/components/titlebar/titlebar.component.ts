import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlebarActionsComponent } from './titlebar-actions/titlebar-actions.component';
import { TitlebarMenuPanelComponent } from './titlebar-menu-panel/titlebar-menu-panel.component';

@Component({
  selector: 'luna-titlebar',
  standalone: true,
  imports: [CommonModule, TitlebarActionsComponent, TitlebarMenuPanelComponent],
  templateUrl: './titlebar.component.html',
  styleUrl: './titlebar.component.scss',
})
export class TitlebarComponent {}
