import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../skills/skills.component';
import { ThemeService } from '../../shared/services/theme.service';

interface AmbientBlob {
  el: HTMLElement;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  driftAmpX: number;
  driftAmpY: number;
  driftSpeed: number;
}

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ambientBg', { static: true }) ambientBg!: ElementRef<HTMLElement>;

  menuOpen = false;

  private sections: HTMLElement[] = [];
  private isMobile = false;
  private blobs: AmbientBlob[] = [];
  private rafId = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private reducedMotion = false;
  private started = 0;

  private readonly onPointerMove = (event: PointerEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private readonly onPointerLeave = (): void => {
    this.mouseX = -9999;
    this.mouseY = -9999;
  };

  private readonly onResize = (): void => {
    this.syncBlobHomes();
    if (typeof window !== 'undefined' && window.innerWidth >= 900) {
      this.closeMenu();
    }
  };

  readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.init();
  }

  ngAfterViewInit(): void {
    this.sections = Array.from(document.querySelectorAll('.section'));
    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      return;
    }

    this.initBlobs();
    this.started = performance.now();
    window.addEventListener('pointermove', this.onPointerMove, { passive: true });
    document.addEventListener('pointermove', this.onPointerMove, { passive: true });
    window.addEventListener('pointerleave', this.onPointerLeave);
    document.documentElement.addEventListener('mouseleave', this.onPointerLeave);
    window.addEventListener('resize', this.onResize, { passive: true });
    requestAnimationFrame(() => {
      this.syncBlobHomes();
      this.rafId = requestAnimationFrame(this.tick);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerleave', this.onPointerLeave);
    document.documentElement.removeEventListener('mouseleave', this.onPointerLeave);
    window.removeEventListener('resize', this.onResize);
    this.unlockScroll();
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
    this.unlockScroll();
  }

  goHome(): void {
    this.closeMenu();
    this.scrollToId('home');
  }

  navigateTo(fragment: string): void {
    this.closeMenu();
    requestAnimationFrame(() => this.scrollToId(fragment));
  }

  scrollToContact(): void {
    this.navigateTo('contact');
  }

  scrollToId(fragment: string): void {
    this.isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({
        behavior: this.isMobile ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
  }

  private initBlobs(): void {
    const root = this.ambientBg?.nativeElement;
    if (!root) {
      return;
    }

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.glow'));
    this.blobs = nodes.map((el, index) => {
      const rect = el.getBoundingClientRect();
      const homeX = rect.left + rect.width / 2;
      const homeY = rect.top + rect.height / 2;
      return {
        el,
        homeX,
        homeY,
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        radius: Math.max(rect.width, rect.height) * 0.7,
        phase: index * 1.7,
        driftAmpX: 28 + index * 10,
        driftAmpY: 22 + index * 8,
        driftSpeed: 0.0004 + index * 0.0001,
      };
    });
  }

  private syncBlobHomes(): void {
    for (const blob of this.blobs) {
      blob.el.style.transform = 'translate3d(0,0,0)';
    }
    void this.ambientBg.nativeElement.offsetWidth;
    for (const blob of this.blobs) {
      const rect = blob.el.getBoundingClientRect();
      blob.homeX = rect.left + rect.width / 2;
      blob.homeY = rect.top + rect.height / 2;
      blob.radius = Math.max(rect.width, rect.height) * 0.7;
      blob.x = blob.homeX;
      blob.y = blob.homeY;
      blob.vx = 0;
      blob.vy = 0;
    }
  }

  private readonly tick = (now: number): void => {
    const t = now - this.started;
    const influencePad = 140;
    const fleeStrength = 22;
    const spring = 0.028;
    const friction = 0.78;
    const maxSpeed = 42;

    for (const blob of this.blobs) {
      const idleX = Math.sin(t * blob.driftSpeed + blob.phase) * blob.driftAmpX;
      const idleY = Math.cos(t * blob.driftSpeed * 0.85 + blob.phase) * blob.driftAmpY;
      const targetX = blob.homeX + idleX;
      const targetY = blob.homeY + idleY;

      const dx = blob.x - this.mouseX;
      const dy = blob.y - this.mouseY;
      const dist = Math.hypot(dx, dy) || 1;
      const influence = blob.radius + influencePad;

      if (dist < influence) {
        const proximity = 1 - dist / influence;
        const force = proximity * proximity * fleeStrength;
        blob.vx += (dx / dist) * force;
        blob.vy += (dy / dist) * force;
      }

      blob.vx += (targetX - blob.x) * spring;
      blob.vy += (targetY - blob.y) * spring;
      blob.vx *= friction;
      blob.vy *= friction;

      const speed = Math.hypot(blob.vx, blob.vy);
      if (speed > maxSpeed) {
        blob.vx = (blob.vx / speed) * maxSpeed;
        blob.vy = (blob.vy / speed) * maxSpeed;
      }

      blob.x += blob.vx;
      blob.y += blob.vy;

      const ox = blob.x - blob.homeX;
      const oy = blob.y - blob.homeY;
      const squash = Math.min(1.18, 1 + Math.hypot(blob.vx, blob.vy) * 0.008);
      blob.el.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0) scale(${squash.toFixed(3)})`;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };
}
