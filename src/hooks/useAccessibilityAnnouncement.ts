import { useState, useCallback } from 'react';

type Priority = 'polite' | 'assertive';

interface UseAccessibilityAnnouncementReturn {
  announcement: string;
  priority: Priority;
  announce: (message: string, priority?: Priority) => void;
  clearAnnouncement: () => void;
}

export const useAccessibilityAnnouncement = (): UseAccessibilityAnnouncementReturn => {
  const [announcement, setAnnouncement] = useState('');
  const [priority, setPriority] = useState<Priority>('polite');

  const announce = useCallback((message: string, newPriority: Priority = 'polite') => {
    setAnnouncement(message);
    setPriority(newPriority);
  }, []);

  const clearAnnouncement = useCallback(() => {
    setAnnouncement('');
  }, []);

  return {
    announcement,
    priority,
    announce,
    clearAnnouncement,
  };
}; 