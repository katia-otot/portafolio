import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portafolio-theme';
  private readonly cursorVersion = '13';
  readonly theme = signal<ThemeMode>('dark');

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
      this.applyCursors(mode);
    }
    try {
      localStorage.setItem(this.storageKey, mode);
    } catch {
      /* ignore */
    }
  }

  /** Aplica los 4 cursores por tema (default, pointer, click, text). */
  private applyCursors(mode: ThemeMode): void {
    const v = this.cursorVersion;
    const s = mode === 'dark' ? '-dark' : '';
    const def = `url('/assets/cursors/cursor-default${s}.png?v=${v}') 1 1, auto`;
    const pointer = `url('/assets/cursors/cursor-pointer${s}.png?v=${v}') 16 1, pointer`;
    const click = `url('/assets/cursors/cursor-click${s}.png?v=${v}') 1 1, pointer`;
    const text = `url('/assets/cursors/cursor-text${s}.png?v=${v}') 14 14, text`;

    document.documentElement.style.cursor = def;
    if (document.body) {
      document.body.style.cursor = def;
    }

    let styleEl = document.getElementById('theme-cursors') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-cursors';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      html, body { cursor: ${def} !important; }
      a, button, .btn, [role="button"], .nav-brand, .nav-links button,
      .theme-toggle, .nav-cta, input[type="button"], input[type="submit"],
      input[type="reset"], label[for], select, summary, .gallery-item a, .tech-badge {
        cursor: ${pointer} !important;
      }
      a:active, button:active, .btn:active, [role="button"]:active,
      .nav-brand:active, .nav-links button:active, .theme-toggle:active {
        cursor: ${click} !important;
      }
      input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]),
      textarea, [contenteditable="true"],
      p, h1, h2, h3, h4, h5, h6, li, label,
      .about-text, .hero-sub, .hero-tagline, .hero-headline, .section-title,
      .experience-lead, .skills-lead, .project-description, .role-summary,
      .company-name, .value, .contact-title {
        cursor: ${text} !important;
      }
    `;
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
