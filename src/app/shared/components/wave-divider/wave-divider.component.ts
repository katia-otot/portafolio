import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wave-divider',
  imports: [],
  templateUrl: './wave-divider.component.html',
  styleUrl: './wave-divider.component.css',
})
export class WaveDividerComponent {
  /** full = ancho del contenedor | narrow = centrada más corta (headers) */
  @Input() variant: 'full' | 'narrow' = 'full';
}
