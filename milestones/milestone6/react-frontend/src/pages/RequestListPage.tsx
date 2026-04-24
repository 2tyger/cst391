import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  formatDisplayDate,
  STATUS_FILTER_OPTIONS,
  toStatusLabel
} from '../models/prayerRequest';
import type { PrayerRequest } from '../models/prayerRequest';
import { deleteRequest, getRequests } from '../services/prayerRequestService';

export default function RequestListPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    let active = true;

    async function loadRequests() {
      try {
        setLoading(true);
        setErrorMessage('');
        const data = await getRequests();

        if (active) {
          setRequests(data);
        }
      } catch {
        if (active) {
          setErrorMessage('Unable to load prayer requests.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRequests();

    return () => {
      active = false;
    };
  }, []);

  const filteredRequests = requests.filter((request) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      term.length === 0 ||
      request.title.toLowerCase().includes(term) ||
      request.description.toLowerCase().includes(term) ||
      request.category.toLowerCase().includes(term);

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'active' && !request.isAnswered) ||
      (selectedFilter === 'answered' && request.isAnswered);

    return matchesSearch && matchesFilter;
  });

  async function handleDelete(request: PrayerRequest) {
    const confirmed = window.confirm(`Delete "${request.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteRequest(request.id);
      setRequests((current) => current.filter((item) => item.id !== request.id));
    } catch {
      setErrorMessage('Unable to delete prayer request.');
    }
  }

  return (
    <section className="page-shell list-shell">
      <Link className="cta-button" to="/requests/new">
        + Add New Request
      </Link>

      <div className="content-panel controls-panel">
        <label className="search-control">
          <span>Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="search title, description, or category"
          />
        </label>

        <label className="filter-control">
          <span>Filter:</span>
          <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)}>
            {STATUS_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {errorMessage ? <p className="feedback error">{errorMessage}</p> : null}

      <div className="content-panel table-panel">
        {loading ? <p className="feedback">Loading prayer requests...</p> : null}

        {!loading && filteredRequests.length === 0 ? (
          <p className="feedback">No prayer requests match the current search and filter.</p>
        ) : null}

        {!loading && filteredRequests.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.title}</td>
                    <td>{request.category}</td>
                    <td>{formatDisplayDate(request.dateSubmitted)}</td>
                    <td>
                      <span className={`status-chip ${request.isAnswered ? 'answered' : ''}`}>
                        {toStatusLabel(request.isAnswered)}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <Link to={`/requests/${request.id}`}>Details</Link>
                      <Link to={`/requests/${request.id}/edit`}>Edit</Link>
                      <button className="link-button" type="button" onClick={() => void handleDelete(request)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}