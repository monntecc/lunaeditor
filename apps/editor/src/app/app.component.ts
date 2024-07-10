import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitlebarComponent } from './shared/components/titlebar/titlebar.component';
import { MaterialModule } from './shared/modules/material.module';

@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule, TitlebarComponent],
  selector: 'luna-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
