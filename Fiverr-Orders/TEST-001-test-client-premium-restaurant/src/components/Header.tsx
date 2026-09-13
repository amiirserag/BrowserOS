import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brand, nav } from '../data/sampleContent';

interface HeaderProps {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: () => void;
}

export default function Header({ menuOpen, onMenuToggle, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link className="wordmark" to="/" onClick={onNavigate}>
        {brand.wordmark}
        <span>{brand.cuisine}</span>
      </Link>

      <nav className="nav-desktop" aria-label="Primary">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={onMenuToggle}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
