import { useState, useEffect } from 'react';

interface SingleClickGameProps {
  onComplete: (score: number) => void;
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  emoji: string;
  color: string;
}

export default function SingleClickGame({ onComplete }: SingleClickGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [nextId, setNextId] = useState(0);

  const emojis = ['🎈', '🎨', '🌟', '🎁', '🍕', '🍦', '🚀', '🦋'];
  const colors = [
    'from-red-300 to-red-500',
    'from-blue-300 to-blue-500',
    'from-green-300 to-green-500',
    'from-yellow-300 to-yellow-500',
    'from-pink-300 to-pink-500',
    'from-purple-300 to-purple-500'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => {
        if (prev.length < 5) {
          return [...prev, {
            id: nextId,
            x: Math.random() * 80 + 10,
            y: Math.random() * 70 + 10,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            color: colors[Math.floor(Math.random() * colors.length)]
          }];
        }
        return prev;
      });
      setNextId(prev => prev + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [nextId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(score * 10);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, onComplete]);

  const handleBubbleClick = (id: number) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    setScore(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Bubbles Popped: <span className="text-pink-600">{score}</span>
        </div>
        <div className="text-3xl font-bold text-gray-700">
          Time: <span className="text-blue-600">{timeLeft}s</span>
        </div>
      </div>

      <div className="mb-6 bg-pink-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          👆 Click on the bubbles to pop them!
        </p>
        <p className="text-xl text-center text-gray-600">
          Press the left button on your mouse once
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl h-[500px] overflow-hidden">
        {bubbles.map(bubble => (
          <button
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble.id)}
            className={`absolute w-28 h-28 bg-gradient-to-br ${bubble.color} rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-5xl animate-bounce cursor-pointer`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animation: `bounce 1s infinite`
            }}
          >
            {bubble.emoji}
          </button>
        ))}

        {bubbles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-3xl text-gray-400">
              Bubbles are coming...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
