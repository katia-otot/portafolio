import { Component, HostListener, OnDestroy, computed, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project, ProjectHowItWorks } from '../../shared/models/project.model';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

type PreviewMode = 'iframe' | 'shot' | 'static';

interface ProjectDef {
  id: string;
  imageUrl: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  howLayout: 'flow' | 'points';
  stepCount: number;
  hasFootnote?: boolean;
  /** Prefer local screenshot over iframe/mShots (e.g. HTTP demos with stale captures). */
  preferStatic?: boolean;
}

export type LocalizedProject = Project & { id: string };

@Component({
  selector: 'app-projects',
  imports: [WaveDividerComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  readonly i18n = inject(I18nService);
  private readonly iframeTimeoutMs = 8000;
  private readonly iframeTimers = new Map<string, ReturnType<typeof setTimeout>>();

  activeHowTo: LocalizedProject | null = null;

  private readonly projectDefs: ProjectDef[] = [
    {
      id: 'plantas',
      imageUrl: 'assets/plantas.png',
      technologies: ['TypeScript', 'Next.js', 'React', 'Prisma'],
      githubLink: 'https://github.com/katia-otot/plantas',
      demoLink: 'http://149.50.156.136/plantas',
      howLayout: 'flow',
      stepCount: 5,
      hasFootnote: true,
      preferStatic: true,
    },
    {
      id: 'recetas',
      imageUrl: 'assets/recetas.png',
      technologies: ['TypeScript', 'Next.js', 'React', 'CSS'],
      githubLink: 'https://github.com/katia-otot/recetas',
      demoLink: 'http://149.50.156.136:443/',
      howLayout: 'flow',
      stepCount: 5,
      hasFootnote: true,
    },
    {
      id: 'mapa',
      imageUrl: 'assets/mapa.png',
      technologies: ['JavaScript', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/mapa',
      demoLink: 'https://mapamemoria.netlify.app/',
      howLayout: 'flow',
      stepCount: 4,
      hasFootnote: true,
    },
    {
      id: 'portfolio',
      imageUrl: 'assets/portafolio.png',
      technologies: ['Typescript', 'Angular', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/portafolio',
      demoLink: 'https://portafoliokatiagadea.netlify.app/',
      howLayout: 'points',
      stepCount: 4,
    },
  ];

  readonly projects = computed<LocalizedProject[]>(() => {
    this.i18n.locale();
    return this.projectDefs.map((def) => this.buildProject(def));
  });

  previewMode: Record<string, PreviewMode> = {};
  safeDemoUrls: Record<string, SafeResourceUrl> = {};

  constructor() {
    for (const def of this.projectDefs) {
      if (def.preferStatic) {
        this.previewMode[def.id] = 'static';
      } else {
        this.initPreview(def.id, def.demoLink);
      }
    }
  }

  ngOnDestroy(): void {
    for (const timer of this.iframeTimers.values()) {
      clearTimeout(timer);
    }
    this.iframeTimers.clear();
    this.unlockScroll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeHowTo) {
      this.closeHowTo();
    }
  }

  openHowTo(project: LocalizedProject): void {
    if (!project.howItWorks) {
      return;
    }
    this.activeHowTo = project;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('howto-open');
  }

  closeHowTo(): void {
    this.activeHowTo = null;
    this.unlockScroll();
  }

  /** Keep modal text in sync when the user switches language. */
  localizedActiveHowTo(): LocalizedProject | null {
    const current = this.activeHowTo;
    if (!current) {
      return null;
    }
    return this.projects().find((p) => p.id === current.id) ?? current;
  }

  shotUrl(demoLink: string): string {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(demoLink)}?w=1200`;
  }

  onIframeLoad(id: string): void {
    this.clearIframeTimer(id);
  }

  onShotError(id: string): void {
    this.previewMode[id] = 'static';
  }

  private buildProject(def: ProjectDef): LocalizedProject {
    const prefix = `projects.${def.id}`;
    const how: ProjectHowItWorks = {
      summary: this.i18n.t(`${prefix}.how.summary`),
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
      description: this.i18n.t(`${prefix}.desc`),
      imageUrl: def.imageUrl,
      technologies: def.technologies,
      githubLink: def.githubLink,
      demoLink: def.demoLink,
      howItWorks: how,
    };
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.classList.remove('howto-open');
  }

  private initPreview(id: string, demo?: string): void {
    if (!demo) {
      this.previewMode[id] = 'static';
      return;
    }

    if (!demo.startsWith('https://')) {
      this.previewMode[id] = 'shot';
      return;
    }

    if (this.isSelfPortfolio(demo)) {
      this.previewMode[id] = 'static';
      return;
    }

    this.safeDemoUrls[id] = this.sanitizer.bypassSecurityTrustResourceUrl(demo);
    this.previewMode[id] = 'iframe';

    const timer = setTimeout(() => {
      if (this.previewMode[id] === 'iframe') {
        this.previewMode[id] = 'shot';
      }
      this.iframeTimers.delete(id);
    }, this.iframeTimeoutMs);

    this.iframeTimers.set(id, timer);
  }

  private isSelfPortfolio(demo: string): boolean {
    try {
      const host = new URL(demo).hostname.replace(/^www\./, '');
      return host.includes('portafoliokatiagadea') || host.includes('localhost');
    } catch {
      return false;
    }
  }

  private clearIframeTimer(id: string): void {
    const timer = this.iframeTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.iframeTimers.delete(id);
    }
  }
}
