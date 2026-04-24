import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestForm from '../components/RequestForm';
import { normalizeDateSubmitted } from '../models/prayerRequest';
import type { PrayerRequestFormValue } from '../models/prayerRequest';
import { createRequest } from '../services/prayerRequestService';

export default function RequestCreatePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleCreate(value: PrayerRequestFormValue) {
    try {
      setSaving(true);
      setErrorMessage('');
      await createRequest({
        ...value,
        dateSubmitted: normalizeDateSubmitted(new Date().toISOString())
      });
      navigate('/requests');
    } catch {
      setErrorMessage('Unable to create prayer request.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <RequestForm
      heading="Create Prayer Request"
      submitLabel="Submit"
      busy={saving}
      errorMessage={errorMessage}
      onSubmit={(value) => void handleCreate(value)}
      onCancel={() => navigate('/requests')}
    />
  );
}