import { Component, OnDestroy, inject } from '@angular/core';
import { I18nService } from '../../shared/i18n/i18n.service';
import { TranslatePipe } from '../../shared/i18n/translate.pipe';
import { EditorialIconComponent } from '../../shared/components/editorial-icon/editorial-icon.component';

@Component({
  selector: 'app-contact',
  imports: [TranslatePipe, EditorialIconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnDestroy {
  readonly i18n = inject(I18nService);

  readonly emailAddress = 'katiagadea19@gmail.com';
  readonly mailtoHref = 'mailto:katiagadea19@gmail.com';

  copied = false;
  private copyResetTimer?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    if (this.copyResetTimer) {
      clearTimeout(this.copyResetTimer);
    }
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.emailAddress);
      this.copied = true;
      if (this.copyResetTimer) {
        clearTimeout(this.copyResetTimer);
      }
      this.copyResetTimer = setTimeout(() => {
        this.copied = false;
        this.copyResetTimer = undefined;
      }, 2000);
    } catch {
      this.copied = false;
    }
  }
}
