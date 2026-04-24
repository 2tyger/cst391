import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PrayerRequestFormComponent } from '../../components/prayer-request-form/prayer-request-form.component';
import { PrayerRequestFormValue, PrayerRequestPayload } from '../../models/prayer-request.model';
import { PrayerRequestService } from '../../services/prayer-request.service';

@Component({
  selector: 'app-request-create',
  standalone: true,
  imports: [PrayerRequestFormComponent],
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent {
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  private readonly service = inject(PrayerRequestService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  createRequest(formValue: PrayerRequestFormValue): void {
    const payload: PrayerRequestPayload = {
      ...formValue,
      dateSubmitted: new Date().toISOString().slice(0, 10)
    };

    this.saving.set(true);
    this.errorMessage.set('');

    this.service
      .createRequest(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          void this.router.navigate(['/requests']);
        },
        error: () => {
          this.errorMessage.set('Unable to create prayer request.');
          this.saving.set(false);
        }
      });
  }

  goBack(): void {
    void this.router.navigate(['/requests']);
  }
}