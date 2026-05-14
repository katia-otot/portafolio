import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  readonly experiences: ExperienceItem[] = [
    {
      role: 'Desarrolladora de Software Full-Stack',
      company: 'Unit0 Studio',
      period: 'Octubre 2025 — Mayo 2026',
      summary:
        'Desarrollo de aplicaciones web, mobile y soluciones a medida.',
      bullets: [
        {
          text: 'SPA con React 19, Vite, Material UI, Emotion, Apollo Client, React Router, Firebase y Google OAuth.',
        },
        {
          text: 'Apps móviles con React Native, Expo, Expo Router, React Native Paper, Apollo Client, mapas, Reanimated y Gesture Handler.',
        },
        {
          text: 'APIs y servidores con Bun, Hono, GraphQL Yoga, Node.js, Express.js, Sequelize y PostgreSQL.',
        },
        {
          text: 'Autenticación, Google Sign-In, Firebase Admin, Google Cloud Storage, WebSockets (graphql-ws) e integración WhatsApp Cloud API vía webhooks.',
        },
        {
          text: 'Docker / Docker Compose, ESLint, Sentry, EAS, Ngrok en flujos de desarrollo y despliegue.',
        },
        {
          text: 'Interfaz de chat liviana con HTML5, CSS3 y JavaScript (ES modules, polling y persistencia JSON con FileSystem API).',
        },
      ],
    },
  ];
}
