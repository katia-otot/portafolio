import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ThemeService } from '../../shared/services/theme.service';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';
import { Locale } from '../../shared/i18n/translations';
import { EditorialIconComponent } from '../../shared/components/editorial-icon/editorial-icon.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    TranslatePipe,
    EditorialIconComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  menuOpen = false;

  readonly themeService = inject(ThemeService);
  readonly i18n = inject(I18nService);

  @ViewChild('heroTiltRoot') private heroTiltRoot?: ElementRef<HTMLElement>;
  @ViewChild('heroTiltInner') private heroTiltInner?: ElementRef<HTMLElement>;

  private static readonly TILT_MAX_PX = 6;
  private static readonly TILT_MAX_DEG = 2;
  private static readonly TILT_EASE = 0.12;
  private static readonly TILT_REST_EPS = 0.02;

  private hoverMq?: MediaQueryList;
  private reduceMq?: MediaQueryList;
  private tiltActive = false;
  private tiltRafId: number | null = null;
  private tiltTargetX = 0;
  private tiltTargetY = 0;
  private tiltTargetRot = 0;
  private tiltCurrentX = 0;
  private tiltCurrentY = 0;
  private tiltCurrentRot = 0;

  private readonly onResize = (): void => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      this.closeMenu();
    }
  };

  private readonly onMotionPreferenceChange = (): void => {
    if (!this.canUseHeroTilt()) {
      this.resetHeroTilt(true);
    }
  };

  ngOnInit(): void {
    this.themeService.init();
    this.i18n.init();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize, { passive: true });
      this.hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');
      this.reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.hoverMq.addEventListener('change', this.onMotionPreferenceChange);
      this.reduceMq.addEventListener('change', this.onMotionPreferenceChange);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
      this.hoverMq?.removeEventListener('change', this.onMotionPreferenceChange);
      this.reduceMq?.removeEventListener('change', this.onMotionPreferenceChange);
    }
    this.resetHeroTilt(true);
    this.unlockBodyScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  setLocale(locale: Locale): void {
    this.i18n.setLocale(locale);
  }

  cvUrl(): string {
    return this.i18n.locale() === 'en'
      ? 'assets/cv/CV_Katia_Gadea_EN.pdf'
      : 'assets/cv/CV_Katia_Gadea_ES.pdf';
  }

  cvFilename(): string {
    return this.i18n.locale() === 'en'
      ? 'CV_Katia_Gadea_EN.pdf'
      : 'CV_Katia_Gadea_ES.pdf';
  }

  toggleMenu(): void {
    if (this.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu(): void {
    this.menuOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.unlockBodyScroll();
  }

  goHome(): void {
    this.closeMenu();
    this.scrollToId('inicio');
  }

  navigateTo(fragment: string): void {
    this.closeMenu();
    requestAnimationFrame(() => this.scrollToId(fragment));
  }

  scrollToProjects(): void {
    this.navigateTo('proyectos');
  }

  scrollToId(fragment: string): void {
    const el = document.getElementById(fragment);
    if (!el) {
      return;
    }
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  onHeroTiltEnter(event: PointerEvent): void {
    if (!this.canUseHeroTilt() || !this.isFinePointer(event)) {
      return;
    }
    this.tiltActive = true;
    this.updateHeroTiltTarget(event);
    this.startHeroTiltLoop();
  }

  onHeroTiltMove(event: PointerEvent): void {
    if (!this.tiltActive || !this.canUseHeroTilt() || !this.isFinePointer(event)) {
      return;
    }
    this.updateHeroTiltTarget(event);
    this.startHeroTiltLoop();
  }

  onHeroTiltLeave(): void {
    if (!this.tiltActive && this.tiltRafId === null) {
      return;
    }
    this.tiltActive = false;
    this.tiltTargetX = 0;
    this.tiltTargetY = 0;
    this.tiltTargetRot = 0;
    this.startHeroTiltLoop();
  }

  private canUseHeroTilt(): boolean {
    return !!this.hoverMq?.matches && !this.reduceMq?.matches;
  }

  private isFinePointer(event: PointerEvent): boolean {
    return event.pointerType === 'mouse' || event.pointerType === 'pen';
  }

  private updateHeroTiltTarget(event: PointerEvent): void {
    const root = this.heroTiltRoot?.nativeElement;
    if (!root) {
      return;
    }
    const rect = root.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) {
      return;
    }
    const nx = Math.max(
      -1,
      Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)),
    );
    const ny = Math.max(
      -1,
      Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)),
    );
    this.tiltTargetX = nx * HomeComponent.TILT_MAX_PX;
    this.tiltTargetY = ny * HomeComponent.TILT_MAX_PX;
    this.tiltTargetRot = nx * HomeComponent.TILT_MAX_DEG;
  }

  private startHeroTiltLoop(): void {
    if (this.tiltRafId !== null || typeof window === 'undefined') {
      return;
    }
    const tick = (): void => {
      const ease = HomeComponent.TILT_EASE;
      this.tiltCurrentX += (this.tiltTargetX - this.tiltCurrentX) * ease;
      this.tiltCurrentY += (this.tiltTargetY - this.tiltCurrentY) * ease;
      this.tiltCurrentRot += (this.tiltTargetRot - this.tiltCurrentRot) * ease;
      this.applyHeroTiltTransform();

      const settled =
        !this.tiltActive &&
        Math.abs(this.tiltCurrentX) < HomeComponent.TILT_REST_EPS &&
        Math.abs(this.tiltCurrentY) < HomeComponent.TILT_REST_EPS &&
        Math.abs(this.tiltCurrentRot) < HomeComponent.TILT_REST_EPS &&
        Math.abs(this.tiltTargetX) < HomeComponent.TILT_REST_EPS &&
        Math.abs(this.tiltTargetY) < HomeComponent.TILT_REST_EPS &&
        Math.abs(this.tiltTargetRot) < HomeComponent.TILT_REST_EPS;

      if (settled) {
        this.tiltRafId = null;
        this.tiltCurrentX = 0;
        this.tiltCurrentY = 0;
        this.tiltCurrentRot = 0;
        this.applyHeroTiltTransform(true);
        return;
      }

      this.tiltRafId = window.requestAnimationFrame(tick);
    };
    this.tiltRafId = window.requestAnimationFrame(tick);
  }

  private applyHeroTiltTransform(clear = false): void {
    const inner = this.heroTiltInner?.nativeElement;
    if (!inner) {
      return;
    }
    if (clear) {
      inner.style.transform = '';
      return;
    }
    inner.style.transform =
      `translate3d(${this.tiltCurrentX.toFixed(2)}px, ${this.tiltCurrentY.toFixed(2)}px, 0) ` +
      `rotate(${this.tiltCurrentRot.toFixed(3)}deg)`;
  }

  private resetHeroTilt(immediate: boolean): void {
    this.tiltActive = false;
    this.tiltTargetX = 0;
    this.tiltTargetY = 0;
    this.tiltTargetRot = 0;
    if (immediate) {
      if (this.tiltRafId !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(this.tiltRafId);
        this.tiltRafId = null;
      }
      this.tiltCurrentX = 0;
      this.tiltCurrentY = 0;
      this.tiltCurrentRot = 0;
      this.applyHeroTiltTransform(true);
      return;
    }
    this.startHeroTiltLoop();
  }
}
