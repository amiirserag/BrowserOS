import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brand, nav } from '../data/sampleContent';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link className="wordmark" to="/" onClick={() => setOpen(false)}>
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
        className={`menu-toggle ${open ? 'is-open' : ''}`}
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <div id="mobile-nav" className={`nav-mobile ${open ? 'is-open' : ''}`}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
