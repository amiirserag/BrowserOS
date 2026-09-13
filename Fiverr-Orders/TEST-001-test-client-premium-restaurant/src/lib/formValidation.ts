export interface ReservationDraft {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
}

export type ReservationField = keyof ReservationDraft;

export type ReservationErrors = Partial<Record<ReservationField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emptyReservation(): ReservationDraft {
  return {
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    message: '',
  };
}

export function validateReservation(draft: ReservationDraft): ReservationErrors {
  const errors: ReservationErrors = {};

  if (draft.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!EMAIL_PATTERN.test(draft.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (draft.phone.trim() && draft.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a complete phone number, or leave this blank.';
  }

  if (!draft.date) {
    errors.date = 'Choose a preferred date.';
  } else {
    const selected = new Date(`${draft.date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      errors.date = 'Choose today or a future date.';
    }
  }

  const guests = Number(draft.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) {
    errors.guests = 'Party size must be between 1 and 12.';
  }

  if (draft.message.trim().length < 10) {
    errors.message = 'Tell us a little more (at least 10 characters).';
  }

  return errors;
}

export function hasReservationErrors(errors: ReservationErrors): boolean {
  return Object.keys(errors).length > 0;
}
