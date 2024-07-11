import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KbdComponent } from '@luna/luna-ui';
import { TitlebarMenu } from '../../../shared/interfaces/TitlebarMenu';

@Component({
  selector: 'luna-titlebar-menu',
  standalone: true,
  imports: [CommonModule, KbdComponent],
  templateUrl: './titlebar-menu.component.html',
  styleUrl: './titlebar-menu.component.scss',
})
export class TitlebarMenuComponent {
  @Input() menu: TitlebarMenu = { title: '', options: [] };

  hovered: WritableSignal<boolean> = signal(false);

  toggleHovered(): void {
    this.hovered.set(!this.hovered());
  }
}
