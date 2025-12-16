import { useState, useEffect, useRef } from 'react';

interface MouseMoveGameProps {
  onComplete: (score: number) => void;
  handPreference: 'left' | 'right';
}

export default function MouseMoveGame({ onComplete, handPreference }: MouseMoveGameProps) {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetsHit, setTargetsHit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(targetsHit * 10);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetsHit, onComplete]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });

      const distance = Math.sqrt(
        Math.pow(e.clientX - rect.left - ballPosition.x, 2) +
        Math.pow(e.clientY - rect.top - ballPosition.y, 2)
      );

      if (distance < 80) {
        setTargetsHit(prev => prev + 1);
        setBallPosition({
          x: Math.random() * (rect.width - 100) + 50,
          y: Math.random() * (rect.height - 100) + 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ballPosition]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Targets Hit: <span className="text-pink-600">{targetsHit}</span>
        </div>
        <div className="text-3xl font-bold text-gray-700">
          Time: <span className="text-blue-600">{timeLeft}s</span>
        </div>
      </div>

      <div className="mb-6 bg-blue-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          {handPreference === 'left' ? '🤚' : '✋'} Move your mouse to touch the colorful ball!
        </p>
        <p className="text-xl text-center text-gray-600">
          {handPreference === 'left'
            ? 'Hold your mouse with your left hand and move it around'
            : 'Hold your mouse with your right hand and move it around'}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden"
        style={{ height: '500px' }}
      >
        <div
          className="absolute w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center text-4xl animate-pulse"
          style={{
            left: `${ballPosition.x}px`,
            top: `${ballPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          ⚽
        </div>

        <div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-8 h-8 bg-pink-500 rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
}
