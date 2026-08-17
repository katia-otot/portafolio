import { Component, inject } from '@angular/core';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

@Component({
  selector: 'app-about',
  imports: [WaveDividerComponent, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly i18n = inject(I18nService);
}
