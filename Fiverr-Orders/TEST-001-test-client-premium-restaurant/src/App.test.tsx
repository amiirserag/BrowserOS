import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('site routes', () => {
  it('renders the home hero', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: /an evening, composed/i })).toBeInTheDocument();
  });

  it('navigates to the menu and contact pages', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await user.click(screen.getAllByRole('link', { name: 'Menu' })[0]);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();

    await user.click(screen.getAllByRole('link', { name: 'Contact' })[0]);
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });

  it('redirects unknown paths home', () => {
    renderAt('/does-not-exist');
    expect(screen.getByRole('heading', { name: /an evening, composed/i })).toBeInTheDocument();
  });
});
