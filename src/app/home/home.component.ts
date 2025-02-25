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

  ngOnInit() {
    // Inicialización básica
  }

  ngAfterViewInit() {
    this.sections = Array.from(document.querySelectorAll('.section'));
    this.setupScrollListener();
  }

  private setupScrollListener() {
    window.addEventListener('wheel', (event) => {
      event.preventDefault();
      
      if (this.isScrolling) return;
      
      const direction = event.deltaY > 0 ? 1 : -1;
      this.scrollToSection(this.currentSectionIndex + direction);
    }, { passive: false });
  }

  private scrollToSection(index: number) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;

    this.isScrolling = true;
    this.currentSectionIndex = index;

    this.sections[index].scrollIntoView({ behavior: 'smooth' });

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
