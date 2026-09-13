import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
}

describe('contact form', () => {
  it('shows validation errors for an empty submit', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: /request a table/i }));

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(screen.queryByText(/request checked/i)).not.toBeInTheDocument();
  });

  it('accepts a complete request without sending it anywhere', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByLabelText(/^name$/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/^email$/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/preferred date/i), '2099-12-31');
    await user.type(screen.getByLabelText(/^note$/i), 'Window table if possible.');
    await user.click(screen.getByRole('button', { name: /request a table/i }));

    expect(screen.getByText(/request checked/i)).toBeInTheDocument();
    expect(screen.getByText(/no messages leave this preview|delivery is paused/i)).toBeInTheDocument();
  });
});
