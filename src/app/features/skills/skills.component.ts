import { Component, computed, inject } from '@angular/core';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

export interface SkillItem {
  name: string;
  icon: string;
  pack: 'devicon' | 'simple';
}

export interface SkillGroup {
  id: string;
  icon: string;
  items: SkillItem[];
}

@Component({
  selector: 'app-skills',
  imports: [WaveDividerComponent, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  readonly i18n = inject(I18nService);

  readonly groupDefs: SkillGroup[] = [
    {
      id: 'g1',
      icon: 'fa-code',
      items: [
        { name: 'TypeScript', icon: 'devicon-typescript-plain', pack: 'devicon' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain', pack: 'devicon' },
        { name: 'Java', icon: 'devicon-java-plain', pack: 'devicon' },
        { name: 'PHP', icon: 'devicon-php-plain', pack: 'devicon' },
      ],
    },
    {
      id: 'g2',
      icon: 'fa-window-maximize',
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
      id: 'g3',
      icon: 'fa-mobile-alt',
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
      id: 'g4',
      icon: 'fa-server',
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
      id: 'g5',
      icon: 'fa-database',
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
      id: 'g6',
      icon: 'fa-cloud',
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
      id: 'g7',
      icon: 'fa-puzzle-piece',
      items: [
        { name: 'Angular', icon: 'devicon-angularjs-plain', pack: 'devicon' },
        { name: 'Spring Boot', icon: 'devicon-spring-original', pack: 'devicon' },
        { name: 'Google Maps JavaScript API', icon: 'simple-icons:googlemaps', pack: 'simple' },
        { name: 'Google Analytics 4', icon: 'simple-icons:googleanalytics', pack: 'simple' },
        { name: 'IntelliJ IDEA', icon: 'devicon-intellij-plain', pack: 'devicon' },
      ],
    },
  ];

  readonly groups = computed(() => {
    this.i18n.locale();
    return this.groupDefs.map((group) => ({
      ...group,
      title: this.i18n.t(`skills.${group.id}.title`),
      blurb: this.i18n.t(`skills.${group.id}.blurb`),
    }));
  });

  readonly languages = computed(() => {
    this.i18n.locale();
    return [
      {
        name: this.i18n.t('skills.lang.es.name'),
        level: this.i18n.t('skills.lang.es.level'),
      },
      {
        name: this.i18n.t('skills.lang.en.name'),
        level: this.i18n.t('skills.lang.en.level'),
      },
    ];
  });
}
