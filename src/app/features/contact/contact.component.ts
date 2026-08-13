import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, WaveDividerComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  readonly mailTo = 'katiagadea19@gmail.com';

  submitForm(event: Event): void {
    event.preventDefault();
    const subject = encodeURIComponent(
      this.name.trim()
        ? `Contacto desde el portafolio — ${this.name.trim()}`
        : 'Contacto desde el portafolio'
    );
    const body = encodeURIComponent(
      [
        this.name.trim() ? `Nombre: ${this.name.trim()}` : null,
        this.email.trim() ? `Correo: ${this.email.trim()}` : null,
        '',
        this.message.trim() || '(Sin mensaje)',
      ]
        .filter((line) => line !== null)
        .join('\n')
    );
    window.location.href = `mailto:${this.mailTo}?subject=${subject}&body=${body}`;
  }
}
