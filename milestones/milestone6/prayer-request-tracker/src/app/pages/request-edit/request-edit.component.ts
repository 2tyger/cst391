import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrayerRequestFormComponent } from '../../components/prayer-request-form/prayer-request-form.component';
import { PrayerRequest, PrayerRequestFormValue, PrayerRequestPayload } from '../../models/prayer-request.model';
import { PrayerRequestService } from '../../services/prayer-request.service';

@Component({
  selector: 'app-request-edit',
  standalone: true,
  imports: [CommonModule, PrayerRequestFormComponent, RouterLink],
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css'
})
export class RequestEditComponent {
  readonly request = signal<PrayerRequest | null>(null);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(PrayerRequestService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.loadRequest();
  }

  updateRequest(formValue: PrayerRequestFormValue): void {
    const currentRequest = this.request();

    if (!currentRequest) {
      return;
    }

    const payload: PrayerRequestPayload = {
      ...formValue,
      dateSubmitted: currentRequest.dateSubmitted
    };

    this.saving.set(true);
    this.errorMessage.set('');

    this.service
      .updateRequest(currentRequest.id, payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.saving.set(false);
          void this.router.navigate(['/requests', currentRequest.id]);
        },
        error: () => {
          this.errorMessage.set('Unable to update prayer request.');
          this.saving.set(false);
        }
      });
  }

  cancelEdit(): void {
    const currentRequest = this.request();

    if (!currentRequest) {
      void this.router.navigate(['/requests']);
      return;
    }

    void this.router.navigate(['/requests', currentRequest.id]);
  }

  private loadRequest(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isFinite(id)) {
      this.errorMessage.set('Invalid prayer request id.');
      this.loading.set(false);
      return;
    }

    this.service
      .getRequestById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (request) => {
          this.request.set(request);
          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load prayer request for editing.');
          this.loading.set(false);
        }
      });
  }
}