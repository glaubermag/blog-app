import React, { useEffect, useState } from 'react';

interface AccessibilityAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

const AccessibilityAnnouncer: React.FC<AccessibilityAnnouncerProps> = ({
  message,
  priority = 'polite',
}) => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
    }
  }, [message]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  );
};

export default AccessibilityAnnouncer; 