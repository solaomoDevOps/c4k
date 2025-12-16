import { ReactNode, ButtonHTMLAttributes, useRef, useEffect } from 'react';
import { useVoice } from '../contexts/VoiceContext';

interface VoiceButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  voiceText?: string;
  priority?: 'high' | 'normal' | 'low';
}

export default function VoiceButton({
  children,
  voiceText,
  priority = 'normal',
  className = '',
  onMouseEnter,
  onFocus,
  ...props
}: VoiceButtonProps) {
  const { isVoiceEnabled, speak } = useVoice();
  const hasSpokenRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join(' ');
    if (node && typeof node === 'object' && 'props' in node) {
      return getTextContent((node as any).props.children);
    }
    return '';
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isVoiceEnabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      hasSpokenRef.current = false;

      timeoutRef.current = setTimeout(() => {
        if (!hasSpokenRef.current) {
          const text = voiceText || getTextContent(children);
          if (text) {
            speak(text, { priority: priority === 'normal' ? undefined : priority });
            hasSpokenRef.current = true;
          }
        }
      }, 300);
    }
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    hasSpokenRef.current = false;
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (isVoiceEnabled) {
      const text = voiceText || getTextContent(children);
      if (text) {
        speak(text, { priority: priority === 'normal' ? undefined : priority });
      }
    }
    if (onFocus) onFocus(e);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      {...props}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
    >
      {children}
    </button>
  );
}
