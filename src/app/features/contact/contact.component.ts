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
  /** Destino del correo (FormSubmit → Gmail). */
  private readonly formEndpoint =
    'https://formsubmit.co/ajax/katiagadea19@gmail.com';

  name = '';
  email = '';
  message = '';
  /** Honeypot anti-spam (debe quedar vacío). */
  botField = '';

  submitState: SubmitState = 'idle';
  /** True si FormSubmit pide activar el correo destino la primera vez. */
  activationPending = false;

  async submitForm(event: Event): Promise<void> {
    event.preventDefault();
    if (this.submitState === 'sending' || this.botField.trim()) {
      return;
    }

    this.submitState = 'sending';

    try {
      const response = await fetch(this.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.name.trim(),
          email: this.email.trim(),
          message: this.message.trim(),
          _subject: this.name.trim()
            ? `Contacto portafolio — ${this.name.trim()}`
            : 'Contacto desde el portafolio',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      const successFlag = payload?.success;
      const ok =
        response.ok &&
        (successFlag === true ||
          successFlag === 'true' ||
          String(payload?.message ?? '')
            .toLowerCase()
            .includes('success'));

      if (!ok) {
        const msg = String(payload?.message ?? '');
        // Primera vez: FormSubmit pide activar el destino por mail.
        if (/activat/i.test(msg)) {
          this.submitState = 'error';
          this.activationPending = true;
          return;
        }
        throw new Error(msg || `Form submit failed: ${response.status}`);
      }

      this.activationPending = false;
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
