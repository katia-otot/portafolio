import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
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
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contact') contactSection!: ElementRef;

  ngAfterViewInit() {
    console.log('Contact section:', this.contactSection);
  }

  scrollToContact() {
    console.log('Button clicked');
    const element = document.querySelector('app-contact');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.log('Contact section not found');
    }
  }
}
