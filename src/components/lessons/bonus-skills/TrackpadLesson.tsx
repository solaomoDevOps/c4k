import { useState } from 'react';
import { Lightbulb, CheckCircle2, Move } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface TrackpadLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface TreasureItem {
  id: number;
  x: number;
  y: number;
  emoji: string;
  placed: boolean;
  color: string;
}

export default function TrackpadLesson({ onBack, onComplete }: TrackpadLessonProps) {
  const [step, setStep] = useState(0);
  const [treasures, setTreasures] = useState<TreasureItem[]>([
    { id: 1, x: 100, y: 100, emoji: '💎', placed: false, color: 'bg-purple-400' },
    { id: 2, x: 150, y: 200, emoji: '🪙', placed: false, color: 'bg-yellow-400' },
    { id: 3, x: 250, y: 150, emoji: '⭐', placed: false, color: 'bg-blue-400' },
    { id: 4, x: 300, y: 250, emoji: '🔮', placed: false, color: 'bg-pink-400' },
    { id: 5, x: 200, y: 300, emoji: '👑', placed: false, color: 'bg-amber-400' },
  ]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [completedCount, setCompletedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastGesture, setLastGesture] = useState('');

  const instructions = [
    "Trackpads let you move your finger to control the cursor. Let's master trackpad gestures!",
    "Move all 5 treasures to their target zones using trackpad drag gestures!",
    "Perfect! You've mastered trackpad treasure hunting!"
  ];

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    setDraggedId(id);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedId === null) return;

    const treasure = treasures.find(t => t.id === draggedId);
    if (treasure) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setTreasures(prev => prev.map(t =>
        t.id === draggedId
          ? { ...t, x: t.x + deltaX, y: t.y + deltaY }
          : t
      ));

      setDragStart({ x: e.clientX, y: e.clientY });
      setLastGesture('Dragging...');
    }
  };

  const handleMouseUp = () => {
    if (draggedId === null) return;

    const treasure = treasures.find(t => t.id === draggedId);
    if (treasure) {
      const distance = Math.sqrt(
        Math.pow(treasure.x - 500, 2) + Math.pow(treasure.y - 300, 2)
      );

      if (distance < 80) {
        setTreasures(prev => prev.map(t =>
          t.id === draggedId
            ? { ...t, placed: true, x: 500, y: 300 }
            : t
        ));
        setCompletedCount(prev => {
          const newCount = prev + 1;
          if (newCount === 5) {
            setShowConfetti(true);
            setTimeout(() => setStep(2), 1500);
          }
          return newCount;
        });
      }
      setLastGesture('');
    }

    setDraggedId(null);
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
          <h1 className="text-5xl font-bold text-white mb-2">Trackpad Mastery</h1>
          <p className="text-2xl text-white opacity-90">Learn to control movement with trackpad gestures!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Move className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Trackpad Gestures</h2>
                <p className="text-2xl text-gray-700">
                  Your laptop trackpad is like a mini touch screen! You can use it to move things around.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-blue-400">
                <div className="text-6xl mb-3">👆</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">One-Finger Tap</h3>
                <p className="text-gray-700">Click once on trackpad</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <div className="text-6xl mb-3">👌</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Two-Finger Scroll</h3>
                <p className="text-gray-700">Slide two fingers up/down</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-purple-400">
                <div className="text-6xl mb-3">🎯</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Click & Drag</h3>
                <p className="text-gray-700">Move finger while pressing</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Start Treasure Hunt! 🏴‍☠️
            </button>
          </div>
        )}

        {/* Step 1: Game */}
        {step === 1 && (
          <div
            className="bg-white rounded-3xl p-8 shadow-2xl mb-8"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Trackpad Treasure Hunt!</h2>
              <p className="text-2xl text-gray-600">Treasures found: {completedCount} / 5</p>
              {lastGesture && (
                <p className="text-3xl font-bold text-yellow-600 animate-pulse mt-4">{lastGesture}</p>
              )}
            </div>

            {/* Game Board */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl relative h-96 mb-8 border-4 border-amber-400 overflow-hidden">
              {/* Target zone in center */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-300 rounded-full opacity-30 border-4 border-green-500 border-dashed flex items-center justify-center">
                <span className="text-5xl">🎁</span>
              </div>

              {/* Treasures */}
              {treasures.map(treasure => (
                <div
                  key={treasure.id}
                  onMouseDown={(e) => handleMouseDown(treasure.id, e)}
                  className={`absolute text-5xl cursor-grab active:cursor-grabbing transition-all ${
                    treasure.placed
                      ? 'opacity-50 pointer-events-none'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${treasure.x}px`,
                    top: `${treasure.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: draggedId === treasure.id ? 100 : 10,
                  }}
                >
                  {treasure.emoji}
                  {treasure.placed && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-green-600">
                      ✓
                    </div>
                  )}
                </div>
              ))}

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-bold">Drag treasures to the green zone!</p>
                <p>Click & hold, then drag to move</p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-yellow-400">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Treasures Collected:</h3>
              <div className="grid grid-cols-5 gap-3">
                {treasures.map((treasure, idx) => (
                  <div
                    key={treasure.id}
                    className={`h-16 rounded-lg flex items-center justify-center text-3xl border-4 transition-all ${
                      treasure.placed
                        ? 'bg-green-400 border-green-600'
                        : 'bg-gray-200 border-gray-400'
                    }`}
                  >
                    {treasure.emoji}
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
            <h2 className="text-5xl font-bold text-green-600 mb-4">Treasure Hunt Complete!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You successfully moved all 5 treasures using trackpad gestures!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <p className="text-2xl text-green-800 mb-4">👆 Tap - Quick press on trackpad</p>
              <p className="text-2xl text-green-800 mb-4">👌 Two-Finger Scroll - Slide two fingers</p>
              <p className="text-2xl text-green-800">🎯 Click & Drag - Move while pressing</p>
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
