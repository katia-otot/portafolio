import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Project } from '../../shared/models/project.model';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';

type PreviewMode = 'iframe' | 'shot' | 'static';

@Component({
  selector: 'app-projects',
  imports: [WaveDividerComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly iframeTimeoutMs = 8000;
  private readonly iframeTimers = new Map<string, ReturnType<typeof setTimeout>>();

  activeHowTo: Project | null = null;

  projects: Project[] = [
    {
      title: 'Recetas',
      description:
        'Biblioteca de recetas: importás un link, un modelo de IA extrae ingredientes y pasos, los estructura en formato clásico y en tabla CFE, y después podés buscar por ingredientes o estilos de comida.',
      imageUrl: 'assets/recetas.png',
      technologies: ['TypeScript', 'Next.js', 'React', 'CSS'],
      githubLink: 'https://github.com/katia-otot/recetas',
      demoLink: 'http://149.50.156.136:443/',
      howItWorks: {
        summary:
          'Biblioteca de recetas: se importa un link, se buscan ingredientes y pasos, y un modelo de IA los transforma a dos estructuras — formato clásico (lista de ingredientes y pasos enumerados) y tabla CFE. Después se pueden hacer búsquedas por ingredientes o estilos de comida.',
        footnote:
          'La transformación a formato clásico y a tabla CFE la hace un modelo de IA a partir del contenido del link.',
        layout: 'flow',
        steps: [
          { label: 'Importar link', detail: 'URL de una receta', tone: 'light' },
          { label: 'Modelo de IA', detail: 'Extrae ingredientes y pasos', tone: 'accent' },
          { label: 'Formato clásico', detail: 'Lista + pasos numerados', tone: 'light' },
          { label: 'Tabla CFE', detail: 'Estructura alternativa', tone: 'accent' },
          { label: 'Búsqueda', detail: 'Ingredientes o estilos', tone: 'light' },
        ],
      },
    },
    {
      title: 'Mapa local por la memoria',
      description:
        'Mapa interactivo de sitios de memoria local: elegís un punto de partida, explorás capas (murales, escuelas, abuelas, CCD, lugares de secuestro) y abrís la información de cada lugar en el recorrido.',
      imageUrl: 'assets/mapa.png',
      technologies: ['JavaScript', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/mapa',
      demoLink: 'https://mapamemoria.netlify.app/',
      howItWorks: {
        summary:
          'Aplicación interactiva para recorrer sitios de memoria en Quequén y Necochea. Elegís de dónde partís, abrís capas temáticas sobre el mapa y consultás la información de cada lugar (qué es, por qué importa en la memoria local).',
        footnote:
          'Proyecto colaborativo PSE UNICEN Quequén: el mapa se navega, no es una imagen fija; cada punto suma contexto del sitio de memoria.',
        layout: 'flow',
        steps: [
          { label: 'Elegir origen', detail: 'Quequén · Terminal · Necochea', tone: 'light' },
          { label: 'Capas de memoria', detail: 'Murales, escuelas, abuelas, CCD…', tone: 'accent' },
          { label: 'Mapa interactivo', detail: 'Zoom, recorrido y puntos', tone: 'light' },
          { label: 'Ficha del lugar', detail: 'Info de cada sitio de memoria', tone: 'accent' },
        ],
      },
    },
    {
      title: 'Portafolio',
      description: 'Mi portafolio personal en Angular: presentación, experiencia, skills, proyectos con demos y contacto.',
      imageUrl: 'assets/portafolio.png',
      technologies: ['Typescript', 'Angular', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/portafolio',
      demoLink: 'https://portafoliokatiagadea.netlify.app/',
      howItWorks: {
        summary:
          'Sitio one-page en Angular pensado para presentar mi perfil. No hay backend: el contenido vive en el front, el tema claro/oscuro se guarda en el navegador y las demos se muestran con preview en vivo o captura.',
        layout: 'points',
        steps: [
          {
            label: 'Secciones',
            detail: 'Home, sobre mí, experiencia, skills, proyectos y contacto en una sola página con anclas.',
            tone: 'accent',
          },
          {
            label: 'Tema',
            detail: 'Claro / oscuro con ThemeService; cursors y gatos se adaptan al modo.',
            tone: 'light',
          },
          {
            label: 'Proyectos',
            detail: 'Preview por iframe o captura gratis (mShots), más este panel de “cómo funciona”.',
            tone: 'accent',
          },
          {
            label: 'Contacto',
            detail: 'Formulario que abre el cliente de correo (mailto), sin servidor de mail.',
            tone: 'light',
          },
        ],
      },
    },
  ];

  previewMode: Record<string, PreviewMode> = {};
  safeDemoUrls: Record<string, SafeResourceUrl> = {};

  constructor() {
    for (const project of this.projects) {
      this.initPreview(project);
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

  openHowTo(project: Project): void {
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

  shotUrl(demoLink: string): string {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(demoLink)}?w=1200`;
  }

  onIframeLoad(title: string): void {
    this.clearIframeTimer(title);
  }

  onShotError(title: string): void {
    this.previewMode[title] = 'static';
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.classList.remove('howto-open');
  }

  private initPreview(project: Project): void {
    const demo = project.demoLink;
    if (!demo) {
      this.previewMode[project.title] = 'static';
      return;
    }

    // HTTP demos: free screenshot (no mixed-content iframe).
    if (!demo.startsWith('https://')) {
      this.previewMode[project.title] = 'shot';
      return;
    }

    // Self-portfolio: local asset (iframe would recurse; mShots keeps a stale cache).
    if (this.isSelfPortfolio(demo)) {
      this.previewMode[project.title] = 'static';
      return;
    }

    this.safeDemoUrls[project.title] = this.sanitizer.bypassSecurityTrustResourceUrl(demo);
    this.previewMode[project.title] = 'iframe';

    const timer = setTimeout(() => {
      if (this.previewMode[project.title] === 'iframe') {
        this.previewMode[project.title] = 'shot';
      }
      this.iframeTimers.delete(project.title);
    }, this.iframeTimeoutMs);

    this.iframeTimers.set(project.title, timer);
  }

  private isSelfPortfolio(demo: string): boolean {
    try {
      const host = new URL(demo).hostname.replace(/^www\./, '');
      return host.includes('portafoliokatiagadea') || host.includes('localhost');
    } catch {
      return false;
    }
  }

  private clearIframeTimer(title: string): void {
    const timer = this.iframeTimers.get(title);
    if (timer) {
      clearTimeout(timer);
      this.iframeTimers.delete(title);
    }
  }
}
