import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

export interface TechItem {
  id: string;
  name: string;
  /** Filename stem under assets/editorial/technologies (without extension). */
  slug: string;
}

export interface TechGroup {
  id: string;
  items: TechItem[];
}

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  readonly i18n = inject(I18nService);

  private readonly pngIcons = new Set(['authjs', 'emotion']);

  private readonly groupDefs: TechGroup[] = [
    {
      id: 'g1',
      items: [
        { id: 'typescript', name: 'TypeScript', slug: 'typescript' },
        { id: 'javascript', name: 'JavaScript', slug: 'javascript' },
        { id: 'react', name: 'React', slug: 'react' },
        { id: 'nextjs', name: 'Next.js', slug: 'nextdotjs' },
        { id: 'angular', name: 'Angular', slug: 'angular' },
        { id: 'html5', name: 'HTML5', slug: 'html5' },
        { id: 'css', name: 'CSS', slug: 'css' },
        { id: 'tailwind', name: 'Tailwind CSS', slug: 'tailwindcss' },
        { id: 'vite', name: 'Vite', slug: 'vite' },
        { id: 'mui', name: 'Material UI', slug: 'mui' },
        { id: 'emotion', name: 'Emotion', slug: 'emotion' },
        { id: 'react-router', name: 'React Router', slug: 'reactrouter' },
        { id: 'apollo', name: 'Apollo Client', slug: 'apollographql' },
        { id: 'google-maps-js', name: 'Google Maps JavaScript API', slug: 'googlemaps' },
      ],
    },
    {
      id: 'g2',
      items: [
        { id: 'react-native', name: 'React Native', slug: 'react-native' },
        { id: 'expo', name: 'Expo', slug: 'expo' },
        { id: 'expo-router', name: 'Expo Router', slug: 'expo' },
        { id: 'rn-paper', name: 'React Native Paper', slug: 'react-native-paper' },
        { id: 'rn-maps', name: 'React Native Maps', slug: 'react-native-maps' },
        { id: 'reanimated', name: 'Reanimated', slug: 'reanimated' },
        { id: 'gesture-handler', name: 'Gesture Handler', slug: 'gesture-handler' },
      ],
    },
    {
      id: 'g3',
      items: [
        { id: 'java', name: 'Java', slug: 'java' },
        { id: 'php', name: 'PHP', slug: 'php' },
        { id: 'bun', name: 'Bun', slug: 'bun' },
        { id: 'hono', name: 'Hono', slug: 'hono' },
        { id: 'nodejs', name: 'Node.js', slug: 'nodedotjs' },
        { id: 'express', name: 'Express', slug: 'express' },
        { id: 'spring-boot', name: 'Spring Boot', slug: 'springboot' },
        { id: 'graphql-yoga', name: 'GraphQL Yoga', slug: 'graphql-yoga' },
        { id: 'graphql', name: 'GraphQL', slug: 'graphql' },
        { id: 'rest-apis', name: 'APIs REST', slug: 'api-rest' },
        { id: 'webhooks', name: 'Webhooks', slug: 'webhooks' },
        { id: 'openrouter', name: 'OpenRouter', slug: 'openrouter' },
        { id: 'zod', name: 'Zod', slug: 'zod' },
      ],
    },
    {
      id: 'g4',
      items: [
        { id: 'prisma', name: 'Prisma', slug: 'prisma' },
        { id: 'sqlite', name: 'SQLite', slug: 'sqlite' },
        { id: 'postgresql', name: 'PostgreSQL', slug: 'postgresql' },
        { id: 'sequelize', name: 'Sequelize', slug: 'sequelize' },
        { id: 'hibernate', name: 'JPA/Hibernate', slug: 'hibernate' },
        { id: 'sql', name: 'SQL', slug: 'database' },
        { id: 'nosql', name: 'NoSQL', slug: 'nosql' },
        { id: 'jpql', name: 'JPQL', slug: 'jpql' },
        { id: 'json-storage', name: 'JSON Storage', slug: 'json-storage' },
      ],
    },
    {
      id: 'g6',
      items: [
        { id: 'firebase', name: 'Firebase', slug: 'firebase' },
        { id: 'firebase-admin', name: 'Firebase Admin', slug: 'firebase' },
        { id: 'firebase-auth', name: 'Firebase Auth', slug: 'firebase' },
        { id: 'fcm', name: 'Firebase Cloud Messaging', slug: 'firebase' },
        { id: 'authjs', name: 'Auth.js', slug: 'authjs' },
        { id: 'google-oauth', name: 'Google OAuth', slug: 'google' },
        { id: 'google-cloud', name: 'Google Cloud', slug: 'googlecloud' },
        { id: 'gcs', name: 'Google Cloud Storage', slug: 'googlecloud' },
      ],
    },
    {
      id: 'g5',
      items: [
        { id: 'docker', name: 'Docker', slug: 'docker' },
        { id: 'docker-compose', name: 'Docker Compose', slug: 'docker' },
        { id: 'git', name: 'Git', slug: 'git' },
        { id: 'github', name: 'GitHub', slug: 'github' },
        { id: 'nginx', name: 'Nginx', slug: 'nginx' },
        { id: 'netlify', name: 'Netlify', slug: 'netlify' },
        { id: 'eas', name: 'EAS', slug: 'expo' },
        { id: 'ngrok', name: 'Ngrok', slug: 'ngrok' },
        { id: 'vps', name: 'VPS', slug: 'vps' },
      ],
    },
    {
      id: 'g8',
      items: [
        { id: 'ga4', name: 'Google Analytics 4', slug: 'googleanalytics' },
        { id: 'sentry', name: 'Sentry', slug: 'sentry' },
        { id: 'eslint', name: 'ESLint', slug: 'eslint' },
        { id: 'intellij', name: 'IntelliJ IDEA', slug: 'intellijidea' },
        { id: 'cursor', name: 'Cursor', slug: 'cursor' },
        { id: 'copilot', name: 'GitHub Copilot', slug: 'githubcopilot' },
        { id: 'antigravity', name: 'Google Antigravity', slug: 'antigravity' },
        { id: 'codex', name: 'OpenAI Codex', slug: 'openai' },
      ],
    },
  ];

  readonly groups = computed(() => {
    this.i18n.locale();
    return this.groupDefs.map((group) => ({
      ...group,
      title: this.i18n.t(`skills.${group.id}.title`),
      items: group.items.map((item) =>
        item.id === 'rest-apis'
          ? { ...item, name: this.i18n.t('skills.item.restApis') }
          : item,
      ),
    }));
  });

  iconUrl(slug: string): string {
    const ext = this.pngIcons.has(slug) ? 'png' : 'svg';
    return `url('/assets/editorial/technologies/${slug}.${ext}')`;
  }
}
