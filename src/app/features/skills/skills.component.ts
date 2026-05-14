import { Component } from '@angular/core';

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  readonly groups: SkillGroup[] = [
    {
      title: 'Lenguajes',
      icon: 'fa-code',
      items: ['TypeScript', 'JavaScript', 'Java', 'PHP'],
    },
    {
      title: 'Frontend web',
      icon: 'fa-window-maximize',
      items: [
        'React 19',
        'Vite',
        'Material UI',
        'Emotion',
        'React Router',
        'Apollo Client',
        'HTML5',
        'CSS3',
      ],
    },
    {
      title: 'Mobile',
      icon: 'fa-mobile-alt',
      items: [
        'React Native',
        'Expo',
        'Expo Router',
        'React Native Paper',
        'React Native Maps',
        'Reanimated',
        'Gesture Handler',
      ],
    },
    {
      title: 'Backend',
      icon: 'fa-server',
      items: [
        'Bun',
        'Hono',
        'Node.js',
        'Express.js',
        'GraphQL Yoga',
        'REST APIs',
        'Webhooks',
      ],
    },
    {
      title: 'Datos y ORM',
      icon: 'fa-database',
      items: [
        'PostgreSQL',
        'Sequelize',
        'SQL',
        'NoSQL',
        'JPA / Hibernate',
        'JPQL',
        'JSON Storage',
      ],
    },
    {
      title: 'Cloud y DevOps',
      icon: 'fa-cloud',
      items: [
        'Firebase',
        'Firebase Admin',
        'Google OAuth',
        'Google Cloud Storage',
        'Docker',
        'Docker Compose',
        'EAS',
        'Sentry',
        'ESLint',
        'Git',
        'Ngrok',
      ],
    },
    {
      title: 'Otros',
      icon: 'fa-puzzle-piece',
      items: [
        'Angular',
        'Spring Boot',
        'Google Maps JavaScript API',
        'Google Analytics 4',
        'IntelliJ IDEA',
      ],
    },
  ];
}
