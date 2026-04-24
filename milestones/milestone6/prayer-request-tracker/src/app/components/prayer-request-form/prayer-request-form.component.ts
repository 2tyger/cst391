import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  PrayerRequestFormValue,
  PrayerRequestPayload
} from '../../models/prayer-request.model';

@Component({
  selector: 'app-prayer-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './prayer-request-form.component.html',
  styleUrl: './prayer-request-form.component.css'
})
export class PrayerRequestFormComponent {
  readonly heading = input.required<string>();
  readonly submitLabel = input.required<string>();
  readonly request = input<PrayerRequestPayload | null>(null);
  readonly busy = input(false);
  readonly errorMessage = input('');
  readonly submitted = output<PrayerRequestFormValue>();
  readonly cancelled = output<void>();

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly priorityOptions = PRIORITY_OPTIONS;

  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    category: [CATEGORY_OPTIONS[0], [Validators.required]],
    priorityLevel: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    isAnswered: [false]
  });

  constructor() {
    effect(() => {
      const request = this.request();

      if (request) {
        this.form.reset({
          title: request.title,
          description: request.description,
          category: request.category,
          priorityLevel: request.priorityLevel,
          isAnswered: request.isAnswered
        });

        return;
      }

      this.form.reset(this.buildDefaultValue());
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.getRawValue());
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  fieldInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  private buildDefaultValue(): PrayerRequestFormValue {
    return {
      title: '',
      description: '',
      category: CATEGORY_OPTIONS[0],
      priorityLevel: 1,
      isAnswered: false
    };
  }
}