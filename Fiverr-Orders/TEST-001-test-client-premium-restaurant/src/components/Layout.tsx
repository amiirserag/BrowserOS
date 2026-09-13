import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MobileNav from './MobileNav';
import SampleBanner from './SampleBanner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-chrome">
        <SampleBanner />
        <Header
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((value) => !value)}
          onNavigate={() => setMenuOpen(false)}
        />
      </div>
      <MobileNav open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      <main id="main" className="page-shell">
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
