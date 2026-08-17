import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

/** Uso: {{ 'nav.about' | t:i18n.locale() }} o {{ 'projects.shotAlt' | t:i18n.locale():{ title: name } }} */
@Pipe({ name: 't', pure: true })
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(
    key: string,
    _locale: string,
    params?: Record<string, string>
  ): string {
    return this.i18n.t(key, params);
  }
}
