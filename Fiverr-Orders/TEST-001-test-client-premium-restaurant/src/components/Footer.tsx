import { brand } from '../data/sampleContent';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        {brand.wordmark} — sample identity for order TEST-001. Not a live restaurant listing.
      </p>
    </footer>
  );
}
