import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'luna-sidenav-toolbar-item',
  standalone: true,
  imports: [CommonModule, MatIcon, MatTooltip],
  templateUrl: './sidenav-toolbar-item.component.html',
  styleUrl: './sidenav-toolbar-item.component.scss',
})
export class SidenavToolbarItemComponent {
  @Input() active = false;

  @Input() icon = '';

  @Input() placeholder = '';
}
