import { NavLink } from 'react-router-dom';
import { nav } from '../data/sampleContent';

interface MobileNavProps {
  open: boolean;
  onNavigate: () => void;
}

export default function MobileNav({ open, onNavigate }: MobileNavProps) {
  return (
    <div id="mobile-nav" className={`nav-mobile ${open ? 'is-open' : ''}`}>
      <nav aria-label="Mobile">
        {nav.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onNavigate}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
