import { useState, useEffect } from 'react';

interface DoubleClickGameProps {
  onComplete: (score: number) => void;
}

interface Animal {
  id: number;
  emoji: string;
  name: string;
  sleeping: boolean;
  x: number;
  y: number;
}

export default function DoubleClickGame({ onComplete }: DoubleClickGameProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [nextId, setNextId] = useState(0);

  const animalTypes = [
    { emoji: '🐻', name: 'Bear' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🐰', name: 'Bunny' },
    { emoji: '🦊', name: 'Fox' },
    { emoji: '🐼', name: 'Panda' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals(prev => {
        if (prev.length < 4) {
          const animal = animalTypes[Math.floor(Math.random() * animalTypes.length)];
          return [...prev, {
            id: nextId,
            ...animal,
            sleeping: true,
            x: Math.random() * 70 + 10,
            y: Math.random() * 60 + 10
          }];
        }
        return prev;
      });
      setNextId(prev => prev + 1);
    }, 2000);

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

  const handleAnimalDoubleClick = (id: number) => {
    setAnimals(prev => prev.map(a =>
      a.id === id ? { ...a, sleeping: false } : a
    ));
    setScore(prev => prev + 1);

    setTimeout(() => {
      setAnimals(prev => prev.filter(a => a.id !== id));
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Animals Awake: <span className="text-green-600">{score}</span>
        </div>
        <div className="text-3xl font-bold text-gray-700">
          Time: <span className="text-blue-600">{timeLeft}s</span>
        </div>
      </div>

      <div className="mb-6 bg-green-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          👆👆 Double-click on sleeping animals to wake them up!
        </p>
        <p className="text-xl text-center text-gray-600">
          Click twice quickly on the same animal
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl h-[500px] overflow-hidden">
        {animals.map(animal => (
          <div
            key={animal.id}
            onDoubleClick={() => handleAnimalDoubleClick(animal.id)}
            className={`absolute w-32 h-32 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
              animal.sleeping
                ? 'bg-gradient-to-br from-gray-200 to-gray-400'
                : 'bg-gradient-to-br from-yellow-200 to-yellow-400 animate-bounce'
            }`}
            style={{
              left: `${animal.x}%`,
              top: `${animal.y}%`
            }}
          >
            <div className="text-5xl mb-1">{animal.emoji}</div>
            {animal.sleeping ? (
              <div className="text-3xl">💤</div>
            ) : (
              <div className="text-2xl">😊</div>
            )}
          </div>
        ))}

        {animals.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-3xl text-gray-400">
              Animals are falling asleep...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
