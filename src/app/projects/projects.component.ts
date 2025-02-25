import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project } from './project.interface';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Mapa local por la memoria',
      description: 'Aplicación web para mostrar recorridos que se pueden hacer para visitar los sitios de memoria locales',
      imageUrl: 'assets/mapa.png',
      technologies: ['JavaScript', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/mapa',
      demoLink: 'https://mapamemoria.netlify.app/'
    },
    {
      title: 'Portafolio',
      description: 'Mi portafolio personal',
      imageUrl: 'assets/portafolio.png',
      technologies: ['Typescript', 'Angular', 'CSS', 'HTML'],
      githubLink: 'https://github.com/katia-otot/portafolio',
      demoLink: 'https://portafoliokatiagadea.netlify.app/'
    },
  ];
}
