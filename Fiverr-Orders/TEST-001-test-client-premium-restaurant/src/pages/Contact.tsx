import { useState, type FormEvent } from 'react';
import Reveal from '../components/Reveal';
import { contactPlaceholders } from '../data/sampleContent';
import {
  emptyReservation,
  hasReservationErrors,
  validateReservation,
  type ReservationDraft,
  type ReservationErrors,
} from '../lib/formValidation';

export default function Contact() {
  const [draft, setDraft] = useState<ReservationDraft>(emptyReservation);
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateReservation(draft);
    setErrors(nextErrors);
    setSubmitted(!hasReservationErrors(nextErrors));
  };

  const update = (field: keyof ReservationDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">The table</p>
        <h1>Contact</h1>
        <div className="gold-rule" />
        <p className="lede">
          Address, hours, and a reservations inbox were not supplied. This form checks the request and
          stays on the page — it does not email anyone.
        </p>
      </header>

      <section className="section contact-grid">
        <Reveal className="contact-panel">
          <form onSubmit={onSubmit} noValidate>
            <Field
              id="name"
              label="Name"
              value={draft.name}
              error={errors.name}
              onChange={(value) => update('name', value)}
              autoComplete="name"
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={draft.email}
              error={errors.email}
              onChange={(value) => update('email', value)}
              autoComplete="email"
            />
            <Field
              id="phone"
              label="Phone (optional)"
              type="tel"
              value={draft.phone}
              error={errors.phone}
              onChange={(value) => update('phone', value)}
              autoComplete="tel"
            />
            <Field
              id="date"
              label="Preferred date"
              type="date"
              value={draft.date}
              error={errors.date}
              onChange={(value) => update('date', value)}
            />
            <div className="field">
              <label htmlFor="guests">Guests</label>
              <select
                id="guests"
                value={draft.guests}
                onChange={(event) => update('guests', event.target.value)}
              >
                {Array.from({ length: 12 }, (_, index) => String(index + 1)).map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              {errors.guests ? <p className="field-error">{errors.guests}</p> : null}
            </div>
            <div className="field">
              <label htmlFor="message">Note</label>
              <textarea
                id="message"
                value={draft.message}
                onChange={(event) => update('message', event.target.value)}
              />
              {errors.message ? <p className="field-error">{errors.message}</p> : null}
            </div>
            <button className="btn" type="submit">
              Request a table
            </button>
            {submitted ? (
              <p className="form-status" data-tone="success" role="status">
                Request checked. Delivery is paused until a reservations email or booking tool is
                provided.
              </p>
            ) : (
              <p className="form-status" data-tone="info">
                No messages leave this preview.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal className="contact-panel">
          <p className="section-kicker">House notes</p>
          <h2>How to find us</h2>
          <ul className="detail-list">
            <li>
              <span>Address</span>
              {contactPlaceholders.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </li>
            <li>
              <span>Telephone</span>
              <p>{contactPlaceholders.phone}</p>
            </li>
            <li>
              <span>Email</span>
              <p>{contactPlaceholders.email}</p>
            </li>
            {contactPlaceholders.hours.map((row) => (
              <li key={row.day}>
                <span>{row.day}</span>
                <p>{row.time}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

function Field({ id, label, value, error, type = 'text', autoComplete, onChange }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}
