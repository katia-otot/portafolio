import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from '../about/about.component'; 
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    AboutComponent, 
    ProjectsComponent, 
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('contact') contactSection!: ElementRef;
  private sections: HTMLElement[] = [];
  private currentSectionIndex = 0;
  private isScrolling = false;
  private scrollTimeout: any;
  private isMobile: boolean = false;

  ngOnInit() {
    // Inicialización básica
    this.isMobile = window.innerWidth < 768; // Inicializar isMobile
  }

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('.section'));
    this.setupScrollListener();
  }

  private setupScrollListener() {
    if (this.isMobile) {
      // Manejar el desplazamiento en dispositivos móviles
      let startY: number;

      window.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY; // Guardar la posición inicial del toque
      });

      window.addEventListener('touchmove', (event) => {
        const currentY = event.touches[0].clientY; // Obtener la posición actual del toque
        const direction = startY - currentY; // Calcular la dirección del desplazamiento

        if (Math.abs(direction) > 30) { // Umbral para evitar desplazamientos accidentales
          event.preventDefault(); // Prevenir el comportamiento predeterminado

          if (direction > 0) {
            // Desplazamiento hacia abajo
            this.scrollToSection(this.currentSectionIndex + 1);
          } else {
            // Desplazamiento hacia arriba
            this.scrollToSection(this.currentSectionIndex - 1);
          }
        }
      });
    } else {
      // Manejar el desplazamiento en dispositivos de escritorio
      window.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        if (this.isScrolling) return;
        
        const direction = event.deltaY > 0 ? 1 : -1;
        this.scrollToSection(this.currentSectionIndex + direction);
      }, { passive: false });
    }
  }

  private scrollToSection(index: number) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    this.isScrolling = true;
    this.currentSectionIndex = index;

    this.sections[index].scrollIntoView({ behavior: this.isMobile ? 'auto' : 'smooth' }); // Usar this.isMobile

    // Prevenir múltiples scrolls mientras está animando
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  scrollToContact() {
    this.scrollToSection(this.sections.length - 1);
  }
}
