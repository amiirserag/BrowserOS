import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

function shouldReveal(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.94 && rect.bottom > 0;
}

export default function Reveal({ children, className = '', as = 'div' }: RevealProps) {
  const Tag = as;
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver === 'undefined' || shouldReveal(node)) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      if (shouldReveal(node)) {
        setVisible(true);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '80px 0px' },
    );

    observer.observe(node);

    const onScroll = () => {
      if (reveal()) {
        window.removeEventListener('scroll', onScroll);
        observer.disconnect();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-in' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
