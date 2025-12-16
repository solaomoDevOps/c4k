import { useEffect, useRef } from 'react';
import { useVoice } from '../contexts/VoiceContext';

export function useVoiceInstruction(text: string, options?: {
  delay?: number;
  priority?: 'high' | 'normal' | 'low';
  deps?: any[];
}) {
  const { isVoiceEnabled, speak } = useVoice();
  const hasSpokenRef = useRef(false);
  const delay = options?.delay || 500;
  const priority = options?.priority || 'high';
  const deps = options?.deps || [];

  useEffect(() => {
    if (isVoiceEnabled && text && !hasSpokenRef.current) {
      const timer = setTimeout(() => {
        speak(text, { priority });
        hasSpokenRef.current = true;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVoiceEnabled, text, delay, priority, ...deps]);

  useEffect(() => {
    hasSpokenRef.current = false;
  }, deps);

  return null;
}
