import { describe, expect, it } from 'vitest';
import { emptyReservation, hasReservationErrors, validateReservation } from './formValidation';

function validDraft() {
  return {
    ...emptyReservation(),
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    date: '2099-12-31',
    guests: '2',
    message: 'Window table if possible.',
  };
}

describe('validateReservation', () => {
  it('accepts a complete future booking request', () => {
    const errors = validateReservation(validDraft());
    expect(hasReservationErrors(errors)).toBe(false);
  });

  it('rejects a short name and invalid email', () => {
    const errors = validateReservation({
      ...validDraft(),
      name: 'A',
      email: 'not-an-email',
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('rejects a past date', () => {
    const errors = validateReservation({
      ...validDraft(),
      date: '2020-01-01',
    });
    expect(errors.date).toBeDefined();
  });

  it('rejects an out-of-range party size', () => {
    const errors = validateReservation({
      ...validDraft(),
      guests: '20',
    });
    expect(errors.guests).toBeDefined();
  });

  it('allows a blank phone and rejects a truncated one', () => {
    expect(validateReservation(validDraft()).phone).toBeUndefined();
    const errors = validateReservation({
      ...validDraft(),
      phone: '123',
    });
    expect(errors.phone).toBeDefined();
  });
});
