import { Component, computed, inject } from '@angular/core';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

export interface ExperienceBullet {
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  summary: string;
  bullets: ExperienceBullet[];
}

@Component({
  selector: 'app-experience',
  imports: [WaveDividerComponent, TranslatePipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  readonly i18n = inject(I18nService);

  readonly experiences = computed<ExperienceItem[]>(() => {
    const t = (key: string) => this.i18n.t(key);
    this.i18n.locale();
    return [
      {
        role: t('experience.role'),
        company: 'Unit0 Studio',
        period: t('experience.period'),
        summary: t('experience.summary'),
        bullets: [
          { text: t('experience.b1') },
          { text: t('experience.b2') },
          { text: t('experience.b3') },
          { text: t('experience.b4') },
        ],
      },
    ];
  });
}
