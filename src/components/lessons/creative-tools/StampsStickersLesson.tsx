import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Sticker } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface StampsStickersLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function StampsStickersLesson({ onBack, onComplete }: StampsStickersLessonProps) {
  const [step, setStep] = useState(0);
  const [placedStickers, setPlacedStickers] = useState<{emoji: string, x: number, y: number, size: number}[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const stickers = ['🦁', '🐘', '🦒', '🌴', '🌺', '🦜', '🐍', '🦋', '☀️', '⭐'];

  const handlePlaceSticker = (emoji: string) => {
    const canvas = document.getElementById('sticker-canvas');
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.random() * (rect.width - 80);
    const y = Math.random() * (rect.height - 80);
    const size = 40 + Math.random() * 40;

    setPlacedStickers([...placedStickers, { emoji, x, y, size }]);

    if (placedStickers.length + 1 >= 5 && step === 1) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const instructions = [
    "Stickers decorate your digital artwork! You can drag and place them anywhere.",
    "Create a jungle scene! Click stickers to add them to your canvas. Add at least 5!",
    "Beautiful jungle scene! You're a sticker artist!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-fuchsia-100 to-pink-100">
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

        <div className="bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Stamps and Stickers</h1>
          <p className="text-2xl text-white opacity-90">Decorate with fun stickers!</p>
        </div>

        {step >= 1 && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-3">
              <div
                id="sticker-canvas"
                className="relative bg-gradient-to-br from-green-200 to-lime-100 rounded-3xl shadow-2xl border-8 border-white overflow-hidden"
                style={{ height: '500px' }}
              >
                {placedStickers.map((sticker, index) => (
                  <div
                    key={index}
                    className="absolute cursor-move transition-transform hover:scale-110"
                    style={{
                      left: `${sticker.x}px`,
                      top: `${sticker.y}px`,
                      fontSize: `${sticker.size}px`
                    }}
                  >
                    {sticker.emoji}
                  </div>
                ))}

                {placedStickers.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl text-gray-500 font-bold">Click stickers to add them here!</p>
                  </div>
                )}
              </div>
              <p className="text-center text-2xl font-bold text-gray-700 mt-4">
                Stickers placed: {placedStickers.length} / 5
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Sticker className="w-8 h-8 text-fuchsia-500" />
                <h3 className="text-2xl font-bold text-gray-800">Stickers</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stickers.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handlePlaceSticker(emoji)}
                    className="text-5xl p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl hover:from-fuchsia-100 hover:to-pink-100 transition-all transform hover:scale-110 border-2 border-fuchsia-200"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
            disabled={step === 1 && placedStickers.length < 5}
            className="bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Creating' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Add 5 Stickers!'}
          </button>
        </div>
      </div>
    </div>
  );
}
