import { useState, useEffect } from 'react';

interface TypeLettersGameProps {
  onComplete: (score: number) => void;
}

export default function TypeLettersGame({ onComplete }: TypeLettersGameProps) {
  const [currentLetter, setCurrentLetter] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; letter: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    generateNewLetter();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(score * 5);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (key === currentLetter) {
        setScore(prev => prev + 1);
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 70 + 10;
        setStars(prev => [...prev, { id: nextId, x, y, letter: key }]);
        setNextId(prev => prev + 1);

        setTimeout(() => {
          setStars(prev => prev.filter(s => s.id !== nextId));
        }, 1000);

        generateNewLetter();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentLetter, nextId]);

  const generateNewLetter = () => {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    setCurrentLetter(randomLetter);
  };

  const getFingerInfo = (letter: string) => {
    const fingerMap: { [key: string]: { hand: string; finger: string } } = {
      'Q': { hand: 'Left', finger: 'Pinky' },
      'A': { hand: 'Left', finger: 'Pinky' },
      'Z': { hand: 'Left', finger: 'Pinky' },
      'W': { hand: 'Left', finger: 'Ring' },
      'S': { hand: 'Left', finger: 'Ring' },
      'X': { hand: 'Left', finger: 'Ring' },
      'E': { hand: 'Left', finger: 'Middle' },
      'D': { hand: 'Left', finger: 'Middle' },
      'C': { hand: 'Left', finger: 'Middle' },
      'R': { hand: 'Left', finger: 'Index' },
      'F': { hand: 'Left', finger: 'Index' },
      'V': { hand: 'Left', finger: 'Index' },
      'T': { hand: 'Left', finger: 'Index' },
      'G': { hand: 'Left', finger: 'Index' },
      'B': { hand: 'Left', finger: 'Index' },
      'Y': { hand: 'Right', finger: 'Index' },
      'H': { hand: 'Right', finger: 'Index' },
      'N': { hand: 'Right', finger: 'Index' },
      'U': { hand: 'Right', finger: 'Index' },
      'J': { hand: 'Right', finger: 'Index' },
      'M': { hand: 'Right', finger: 'Index' },
      'I': { hand: 'Right', finger: 'Middle' },
      'K': { hand: 'Right', finger: 'Middle' },
      'O': { hand: 'Right', finger: 'Ring' },
      'L': { hand: 'Right', finger: 'Ring' },
      'P': { hand: 'Right', finger: 'Pinky' }
    };
    return fingerMap[letter] || { hand: 'Right', finger: 'Pinky' };
  };

  const fingerInfo = getFingerInfo(currentLetter);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Letters Typed: <span className="text-green-600">{score}</span>
        </div>
        <div className="text-3xl font-bold text-gray-700">
          Time: <span className="text-blue-600">{timeLeft}s</span>
        </div>
      </div>

      <div className="mb-8 bg-yellow-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          ⌨️ Type the letter to collect stars!
        </p>
        <p className="text-xl text-center text-gray-600 mb-4">
          Look at the big letter and find it on your keyboard
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-lg font-bold text-center">
              {fingerInfo.hand === 'Left' ? '🤚' : '✋'} {fingerInfo.hand} Hand
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-lg">
            <p className="text-lg font-bold text-center text-orange-600">
              👆 {fingerInfo.finger} Finger
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-[400px] overflow-hidden mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full w-64 h-64 flex items-center justify-center shadow-2xl animate-pulse">
            <div className="text-9xl font-bold text-white">
              {currentLetter}
            </div>
          </div>
        </div>

        {stars.map(star => (
          <div
            key={star.id}
            className="absolute animate-bounce"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: 'fadeOut 1s ease-out'
            }}
          >
            <div className="text-6xl">⭐</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-13 gap-1 bg-gray-200 p-4 rounded-2xl">
        {letters.map(letter => (
          <div
            key={letter}
            className={`aspect-square rounded flex items-center justify-center text-sm font-bold transition-all duration-200 ${
              letter === currentLetter
                ? 'bg-gradient-to-br from-yellow-300 to-orange-400 text-white scale-110'
                : 'bg-white text-gray-700'
            }`}
          >
            {letter}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </div>
  );
}
