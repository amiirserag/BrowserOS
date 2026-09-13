import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import SampleBanner from './SampleBanner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo?.({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SampleBanner />
      <Header />
      <main id="main" className="page-shell">
        <div key={location.pathname} className="page-enter">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
