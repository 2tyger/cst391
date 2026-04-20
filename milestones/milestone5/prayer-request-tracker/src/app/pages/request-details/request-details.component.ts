import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  formatDisplayDate,
  PrayerRequest,
  toPriorityLabel,
  toStatusLabel
} from '../../models/prayer-request.model';
import { PrayerRequestService } from '../../services/prayer-request.service';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {
  readonly request = signal<PrayerRequest | null>(null);
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PrayerRequestService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.loadRequest();
  }

  formatDate(dateSubmitted: string): string {
    return formatDisplayDate(dateSubmitted);
  }

  priorityLabel(priorityLevel: number): string {
    return toPriorityLabel(priorityLevel);
  }

  statusLabel(isAnswered: boolean): string {
    return toStatusLabel(isAnswered);
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
          this.errorMessage.set('Unable to load prayer request details.');
          this.loading.set(false);
        }
      });
  }
}