import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './Menu';

describe('menu categories', () => {
  it('switches the visible dishes when a tab is selected', async () => {
    const user = userEvent.setup();
    render(<Menu />);

    expect(screen.getByRole('heading', { name: 'First light' })).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Mains' }));
    expect(screen.getByRole('heading', { name: 'Line-caught fish' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'First light' })).not.toBeInTheDocument();
  });
});
