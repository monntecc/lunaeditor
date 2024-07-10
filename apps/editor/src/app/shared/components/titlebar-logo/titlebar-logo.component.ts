import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'luna-titlebar-logo',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './titlebar-logo.component.html',
  styleUrl: './titlebar-logo.component.scss',
})
export class TitlebarLogoComponent {}
