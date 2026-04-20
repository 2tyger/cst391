import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestForm from '../components/RequestForm';
import type { PrayerRequest, PrayerRequestFormValue, PrayerRequestPayload } from '../models/prayerRequest';
import { getRequestById, updateRequest } from '../services/prayerRequestService';

export default function RequestEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const numericId = Number(id);

    if (!Number.isFinite(numericId)) {
      setErrorMessage('Invalid prayer request id.');
      setLoading(false);
      return;
    }

    let active = true;

    async function loadRequest() {
      try {
        setLoading(true);
        setErrorMessage('');
        const data = await getRequestById(numericId);

        if (active) {
          setRequest(data);
        }
      } catch {
        if (active) {
          setErrorMessage('Unable to load prayer request.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRequest();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleUpdate(value: PrayerRequestFormValue) {
    if (!request) {
      return;
    }

    const payload: PrayerRequestPayload = {
      ...value,
      dateSubmitted: request.dateSubmitted
    };

    try {
      setSaving(true);
      setErrorMessage('');
      await updateRequest(request.id, payload);
      navigate('/requests');
    } catch {
      setErrorMessage('Unable to update prayer request.');
    } finally {
      setSaving(false);
    }
  }

  if (errorMessage && !loading && !request) {
    return (
      <section className="page-shell">
        <div className="section-banner">Edit Prayer Request</div>
        <p className="feedback error">{errorMessage}</p>
        <div className="details-actions">
          <Link className="secondary-button" to="/requests">
            Back
          </Link>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="page-shell">
        <div className="section-banner">Edit Prayer Request</div>
        <div className="content-panel">
          <p className="feedback">Loading prayer request...</p>
        </div>
      </section>
    );
  }

  return (
    <RequestForm
      heading="Edit Prayer Request"
      submitLabel="Update"
      request={request}
      busy={saving}
      errorMessage={errorMessage}
      onSubmit={(value) => void handleUpdate(value)}
      onCancel={() => navigate('/requests')}
    />
  );
}