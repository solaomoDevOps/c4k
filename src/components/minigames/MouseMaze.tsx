import { useState, useEffect, useRef } from 'react';
import { Home, Trophy } from 'lucide-react';
import { playSound } from '../../utils/sounds';
import Confetti from '../Confetti';
import Mascot from '../Mascot';

interface MouseMazeProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Position {
  x: number;
  y: number;
}

export default function MouseMaze({ onComplete, onExit }: MouseMazeProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 50 });
  const [goalPos] = useState<Position>({ x: 750, y: 450 });
  const [walls] = useState<Position[]>([
    { x: 200, y: 100 }, { x: 200, y: 200 }, { x: 200, y: 300 },
    { x: 400, y: 200 }, { x: 400, y: 300 }, { x: 400, y: 400 },
    { x: 600, y: 100 }, { x: 600, y: 200 }, { x: 600, y: 300 }
  ]);
  const [completed, setCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (completed) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    const hitWall = walls.some(wall => {
      const distance = Math.sqrt(
        Math.pow(newX - wall.x, 2) + Math.pow(newY - wall.y, 2)
      );
      return distance < 40;
    });

    if (!hitWall) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(prev => prev + 1);
    } else {
      playSound.error();
    }

    const distanceToGoal = Math.sqrt(
      Math.pow(newX - goalPos.x, 2) + Math.pow(newY - goalPos.y, 2)
    );

    if (distanceToGoal < 40 && !completed) {
      setCompleted(true);
      setShowConfetti(true);
      playSound.celebration();
      const score = Math.max(100 - Math.floor(moves / 10), 50);
      setTimeout(() => onComplete(score), 2000);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-cyan-100">
      <Confetti active={showConfetti} />

      <Mascot
        message={completed ? "Amazing! You made it!" : "Guide the star to the trophy!"}
        emotion={completed ? "celebrating" : "encouraging"}
        position="top-left"
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-blue-600">Mouse Maze</h1>
          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-gray-700">Moves: {moves}</span>
            </div>
            <button
              onClick={onExit}
              className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all"
            >
              <Home className="w-8 h-8 text-gray-600" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden cursor-none"
          style={{ width: '900px', height: '600px' }}
        >
          {walls.map((wall, index) => (
            <div
              key={index}
              className="absolute bg-gradient-to-br from-red-400 to-rose-500 rounded-lg"
              style={{
                left: `${wall.x - 30}px`,
                top: `${wall.y - 30}px`,
                width: '60px',
                height: '60px'
              }}
            />
          ))}

          <div
            className="absolute"
            style={{
              left: `${goalPos.x - 30}px`,
              top: `${goalPos.y - 30}px`
            }}
          >
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>

          <div
            className="absolute w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${playerPos.x}px`,
              top: `${playerPos.y}px`
            }}
          >
            <span className="text-2xl">⭐</span>
          </div>

          <div
            className="absolute w-6 h-6 bg-blue-400 rounded-full opacity-50"
            style={{
              left: `${playerPos.x - 12}px`,
              top: `${playerPos.y - 12}px`
            }}
          />
        </div>

        {completed && (
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 shadow-xl inline-block">
              <h2 className="text-4xl font-bold text-white mb-2">Great Job!</h2>
              <p className="text-2xl text-white">You completed the maze!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
