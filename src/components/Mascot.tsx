import { Bot } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MascotProps {
  message?: string;
  emotion?: 'happy' | 'excited' | 'encouraging' | 'celebrating';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'small' | 'medium' | 'large';
  showSpeechBubble?: boolean;
  animated?: boolean;
}

export default function Mascot({
  message,
  emotion = 'happy',
  position = 'bottom-right',
  size = 'medium',
  showSpeechBubble = true,
  animated = true
}: MascotProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  };

  const sizeClasses = {
    'small': 'w-16 h-16',
    'medium': 'w-24 h-24',
    'large': 'w-32 h-32'
  };

  const emotionStyles = {
    'happy': 'from-blue-400 to-cyan-500',
    'excited': 'from-yellow-400 to-orange-500',
    'encouraging': 'from-green-400 to-emerald-500',
    'celebrating': 'from-pink-400 to-purple-500'
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
    >
      {showSpeechBubble && message && (
        <div className={`absolute ${position.includes('right') ? 'right-0 mr-32' : 'left-0 ml-32'} ${position.includes('top') ? 'top-0 mt-2' : 'bottom-0 mb-2'} bg-white rounded-2xl p-4 shadow-2xl max-w-sm min-w-[200px]`}>
          <div className="text-xl font-bold text-gray-700">{message}</div>
          <div className={`absolute ${position.includes('right') ? '-right-2' : '-left-2'} ${position.includes('top') ? 'top-6' : 'bottom-6'} w-4 h-4 bg-white transform rotate-45`} />
        </div>
      )}

      <div
        className={`bg-gradient-to-br ${emotionStyles[emotion]} rounded-full ${sizeClasses[size]} flex items-center justify-center shadow-2xl ${
          animated ? 'animate-bounce' : ''
        } cursor-pointer hover:scale-110 transition-transform duration-200`}
      >
        <Bot className="w-3/5 h-3/5 text-white" strokeWidth={2.5} />
      </div>

      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
    </div>
  );
}
