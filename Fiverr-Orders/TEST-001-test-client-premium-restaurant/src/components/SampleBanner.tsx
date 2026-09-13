import { useState } from 'react';
import { SAMPLE_NOTICE } from '../data/sampleContent';

export default function SampleBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="sample-banner" role="status">
      <p>{SAMPLE_NOTICE}</p>
      <button type="button" onClick={() => setVisible(false)}>
        Dismiss
      </button>
    </div>
  );
}
