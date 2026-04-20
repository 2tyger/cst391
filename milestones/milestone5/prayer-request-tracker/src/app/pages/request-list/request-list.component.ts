import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  formatDisplayDate,
  PrayerRequest,
  STATUS_FILTER_OPTIONS,
  toStatusLabel
} from '../../models/prayer-request.model';
import { PrayerRequestService } from '../../services/prayer-request.service';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  readonly requests = signal<PrayerRequest[]>([]);
  readonly loading = signal(true);
  readonly errorMessage = signal('');
  readonly searchTerm = signal('');
  readonly selectedFilter = signal('all');
  readonly filterOptions = STATUS_FILTER_OPTIONS;
  readonly filteredRequests = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filter = this.selectedFilter();

    return this.requests().filter((request) => {
      const matchesSearch =
        term.length === 0 ||
        request.title.toLowerCase().includes(term) ||
        request.description.toLowerCase().includes(term) ||
        request.category.toLowerCase().includes(term);

      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !request.isAnswered) ||
        (filter === 'answered' && request.isAnswered);

      return matchesSearch && matchesFilter;
    });
  });

  private readonly service = inject(PrayerRequestService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.service
      .getRequests()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (requests) => {
          this.requests.set(requests);
          this.loading.set(false);
        },
        error: () => {
          this.errorMessage.set('Unable to load prayer requests.');
          this.loading.set(false);
        }
      });
  }

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  updateFilter(value: string): void {
    this.selectedFilter.set(value);
  }

  confirmDelete(request: PrayerRequest): void {
    const confirmed = window.confirm(`Delete "${request.title}"?`);

    if (!confirmed) {
      return;
    }

    this.service
      .deleteRequest(request.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.requests.update((requests) => requests.filter((item) => item.id !== request.id));
        },
        error: () => {
          this.errorMessage.set('Unable to delete prayer request.');
        }
      });
  }

  formatDate(dateSubmitted: string): string {
    return formatDisplayDate(dateSubmitted);
  }

  statusLabel(isAnswered: boolean): string {
    return toStatusLabel(isAnswered);
  }
}