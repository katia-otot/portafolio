import { Component } from '@angular/core';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';

export interface SkillItem {
  name: string;
  /** Devicon class (e.g. devicon-typescript-plain) or Iconify simple-icons slug */
  icon: string;
  pack: 'devicon' | 'simple';
}

export interface SkillGroup {
  title: string;
  icon: string;
  blurb: string;
  items: SkillItem[];
}

export interface LanguageItem {
  name: string;
  level: string;
}

@Component({
  selector: 'app-skills',
  imports: [WaveDividerComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  readonly groups: SkillGroup[] = [
    {
      title: 'Lenguajes',
      icon: 'fa-code',
      blurb: 'Bases con las que escribo producto y APIs.',
      items: [
        { name: 'TypeScript', icon: 'devicon-typescript-plain', pack: 'devicon' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain', pack: 'devicon' },
        { name: 'Java', icon: 'devicon-java-plain', pack: 'devicon' },
        { name: 'PHP', icon: 'devicon-php-plain', pack: 'devicon' },
      ],
    },
    {
      title: 'Frontend web',
      icon: 'fa-window-maximize',
      blurb: 'Interfaces web modernas y mantenibles.',
      items: [
        { name: 'React 19', icon: 'devicon-react-original', pack: 'devicon' },
        { name: 'Vite', icon: 'devicon-vitejs-plain', pack: 'devicon' },
        { name: 'Material UI', icon: 'devicon-materialui-plain', pack: 'devicon' },
        { name: 'Emotion', icon: 'logos:emotion', pack: 'simple' },
        { name: 'React Router', icon: 'simple-icons:reactrouter', pack: 'simple' },
        { name: 'Apollo Client', icon: 'simple-icons:apollographql', pack: 'simple' },
        { name: 'HTML5', icon: 'devicon-html5-plain', pack: 'devicon' },
        { name: 'CSS3', icon: 'devicon-css3-plain', pack: 'devicon' },
      ],
    },
    {
      title: 'Mobile',
      icon: 'fa-mobile-alt',
      blurb: 'Apps nativas con React Native y Expo.',
      items: [
        { name: 'React Native', icon: 'devicon-react-original', pack: 'devicon' },
        { name: 'Expo', icon: 'simple-icons:expo', pack: 'simple' },
        { name: 'Expo Router', icon: 'simple-icons:expo', pack: 'simple' },
        { name: 'React Native Paper', icon: 'devicon-react-original', pack: 'devicon' },
        { name: 'React Native Maps', icon: 'simple-icons:googlemaps', pack: 'simple' },
        { name: 'Reanimated', icon: 'simple-icons:react', pack: 'simple' },
        { name: 'Gesture Handler', icon: 'simple-icons:react', pack: 'simple' },
      ],
    },
    {
      title: 'Backend',
      icon: 'fa-server',
      blurb: 'APIs, runtimes y servicios de integración.',
      items: [
        { name: 'Bun', icon: 'simple-icons:bun', pack: 'simple' },
        { name: 'Hono', icon: 'simple-icons:hono', pack: 'simple' },
        { name: 'Node.js', icon: 'devicon-nodejs-plain', pack: 'devicon' },
        { name: 'Express.js', icon: 'devicon-express-original', pack: 'devicon' },
        { name: 'GraphQL Yoga', icon: 'simple-icons:graphql', pack: 'simple' },
        { name: 'REST APIs', icon: 'mdi:api', pack: 'simple' },
        { name: 'Webhooks', icon: 'mdi:webhook', pack: 'simple' },
      ],
    },
    {
      title: 'Datos y ORM',
      icon: 'fa-database',
      blurb: 'Persistencia, consultas y modelado de datos.',
      items: [
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', pack: 'devicon' },
        { name: 'Sequelize', icon: 'devicon-sequelize-plain', pack: 'devicon' },
        { name: 'SQL', icon: 'simple-icons:mysql', pack: 'simple' },
        { name: 'NoSQL', icon: 'devicon-mongodb-plain', pack: 'devicon' },
        { name: 'JPA / Hibernate', icon: 'devicon-hibernate-plain', pack: 'devicon' },
        { name: 'JPQL', icon: 'devicon-java-plain', pack: 'devicon' },
        { name: 'JSON Storage', icon: 'simple-icons:json', pack: 'simple' },
      ],
    },
    {
      title: 'Cloud y DevOps',
      icon: 'fa-cloud',
      blurb: 'Auth, cloud, contenedores y calidad de código.',
      items: [
        { name: 'Firebase', icon: 'devicon-firebase-plain', pack: 'devicon' },
        { name: 'Firebase Admin', icon: 'devicon-firebase-plain', pack: 'devicon' },
        { name: 'Google OAuth', icon: 'devicon-google-plain', pack: 'devicon' },
        { name: 'Google Cloud Storage', icon: 'devicon-googlecloud-plain', pack: 'devicon' },
        { name: 'Docker', icon: 'devicon-docker-plain', pack: 'devicon' },
        { name: 'Docker Compose', icon: 'devicon-docker-plain', pack: 'devicon' },
        { name: 'EAS', icon: 'simple-icons:expo', pack: 'simple' },
        { name: 'Sentry', icon: 'simple-icons:sentry', pack: 'simple' },
        { name: 'ESLint', icon: 'devicon-eslint-original', pack: 'devicon' },
        { name: 'Git', icon: 'devicon-git-plain', pack: 'devicon' },
        { name: 'Ngrok', icon: 'simple-icons:ngrok', pack: 'simple' },
      ],
    },
    {
      title: 'Otros',
      icon: 'fa-puzzle-piece',
      blurb: 'Frameworks, mapas, analytics y tooling.',
      items: [
        { name: 'Angular', icon: 'devicon-angularjs-plain', pack: 'devicon' },
        { name: 'Spring Boot', icon: 'devicon-spring-original', pack: 'devicon' },
        { name: 'Google Maps JavaScript API', icon: 'simple-icons:googlemaps', pack: 'simple' },
        { name: 'Google Analytics 4', icon: 'simple-icons:googleanalytics', pack: 'simple' },
        { name: 'IntelliJ IDEA', icon: 'devicon-intellij-plain', pack: 'devicon' },
      ],
    },
  ];

  readonly languages: LanguageItem[] = [
    { name: 'Español', level: 'NATIVO' },
    { name: 'Inglés', level: 'A1 · LECTURA TÉCNICA' },
  ];
}
