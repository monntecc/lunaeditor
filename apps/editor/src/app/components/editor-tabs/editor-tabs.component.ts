import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FileService } from '../../services/file.service';
import { EditorTabComponent } from './editor-tab/editor-tab.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'luna-editor-tabs',
  standalone: true,
  imports: [CommonModule, MatIcon, MatTooltip],
  templateUrl: './editor-tabs.component.html',
  styleUrl: './editor-tabs.component.scss',
})
export class EditorTabsComponent implements AfterContentInit {
  @ContentChildren(EditorTabComponent) tabs: QueryList<EditorTabComponent> | undefined;

  constructor(protected readonly fileService: FileService) {
  }

  ngAfterContentInit(): void {
    if (!this.tabs) return;

    // Get all active tabs
    const activeTabs: EditorTabComponent[] = this.tabs.filter((tab: EditorTabComponent) => tab.active());

    // If there is no active tab set, activate the first one
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: EditorTabComponent): void {
    if (!this.tabs || !tab) return;

    // Deactivate all tabs
    this.tabs.toArray().forEach((tab: EditorTabComponent): void => tab.active.set(false));

    // Activate the tab the user has clicked on
    tab.active.set(true);

    // Update active tab id
    this.fileService.activeFileId.set(tab.fileId);
  }
}
