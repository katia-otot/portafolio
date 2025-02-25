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

  }

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('.section'));

  }


  private scrollToSection(index: number) {
    // Se elimina la lógica de desplazamiento a otras secciones
    // if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    this.isScrolling = true;
    this.currentSectionIndex = index;

    // Cambiar el comportamiento de desplazamiento a 'auto' para dispositivos móviles
    this.sections[index].scrollIntoView({ behavior: this.isMobile ? 'auto' : 'smooth' });

    // Prevenir múltiples scrolls mientras está animando
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  scrollToContact() {
    // Solo se desplaza a la sección de contacto
    this.isScrolling = true;
    this.currentSectionIndex = this.sections.length - 1;
    this.sections[this.currentSectionIndex].scrollIntoView({ behavior: this.isMobile ? 'auto' : 'smooth' });
    this.isScrolling = false;
  }
}
