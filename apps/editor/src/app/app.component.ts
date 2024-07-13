import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/modules/material.module';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EditorTabsComponent } from './components/editor-tabs/editor-tabs.component';
import { EditorTabComponent } from './components/editor-tabs/editor-tab/editor-tab.component';
import { FileService } from './services/file.service';
import { JsonPipe } from '@angular/common';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule, TitlebarComponent, TitlebarComponent, SidenavComponent, EditorTabsComponent, EditorTabComponent, JsonPipe, CodemirrorModule, FormsModule],
  selector: 'luna-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(protected readonly fileService: FileService) {
  }
}
