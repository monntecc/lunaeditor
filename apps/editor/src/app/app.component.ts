import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/modules/material.module';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule, TitlebarComponent, TitlebarComponent, SidenavComponent],
  selector: 'luna-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
