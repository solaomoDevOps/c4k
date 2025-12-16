import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface VoiceContextType {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speak: (text: string, options?: SpeechOptions) => void;
  stop: () => void;
  isSpeaking: boolean;
}

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  priority?: 'high' | 'normal' | 'low';
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem('voiceEnabled');
    return saved ? JSON.parse(saved) : false;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechQueue, setSpeechQueue] = useState<string[]>([]);

  const speak = (text: string, options: SpeechOptions = {}) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;

    if (options.priority === 'high') {
      window.speechSynthesis.cancel();
      setSpeechQueue([]);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.1;
    utterance.volume = options.volume || 1;
    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const childVoice = voices.find(voice =>
      voice.name.includes('Google UK English Female') ||
      voice.name.includes('Microsoft Zira') ||
      voice.name.includes('Samantha') ||
      voice.lang === 'en-US'
    );
    if (childVoice) {
      utterance.voice = childVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechQueue(prev => prev.slice(1));
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeechQueue(prev => prev.slice(1));
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechQueue([]);
    }
  };

  const toggleVoice = () => {
    const newValue = !isVoiceEnabled;
    setIsVoiceEnabled(newValue);
    localStorage.setItem('voiceEnabled', JSON.stringify(newValue));

    if (newValue) {
      speak('Voice navigation is now on! I will read buttons and instructions to help you.', { priority: 'high' });
    } else {
      stop();
    }
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ isVoiceEnabled, toggleVoice, speak, stop, isSpeaking }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
