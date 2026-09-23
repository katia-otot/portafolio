import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portafolio-theme';
  readonly theme = signal<ThemeMode>('light');

  init(): void {
    const stored = this.readStored();
    const preferred =
      stored ??
      (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark');
    this.apply(preferred);
  }

  toggle(): void {
    this.apply(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private apply(mode: ThemeMode): void {
    this.theme.set(mode);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', mode);
      const styleEl = document.getElementById('theme-cursors');
      styleEl?.remove();
      document.documentElement.style.cursor = '';
      if (document.body) {
        document.body.style.cursor = '';
      }
    }
    try {
      localStorage.setItem(this.storageKey, mode);
    } catch {
      /* ignore */
    }
  }

  private readStored(): ThemeMode | null {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
