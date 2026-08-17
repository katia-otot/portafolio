import { Injectable, signal } from '@angular/core';
import { Locale, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly storageKey = 'portafolio-locale';
  readonly locale = signal<Locale>('es');

  init(): void {
    const stored = this.readStored();
    this.apply(stored ?? 'es');
  }

  setLocale(locale: Locale): void {
    this.apply(locale);
  }

  toggle(): void {
    this.apply(this.locale() === 'es' ? 'en' : 'es');
  }

  t(key: string, params?: Record<string, string>): string {
    const lang = this.locale();
    const raw =
      TRANSLATIONS[lang][key] ?? TRANSLATIONS.es[key] ?? key;
    if (!params) {
      return raw;
    }
    return Object.entries(params).reduce(
      (text, [name, value]) => text.replaceAll(`{{${name}}}`, value),
      raw
    );
  }

  private apply(locale: Locale): void {
    this.locale.set(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
      document.title = this.t('doc.title');
    }
    try {
      localStorage.setItem(this.storageKey, locale);
    } catch {
      /* ignore */
    }
  }

  private readStored(): Locale | null {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value === 'es' || value === 'en' ? value : null;
    } catch {
      return null;
    }
  }
}
