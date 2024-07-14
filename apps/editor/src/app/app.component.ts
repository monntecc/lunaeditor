import { Component, signal, WritableSignal } from '@angular/core';
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
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import CodeMirror from 'codemirror';
import { CodeData } from './shared/interfaces/CodeData';
import { CodeLang } from './shared/interfaces/CodeLang';

@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule, TitlebarComponent, TitlebarComponent, SidenavComponent, EditorTabsComponent, EditorTabComponent, JsonPipe, CodemirrorModule, FormsModule, StatusbarComponent],
  selector: 'luna-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cursorData: WritableSignal<CodeData> = signal({
    line: 1,
    column: 1,
    tabSize: 4,
    lang: CodeLang.JAVASCRIPT,
    selectedChars: 0,
    selectedColumns: 0,
  });

  constructor(protected readonly fileService: FileService) {
  }

  onCodeChange(cursor: CodeMirror.Editor): void {
    const line = (<any>cursor).doc.sel.ranges[0].anchor.ch + 1;
    const column = (<any>cursor).doc.sel.ranges[0].anchor.line + 1;
    const selectedColumns = cursor.getDoc().getSelection().split('\n').length;
    const selectedChars = cursor.getDoc().getSelection().length;
    const tabSize = (<any>cursor).options.tabSize;

    this.cursorData.set({
      line,
      tabSize,
      column,
      selectedChars,
      selectedColumns,
      lang: CodeLang.JAVASCRIPT
    });
  }
}
