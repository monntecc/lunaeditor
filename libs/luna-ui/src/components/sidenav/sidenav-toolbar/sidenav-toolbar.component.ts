import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavToolbarItemComponent } from '../sidenav-toolbar-item/sidenav-toolbar-item.component';
import { SidenavToolbarItem } from '../../../shared/interfaces/SidenavToolbarItem';
import { SidenavToolbarItemType } from '../../../shared/interfaces/SidenavToolbarItemType';

@Component({
  selector: 'luna-sidenav-toolbar',
  standalone: true,
  imports: [CommonModule, SidenavToolbarItemComponent],
  templateUrl: './sidenav-toolbar.component.html',
  styleUrl: './sidenav-toolbar.component.scss',
})
export class SidenavToolbarComponent {
  @Input() items: WritableSignal<SidenavToolbarItem[]> = signal([]);

  current: WritableSignal<SidenavToolbarItemType> = signal(SidenavToolbarItemType.NONE);

  @Output() selected: EventEmitter<SidenavToolbarItemType> = new EventEmitter<SidenavToolbarItemType>();

  select(type: SidenavToolbarItem['type']): void {
    if (this.current() === type) {
      this.current.set(SidenavToolbarItemType.NONE);
      this.selected.emit(SidenavToolbarItemType.NONE);
      return;
    }

    this.current.set(type);
    this.selected.emit(type);
  }
}
