import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

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
  /** Honeypot anti-spam (debe quedar vacío). */
  botField = '';

  submitState: SubmitState = 'idle';

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();
    if (this.submitState === 'sending') {
      return;
    }

    this.submitState = 'sending';

    const body = new URLSearchParams({
      'form-name': 'contact',
      name: this.name.trim(),
      email: this.email.trim(),
      message: this.message.trim(),
      'bot-field': this.botField,
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submit failed: ${response.status}`);
      }

      this.submitState = 'success';
      this.name = '';
      this.email = '';
      this.message = '';
      this.botField = '';
    } catch {
      this.submitState = 'error';
    }
  }
}
