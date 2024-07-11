import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavToolbarComponent } from './sidenav-toolbar/sidenav-toolbar.component';
import { SidenavToolbarItemType } from '../../shared/interfaces/SidenavToolbarItemType';
import { SidenavToolbarItem } from '../../shared/interfaces/SidenavToolbarItem';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'luna-sidenav',
  standalone: true,
  imports: [CommonModule, SidenavToolbarComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  readonly sidenavItems: WritableSignal<SidenavToolbarItem[]> = signal([]);

  selected: WritableSignal<SidenavToolbarItemType> = signal(SidenavToolbarItemType.NONE);

   // This stores the state of the resizing event and is updated as events are fired.
  resizingEvent = {
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0,
  };

  constructor(public readonly sidenavService: SidenavService) {
    this.sidenavItems.set([
      {
        type: SidenavToolbarItemType.FILE_TREE,
        icon: 'folder',
        placeholder: 'Explorer'
      }
    ]);
  }

  openSidenav(type: SidenavToolbarItemType): void {
    this.selected.set(type);
  }

  startResizing(event: MouseEvent): void {
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenavService.sidenavWidth,
    };
  }

 // This method runs when the mouse is moved anywhere in the browser
  @HostListener('window:mousemove', ['$event'])
  updateSidenavWidth(event: MouseEvent) {
    // No need to even continue if we're not resizing
    if (!this.resizingEvent.isResizing) {
      return;
    }

    // 1. Calculate how much mouse has moved on the x-axis
    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;

    // 2. Calculate the new width according to initial width and mouse movement
    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;

    console.log(newWidth);

    // 3. Set the new width
    this.sidenavService.setSidenavWidth(newWidth);
  }

  @HostListener('window:mouseup')
  stopResizing(): void {
    this.resizingEvent.isResizing = false;
  }

  protected readonly SidenavToolbarItemType = SidenavToolbarItemType;
}
