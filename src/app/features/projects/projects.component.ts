import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Project, ProjectHowItWorks } from '../../shared/models/project.model';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';
import { EditorialIconComponent } from '../../shared/components/editorial-icon/editorial-icon.component';

interface ProjectTech {
  name: string;
  slug?: string;
}

interface ProjectDef {
  id: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  technologies: ProjectTech[];
  githubLink?: string;
  demoLink?: string;
  howLayout: 'flow' | 'points';
  stepCount: number;
  hasFootnote?: boolean;
}

export type LocalizedProject = Project & {
  id: string;
  subtitle: string;
  descriptionParagraphs: string[];
  mobileDescription: string;
  techItems: ProjectTech[];
  shortName: string;
  imageWidth?: number;
  imageHeight?: number;
};

const MOBILE_QUERY = '(max-width: 899px)';
const SWIPE_DEMO_STORAGE_KEY = 'portfolio.projects.mobileSwipeDemo.v1';
const SWIPE_DEMO_DELAY_MS = 400;
const SWIPE_DEMO_MOTION_MS = 900;

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, EditorialIconComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  readonly i18n = inject(I18nService);
  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  private readonly demoSentinel = viewChild<ElementRef<HTMLElement>>('demoSentinel');

  private lastHowToTrigger: HTMLElement | null = null;
  private mobileMq: MediaQueryList | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
  private programmaticScroll = false;
  private suppressClickUntil = 0;
  private onMqChange = () => {
    this.useMobileTrack.set(this.mobileMq?.matches ?? false);
    this.syncViewportToIndex(false);
    if (!this.useMobileTrack()) {
      this.cancelSwipeDemo(false);
    }
  };
  private onScrollEnd = () => this.finishProgrammaticScroll();

  private demoIo: IntersectionObserver | null = null;
  private demoDelayTimer: ReturnType<typeof setTimeout> | null = null;
  private demoMotionTimer: ReturnType<typeof setTimeout> | null = null;
  private demoRaf = 0;
  private sentinelVisible = false;
  private userTookControl = false;
  private demoFinished = false;
  private demoRunning = false;
  private readonly onDemoPointerDown = () => this.handleDemoInterrupt();

  activeHowTo: LocalizedProject | null = null;
  readonly activeIndex = signal(0);
  readonly useMobileTrack = signal(false);
  readonly demoCueVisible = signal(false);
  readonly demoNudging = signal(false);

  private readonly projectDefs: ProjectDef[] = [
    {
      id: 'anthos',
      imageUrl: 'assets/plantas.png',
      imageWidth: 634,
      imageHeight: 1022,
      technologies: [
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Next.js', slug: 'nextdotjs' },
        { name: 'React', slug: 'react' },
        { name: 'Prisma', slug: 'prisma' },
      ],
      githubLink: 'https://github.com/katia-otot/plantas',
      demoLink: 'http://149.50.156.136/plantas',
      howLayout: 'flow',
      stepCount: 5,
      hasFootnote: true,
    },
    {
      id: 'recetas',
      imageUrl: 'assets/recetas.png',
      imageWidth: 1024,
      imageHeight: 839,
      technologies: [
        { name: 'Next.js', slug: 'nextdotjs' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Prisma', slug: 'prisma' },
        { name: 'OpenRouter', slug: 'openrouter' },
        { name: 'Docker', slug: 'docker' },
      ],
      githubLink: 'https://github.com/katia-otot/recetas',
      demoLink: 'http://149.50.156.136:443/',
      howLayout: 'flow',
      stepCount: 5,
      hasFootnote: true,
    },
    {
      id: 'mapa',
      imageUrl: 'assets/mapa.png',
      imageWidth: 1024,
      imageHeight: 757,
      technologies: [
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'CSS', slug: 'css' },
        { name: 'HTML5', slug: 'html5' },
      ],
      githubLink: 'https://github.com/katia-otot/mapa',
      demoLink: 'https://mapamemoria.netlify.app/',
      howLayout: 'flow',
      stepCount: 4,
      hasFootnote: true,
    },
  ];

  readonly projects = computed<LocalizedProject[]>(() => {
    this.i18n.locale();
    return this.projectDefs.map((def) => this.buildProject(def));
  });

  readonly activeProject = computed(() => {
    const list = this.projects();
    if (!list.length) {
      return null;
    }
    const index = Math.min(Math.max(this.activeIndex(), 0), list.length - 1);
    return list[index] ?? null;
  });

  readonly projectCount = computed(() => this.projects().length);

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    this.mobileMq = window.matchMedia(MOBILE_QUERY);
    this.useMobileTrack.set(this.mobileMq.matches);
    this.mobileMq.addEventListener('change', this.onMqChange);

    const el = this.viewport()?.nativeElement;
    if (el) {
      el.addEventListener('scrollend', this.onScrollEnd);
      this.resizeObserver = new ResizeObserver(() => this.syncViewportToIndex(false));
      this.resizeObserver.observe(el);
    }

    this.syncViewportToIndex(false);
    this.setupSwipeDemo();
  }

  ngOnDestroy(): void {
    this.unlockScroll();
    this.teardownSwipeDemo();
    this.mobileMq?.removeEventListener('change', this.onMqChange);
    this.resizeObserver?.disconnect();
    this.viewport()?.nativeElement.removeEventListener('scrollend', this.onScrollEnd);
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeHowTo) {
      this.closeHowTo();
    }
  }

  onTabSelect(index: number): void {
    this.noteUserCarouselAction();
    this.goTo(index);
  }

  goTo(index: number): void {
    const count = this.projectCount();
    if (count === 0) {
      return;
    }
    const next = ((index % count) + count) % count;
    this.activeIndex.set(next);
    this.syncViewportToIndex(true);
  }

  prev(): void {
    this.noteUserCarouselAction();
    this.goTo(this.activeIndex() - 1);
  }

  next(): void {
    this.noteUserCarouselAction();
    this.goTo(this.activeIndex() + 1);
  }

  onCarouselKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  onViewportScroll(): void {
    if (!this.isMobileTrack()) {
      return;
    }

    this.suppressClickUntil = Date.now() + 400;

    if (this.programmaticScroll) {
      this.scheduleScrollEndFallback();
      return;
    }

    this.noteUserCarouselAction();

    const index = this.indexFromScroll();
    if (index !== null && index !== this.activeIndex()) {
      this.activeIndex.set(index);
    }
  }

  onViewportClickCapture(event: Event): void {
    if (!this.isMobileTrack()) {
      return;
    }
    if (Date.now() >= this.suppressClickUntil) {
      return;
    }
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (!target.closest('a, button')) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  indexLabel(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  openHowTo(project: LocalizedProject, event?: Event): void {
    if (!project.howItWorks) {
      return;
    }
    this.lastHowToTrigger =
      event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    this.activeHowTo = project;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('howto-open');
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.howto-close')?.focus();
    });
  }

  closeHowTo(): void {
    this.activeHowTo = null;
    this.unlockScroll();
    this.lastHowToTrigger?.focus();
    this.lastHowToTrigger = null;
  }

  localizedActiveHowTo(): LocalizedProject | null {
    const current = this.activeHowTo;
    if (!current) {
      return null;
    }
    return this.projects().find((p) => p.id === current.id) ?? current;
  }

  techIconUrl(slug: string): string {
    return `url('/assets/editorial/technologies/${slug}.svg')`;
  }

  private isMobileTrack(): boolean {
    return this.useMobileTrack();
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private syncViewportToIndex(smooth: boolean): void {
    if (!this.isMobileTrack()) {
      return;
    }
    const el = this.viewport()?.nativeElement;
    if (!el) {
      return;
    }
    const width = el.clientWidth;
    if (width <= 0) {
      return;
    }
    const left = this.activeIndex() * width;
    if (Math.abs(el.scrollLeft - left) < 1) {
      return;
    }
    this.programmaticScroll = true;
    this.suppressClickUntil = Date.now() + 400;
    el.scrollTo({
      left,
      behavior: smooth && !this.prefersReducedMotion() ? 'smooth' : 'auto',
    });
    this.scheduleScrollEndFallback();
  }

  private indexFromScroll(): number | null {
    const el = this.viewport()?.nativeElement;
    if (!el) {
      return null;
    }
    const width = el.clientWidth;
    if (width <= 0) {
      return null;
    }
    const count = this.projectCount();
    const index = Math.round(el.scrollLeft / width);
    return Math.min(Math.max(index, 0), Math.max(count - 1, 0));
  }

  private finishProgrammaticScroll(): void {
    this.programmaticScroll = false;
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = null;
    }
    const index = this.indexFromScroll();
    if (index !== null && index !== this.activeIndex()) {
      this.activeIndex.set(index);
    }
  }

  private scheduleScrollEndFallback(): void {
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
    this.scrollEndTimer = setTimeout(() => this.finishProgrammaticScroll(), 320);
  }

  private setupSwipeDemo(): void {
    if (this.hasSeenSwipeDemo()) {
      this.demoFinished = true;
      return;
    }

    const sentinel = this.demoSentinel()?.nativeElement;
    const stage = this.stage()?.nativeElement;
    if (!sentinel || !stage) {
      return;
    }

    const headerRaw = getComputedStyle(document.documentElement)
      .getPropertyValue('--site-header-height')
      .trim();
    const headerPx = Number.parseFloat(headerRaw) || 72;
    const topInset = headerPx + 12;

    this.demoIo = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.sentinelVisible = !!entry?.isIntersecting;
        if (this.sentinelVisible) {
          this.maybeStartSwipeDemo();
        } else if (this.demoRunning || this.demoDelayTimer) {
          this.cancelSwipeDemo(this.demoRunning);
        }
      },
      {
        root: null,
        rootMargin: `-${topInset}px 0px 0px 0px`,
        threshold: 1,
      },
    );
    this.demoIo.observe(sentinel);

    stage.addEventListener('pointerdown', this.onDemoPointerDown, { passive: true });
  }

  private teardownSwipeDemo(): void {
    this.cancelSwipeDemo(false);
    this.demoIo?.disconnect();
    this.demoIo = null;
    this.stage()?.nativeElement.removeEventListener('pointerdown', this.onDemoPointerDown);
  }

  private maybeStartSwipeDemo(): void {
    if (!this.isMobileTrack() || this.demoFinished || this.userTookControl) {
      return;
    }
    if (this.demoRunning || this.demoDelayTimer || this.demoCueVisible()) {
      return;
    }
    if (!this.sentinelVisible) {
      return;
    }

    this.demoDelayTimer = setTimeout(() => {
      this.demoDelayTimer = null;
      if (
        !this.sentinelVisible
        || this.userTookControl
        || this.demoFinished
        || !this.isMobileTrack()
      ) {
        return;
      }
      this.runSwipeDemo();
    }, SWIPE_DEMO_DELAY_MS);
  }

  private runSwipeDemo(): void {
    this.demoRunning = true;
    this.demoCueVisible.set(true);

    if (this.prefersReducedMotion()) {
      this.demoMotionTimer = setTimeout(() => {
        this.demoMotionTimer = null;
        this.demoCueVisible.set(false);
        this.demoRunning = false;
        this.persistSwipeDemoSeen();
      }, SWIPE_DEMO_MOTION_MS);
      return;
    }

    this.demoRaf = requestAnimationFrame(() => {
      this.demoNudging.set(true);
    });

    this.demoMotionTimer = setTimeout(() => {
      this.demoMotionTimer = null;
      this.demoNudging.set(false);
      this.demoCueVisible.set(false);
      this.demoRunning = false;
      this.persistSwipeDemoSeen();
    }, SWIPE_DEMO_MOTION_MS);
  }

  private handleDemoInterrupt(): void {
    if (!this.isMobileTrack()) {
      return;
    }
    if (this.demoRunning || this.demoDelayTimer || this.demoCueVisible()) {
      this.cancelSwipeDemo(true);
    }
    this.noteUserCarouselAction();
  }

  private noteUserCarouselAction(): void {
    if (!this.isMobileTrack()) {
      return;
    }
    this.userTookControl = true;
    this.persistSwipeDemoSeen();
    this.cancelSwipeDemo(false);
  }

  private cancelSwipeDemo(persist: boolean): void {
    if (this.demoDelayTimer) {
      clearTimeout(this.demoDelayTimer);
      this.demoDelayTimer = null;
    }
    if (this.demoMotionTimer) {
      clearTimeout(this.demoMotionTimer);
      this.demoMotionTimer = null;
    }
    if (this.demoRaf) {
      cancelAnimationFrame(this.demoRaf);
      this.demoRaf = 0;
    }
    this.demoNudging.set(false);
    this.demoCueVisible.set(false);
    this.demoRunning = false;
    if (persist) {
      this.persistSwipeDemoSeen();
    }
  }

  private hasSeenSwipeDemo(): boolean {
    try {
      return sessionStorage.getItem(SWIPE_DEMO_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  }

  private persistSwipeDemoSeen(): void {
    if (this.demoFinished) {
      return;
    }
    this.demoFinished = true;
    try {
      sessionStorage.setItem(SWIPE_DEMO_STORAGE_KEY, '1');
    } catch {
      /* private mode / quota — still treat as finished for this mount */
    }
  }

  private buildProject(def: ProjectDef): LocalizedProject {
    const prefix = `projects.${def.id}`;
    const description = this.i18n.t(`${prefix}.desc`);
    const howSummary = this.i18n.t(`${prefix}.how.summary`);
    const how: ProjectHowItWorks = {
      summary: howSummary,
      summaryParagraphs: howSummary
        .split(/\n\n+/)
        .map((part) => part.trim())
        .filter(Boolean),
      footnote: def.hasFootnote ? this.i18n.t(`${prefix}.how.footnote`) : undefined,
      layout: def.howLayout,
      steps: Array.from({ length: def.stepCount }, (_, index) => {
        const n = index + 1;
        return {
          label: this.i18n.t(`${prefix}.s${n}`),
          detail: this.i18n.t(`${prefix}.s${n}d`),
          tone: index % 2 === 0 ? 'accent' : 'light',
        };
      }),
    };

    return {
      id: def.id,
      title: this.i18n.t(`${prefix}.title`),
      shortName: this.i18n.t(`${prefix}.short`),
      subtitle: this.i18n.t(`${prefix}.subtitle`),
      description,
      descriptionParagraphs: description
        .split(/\n\n+/)
        .map((part) => part.trim())
        .filter(Boolean),
      mobileDescription: this.i18n.t(`${prefix}.descMobile`),
      imageUrl: def.imageUrl ?? '',
      imageWidth: def.imageWidth,
      imageHeight: def.imageHeight,
      technologies: def.technologies.map((t) => t.name),
      techItems: def.technologies,
      githubLink: def.githubLink,
      demoLink: def.demoLink,
      howItWorks: how,
    };
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.classList.remove('howto-open');
  }
}
