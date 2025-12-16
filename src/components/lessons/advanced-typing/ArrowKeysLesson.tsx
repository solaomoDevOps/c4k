import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ArrowUp, ArrowDown, ArrowRight, ArrowLeftIcon, Star } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface ArrowKeysLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ArrowKeysLesson({ onBack, onComplete }: ArrowKeysLessonProps) {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [stars, setStars] = useState<{x: number, y: number}[]>([
    { x: 2, y: 2 }, { x: 8, y: 3 }, { x: 4, y: 7 }, { x: 9, y: 8 }, { x: 1, y: 9 }
  ]);
  const [collectedStars, setCollectedStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (step !== 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();

        setPosition(prev => {
          let newX = prev.x;
          let newY = prev.y;

          if (e.key === 'ArrowUp') newY = Math.max(0, prev.y - 1);
          if (e.key === 'ArrowDown') newY = Math.min(9, prev.y + 1);
          if (e.key === 'ArrowLeft') newX = Math.max(0, prev.x - 1);
          if (e.key === 'ArrowRight') newX = Math.min(9, prev.x + 1);

          // Check for star collection
          const starIndex = stars.findIndex(s => s.x === newX && s.y === newY);
          if (starIndex !== -1) {
            const newStars = stars.filter((_, i) => i !== starIndex);
            setStars(newStars);
            const newCollected = collectedStars + 1;
            setCollectedStars(newCollected);

            if (newCollected === 5) {
              setShowConfetti(true);
              setTimeout(() => setStep(2), 1000);
            }
          }

          return { x: newX, y: newY };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, stars, collectedStars]);

  const instructions = [
    "Arrow keys help you move things just like a little steering wheel! ↑ ↓ ← →",
    "Arrow Key Maze! Use the arrow keys on your keyboard to move the mascot and collect all 5 stars!",
    "Amazing navigation! You're an arrow key master!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-emerald-100 to-green-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Arrow Keys Navigation</h1>
          <p className="text-2xl text-white opacity-90">Move with the arrow keys!</p>
        </div>

        {step >= 1 && (
          <>
            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
              <p className="text-center text-2xl font-bold text-gray-800 mb-6">
                Stars Collected: {collectedStars} / 5
              </p>

              {/* Game Grid */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 border-8 border-blue-300 mb-6">
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 100 }).map((_, index) => {
                    const x = index % 10;
                    const y = Math.floor(index / 10);
                    const isPlayer = position.x === x && position.y === y;
                    const hasStar = stars.some(s => s.x === x && s.y === y);

                    return (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg flex items-center justify-center text-4xl font-bold transition-all ${
                          isPlayer ? 'bg-blue-500 scale-110' : 'bg-white'
                        }`}
                      >
                        {isPlayer && '🤖'}
                        {hasStar && !isPlayer && <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Arrow Key Guide */}
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2">
                  <div></div>
                  <button className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <ArrowUp className="w-8 h-8" />
                  </button>
                  <div></div>
                  <button className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <ArrowLeftIcon className="w-8 h-8" />
                  </button>
                  <button className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <ArrowDown className="w-8 h-8" />
                  </button>
                  <button className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </div>
              <p className="text-center text-lg text-gray-600 mt-4">
                Use the arrow keys on your keyboard to move!
              </p>
            </div>
          </>
        )}

        {/* Continue/Complete Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (step < 1) {
                setStep(1);
              } else if (step === 2) {
                onComplete();
              }
            }}
            disabled={step === 1 && collectedStars < 5}
            className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Maze' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Collect All Stars!'}
          </button>
        </div>
      </div>
    </div>
  );
}
