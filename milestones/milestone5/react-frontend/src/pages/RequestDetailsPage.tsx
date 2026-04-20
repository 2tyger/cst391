import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  formatDisplayDate,
  toPriorityLabel,
  toStatusLabel
} from '../models/prayerRequest';
import type { PrayerRequest } from '../models/prayerRequest';
import { getRequestById } from '../services/prayerRequestService';

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<PrayerRequest | null>(null);
  const [loading, setLoading] = useState(true);
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
          setErrorMessage('Unable to load prayer request details.');
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

  return (
    <section className="page-shell">
      <div className="section-banner">Prayer Request Details</div>

      {errorMessage ? <p className="feedback error">{errorMessage}</p> : null}

      {loading ? (
        <div className="content-panel details-panel">
          <p className="feedback">Loading prayer request details...</p>
        </div>
      ) : null}

      {!loading && request ? (
        <>
          <div className="content-panel details-panel">
            <div className="detail-row">
              <span className="detail-label">Title:</span>
              <span>{request.title}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Category:</span>
              <span>{request.category}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date Submitted:</span>
              <span>{formatDisplayDate(request.dateSubmitted)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Priority Level:</span>
              <span>{toPriorityLabel(request.priorityLevel)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span>{toStatusLabel(request.isAnswered)}</span>
            </div>
            <div className="detail-row detail-row-top">
              <span className="detail-label">Description:</span>
              <p className="detail-description">{request.description}</p>
            </div>
          </div>

          <div className="details-actions">
            <Link className="secondary-button" to="/requests">
              Back
            </Link>
          </div>
        </>
      ) : null}
    </section>
  );
}