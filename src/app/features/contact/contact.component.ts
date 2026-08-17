import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaveDividerComponent } from '../../shared/components/wave-divider/wave-divider.component';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, WaveDividerComponent, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  readonly i18n = inject(I18nService);

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

    const trimmedName = this.name.trim();
    const subject = trimmedName
      ? this.i18n.t('contact.subjectNamed', { name: trimmedName })
      : this.i18n.t('contact.subjectDefault');

    try {
      const response = await fetch(this.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: this.email.trim(),
          message: this.message.trim(),
          _subject: subject,
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
