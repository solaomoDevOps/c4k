import { useState } from 'react';
import { Smartphone, CheckCircle2, Hand } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface TouchScreensLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface FlowerElement {
  id: number;
  x: number;
  y: number;
  emoji: string;
  tapped: boolean;
  revealed: boolean;
  scale: number;
}

export default function TouchScreensLesson({ onBack, onComplete }: TouchScreensLessonProps) {
  const [step, setStep] = useState(0);
  const [flowers, setFlowers] = useState<FlowerElement[]>([
    { id: 1, x: 20, y: 20, emoji: '🌸', tapped: false, revealed: false, scale: 1 },
    { id: 2, x: 80, y: 20, emoji: '🌻', tapped: false, revealed: false, scale: 1 },
    { id: 3, x: 50, y: 50, emoji: '🌷', tapped: false, revealed: false, scale: 1 },
    { id: 4, x: 20, y: 80, emoji: '🌹', tapped: false, revealed: false, scale: 1 },
    { id: 5, x: 80, y: 80, emoji: '🌼', tapped: false, revealed: false, scale: 1 },
  ]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastGesture, setLastGesture] = useState('');

  const instructions = [
    "Touch screens respond to your fingers! Let's learn the different gestures.",
    "Complete the garden challenges! Tap flowers, swipe to reveal, and zoom to explore.",
    "Beautiful garden! You've mastered touch screen gestures!"
  ];

  const tasks = [
    { name: 'Tap to Wake', description: 'Tap 3 flowers to wake them up!', type: 'tap', count: 0 },
    { name: 'Swipe to Reveal', description: 'Swipe left on flowers to reveal hidden treasures!', type: 'swipe', count: 0 },
    { name: 'Pinch to Zoom', description: 'Use pinch gesture to zoom in and find details!', type: 'pinch', count: 0 },
  ];

  const handleFlowerTap = (id: number) => {
    setFlowers(prev => prev.map(f =>
      f.id === id ? { ...f, tapped: true, scale: 1.2 } : f
    ));
    setLastGesture('Tap!');
    setCompletedTasks(prev => prev + 1);

    setTimeout(() => {
      setFlowers(prev => prev.map(f =>
        f.id === id ? { ...f, scale: 1 } : f
      ));
    }, 300);

    if (completedTasks + 1 >= 5) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1500);
    }
  };

  const handleSwipe = (id: number) => {
    setFlowers(prev => prev.map(f =>
      f.id === id ? { ...f, revealed: true } : f
    ));
    setLastGesture('Swipe!');
    setCompletedTasks(prev => prev + 1);

    if (completedTasks + 1 >= 5) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1500);
    }
  };

  const handlePinch = (id: number) => {
    setFlowers(prev => prev.map(f =>
      f.id === id ? { ...f, scale: 1.5 } : f
    ));
    setLastGesture('Pinch!');
    setCompletedTasks(prev => prev + 1);

    setTimeout(() => {
      setFlowers(prev => prev.map(f =>
        f.id === id ? { ...f, scale: 1 } : f
      ));
    }, 500);

    if (completedTasks + 1 >= 5) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1500);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-amber-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Touch Screen Gestures</h1>
          <p className="text-2xl text-white opacity-90">Learn to interact with screens using your fingers!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Smartphone className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Touch Screen Basics</h2>
                <p className="text-2xl text-gray-700">
                  Screens respond to touch! There are different ways to touch and interact.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-blue-400">
                <div className="text-6xl mb-3">👆</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Tap</h3>
                <p className="text-gray-700">Quick touch with one finger</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <div className="text-6xl mb-3">👉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Swipe</h3>
                <p className="text-gray-700">Drag your finger across</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-purple-400">
                <div className="text-6xl mb-3">✌️</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Pinch</h3>
                <p className="text-gray-700">Two fingers moving together</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Touch the Magic Garden! 🌸
            </button>
          </div>
        )}

        {/* Step 1: Game */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Touch the Magic Garden!</h2>
              <p className="text-2xl text-gray-600">Actions completed: {completedTasks} / 5</p>
              {lastGesture && (
                <p className="text-3xl font-bold text-yellow-600 animate-bounce mt-4">{lastGesture}</p>
              )}
            </div>

            {/* Garden */}
            <div className="bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl p-8 mb-8 relative h-96 border-4 border-green-500 overflow-hidden">
              {flowers.map(flower => (
                <div
                  key={flower.id}
                  className="absolute cursor-pointer transition-all duration-200 group"
                  style={{
                    left: `${flower.x}%`,
                    top: `${flower.y}%`,
                    transform: `translate(-50%, -50%) scale(${flower.scale})`
                  }}
                >
                  {/* Main flower display */}
                  <div
                    onClick={() => handleFlowerTap(flower.id)}
                    className="text-6xl hover:scale-110 transition-transform relative"
                  >
                    {flower.emoji}
                  </div>

                  {/* Tap indicator */}
                  {flower.tapped && (
                    <div className="absolute inset-0 text-xl font-bold text-blue-600 animate-pulse flex items-center justify-center">
                      ✓
                    </div>
                  )}

                  {/* Swipe area */}
                  <div
                    onMouseDown={(e) => {
                      const startX = e.clientX;
                      const handleMouseMove = (moveEvent: MouseEvent) => {
                        if (moveEvent.clientX < startX - 20) {
                          handleSwipe(flower.id);
                          document.removeEventListener('mousemove', handleMouseMove);
                        }
                      };
                      document.addEventListener('mousemove', handleMouseMove);
                      setTimeout(() => document.removeEventListener('mousemove', handleMouseMove), 500);
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  />

                  {/* Pinch trigger (double click simulation) */}
                  <div
                    onDoubleClick={() => handlePinch(flower.id)}
                    className="absolute inset-0 cursor-pointer"
                  />

                  {/* Revealed item */}
                  {flower.revealed && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">
                      💎
                    </div>
                  )}
                </div>
              ))}

              {/* Instructions overlay */}
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 text-sm text-gray-700">
                <p>👆 Click to tap</p>
                <p>👉 Click & drag left to swipe</p>
                <p>✌️ Double-click to pinch</p>
              </div>
            </div>

            {/* Task Status */}
            <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-yellow-400">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Interactive Elements:</h3>
              <div className="grid grid-cols-5 gap-2">
                {flowers.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                      idx < completedTasks
                        ? 'bg-green-400 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {idx < completedTasks ? '✓' : idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-green-600 mb-4">Magic Garden Complete!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You've interacted with all 5 flowers using different touch gestures!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <p className="text-2xl text-green-800 mb-4">🌸 Tap - Quick touches</p>
              <p className="text-2xl text-green-800 mb-4">👉 Swipe - Drag your finger</p>
              <p className="text-2xl text-green-800">✌️ Pinch - Two fingers together</p>
            </div>

            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Complete Lesson ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
