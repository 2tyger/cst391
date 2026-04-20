import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  buildDefaultPrayerRequestFormValue,
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  type PrayerRequestFormValue,
  type PrayerRequestPayload
} from '../models/prayerRequest';

interface RequestFormProps {
  heading: string;
  submitLabel: string;
  request?: PrayerRequestPayload | null;
  busy?: boolean;
  errorMessage?: string;
  onSubmit: (value: PrayerRequestFormValue) => void;
  onCancel: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function RequestForm({
  heading,
  submitLabel,
  request = null,
  busy = false,
  errorMessage = '',
  onSubmit,
  onCancel
}: RequestFormProps) {
  const [formValue, setFormValue] = useState<PrayerRequestFormValue>(
    request ? toFormValue(request) : buildDefaultPrayerRequestFormValue()
  );
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormValue(request ? toFormValue(request) : buildDefaultPrayerRequestFormValue());
    setErrors({});
  }, [request]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;
    const nextValue =
      type === 'checkbox'
        ? (event.target as HTMLInputElement).checked
        : name === 'priorityLevel'
          ? Number(value)
          : value;

    setFormValue((current) => ({
      ...current,
      [name]: nextValue
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formValue);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(formValue);
  }

  return (
    <section className="page-shell">
      <div className="section-banner">{heading}</div>

      {errorMessage ? <p className="feedback error">{errorMessage}</p> : null}

      <form className="content-panel request-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <div className="form-field">
            <input
              id="title"
              name="title"
              type="text"
              maxLength={100}
              value={formValue.title}
              onChange={handleChange}
            />
            {errors.title ? <p className="field-error">{errors.title}</p> : null}
          </div>
        </div>

        <div className="form-row form-row-top">
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <div className="form-field">
            <textarea
              id="description"
              name="description"
              rows={8}
              maxLength={2000}
              value={formValue.description}
              onChange={handleChange}
            />
            {errors.description ? <p className="field-error">{errors.description}</p> : null}
          </div>
        </div>

        <div className="form-row form-row-compact">
          <label className="form-label" htmlFor="category">
            Category:
          </label>
          <div className="form-field form-field-select">
            <select id="category" name="category" value={formValue.category} onChange={handleChange}>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row form-row-compact">
          <label className="form-label" htmlFor="priorityLevel">
            Priority Level:
          </label>
          <div className="form-field form-field-select">
            <select
              id="priorityLevel"
              name="priorityLevel"
              value={formValue.priorityLevel}
              onChange={handleChange}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.value} - {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row form-row-compact checkbox-row">
          <span className="form-label">Answered:</span>
          <label className="checkbox-label">
            <input
              name="isAnswered"
              type="checkbox"
              checked={formValue.isAnswered}
              onChange={handleChange}
            />
            <span>mark as answered</span>
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={busy}>
            {busy ? 'Saving...' : submitLabel}
          </button>
          <button className="secondary-button" type="button" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

function toFormValue(request: PrayerRequestPayload): PrayerRequestFormValue {
  return {
    title: request.title,
    description: request.description,
    category: request.category,
    priorityLevel: request.priorityLevel,
    isAnswered: request.isAnswered
  };
}

function validateForm(value: PrayerRequestFormValue): FormErrors {
  const errors: FormErrors = {};

  if (!value.title.trim()) {
    errors.title = 'title is required.';
  }

  if (!value.description.trim()) {
    errors.description = 'description is required.';
  }

  return errors;
}