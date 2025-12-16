import { Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';

interface VoiceToggleProps {
  position?: 'top-right' | 'bottom-right' | 'inline';
  size?: 'small' | 'medium' | 'large';
}

export default function VoiceToggle({ position = 'top-right', size = 'medium' }: VoiceToggleProps) {
  const { isVoiceEnabled, toggleVoice, isSpeaking } = useVoice();

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'inline': ''
  };

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const iconSizes = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10'
  };

  const handleClick = () => {
    toggleVoice();
  };

  const handleMouseEnter = () => {
    if (isVoiceEnabled && !isSpeaking) {
      const voiceContext = require('../contexts/VoiceContext');
      const speak = voiceContext.useVoice?.()?.speak;
      if (speak) {
        speak(isVoiceEnabled ? 'Turn voice off' : 'Turn voice on');
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${positionClasses[position]} ${sizeClasses[size]} ${
        isVoiceEnabled
          ? 'bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600'
          : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
      } rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-200 border-4 border-white group`}
      aria-label={isVoiceEnabled ? 'Turn voice off' : 'Turn voice on'}
      title={isVoiceEnabled ? 'Voice On - Click to turn off' : 'Voice Off - Click to turn on'}
    >
      {isVoiceEnabled ? (
        <Volume2 className={`${iconSizes[size]} text-white ${isSpeaking ? 'animate-pulse' : ''}`} />
      ) : (
        <VolumeX className={`${iconSizes[size]} text-white`} />
      )}
      {isSpeaking && (
        <span className="absolute -inset-1 rounded-full border-4 border-white animate-ping opacity-75" />
      )}
    </button>
  );
}
