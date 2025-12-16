import { useState } from 'react';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface SwitchWindowsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function SwitchWindowsLesson({ onBack, onComplete }: SwitchWindowsLessonProps) {
  const [step, setStep] = useState(0);
  const [activeWindow, setActiveWindow] = useState<'drawing' | 'story' | 'music' | null>('drawing');
  const [foundStar, setFoundStar] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const windows = [
    { id: 'drawing', title: '🎨 Drawing App', color: 'bg-pink-200', hasStar: false },
    { id: 'story', title: '📖 Story App', color: 'bg-blue-200', hasStar: true },
    { id: 'music', title: '🎵 Music App', color: 'bg-green-200', hasStar: false },
  ];

  const handleWindowClick = (windowId: 'drawing' | 'story' | 'music') => {
    setActiveWindow(windowId);
    if (step === 2 && windowId === 'story' && !foundStar) {
      setFoundStar(true);
      setShowConfetti(true);
      setTimeout(() => setStep(3), 1000);
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const instructions = [
    "When you have more than one window open, you can switch to another one—just like choosing which picture book to read!",
    "Click on the top bar of a window to bring it forward. Try clicking different windows!",
    "Now find the Star Window! Click on different windows to find the hidden star ⭐",
    "Great job! You now know how to switch between windows like a pro!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-teal-100 to-cyan-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 3 ? "excited" : "happy"}
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

        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Switching Between Windows</h1>
          <p className="text-2xl text-white opacity-90">Learn to move between open programs!</p>
        </div>

        {/* Interactive Window Demo */}
        <div className="relative h-[500px] bg-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 h-16 flex items-center justify-center gap-4 px-4">
            {windows.map((win) => (
              <button
                key={win.id}
                onClick={() => handleWindowClick(win.id as 'drawing' | 'story' | 'music')}
                className={`${win.color} px-6 py-2 rounded-lg text-lg font-bold transition-all transform hover:scale-110 ${
                  activeWindow === win.id ? 'ring-4 ring-yellow-400' : ''
                }`}
              >
                {win.title}
              </button>
            ))}
          </div>

          {/* Windows */}
          <div className="relative h-full">
            {windows.map((win, index) => (
              <div
                key={win.id}
                onClick={() => step >= 1 && handleWindowClick(win.id as 'drawing' | 'story' | 'music')}
                className={`absolute ${win.color} rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer
                  ${activeWindow === win.id ? 'z-30 scale-100' : 'z-10 scale-95 opacity-70'}
                `}
                style={{
                  width: '450px',
                  height: '350px',
                  left: `${index * 80}px`,
                  top: `${index * 60}px`,
                }}
              >
                {/* Window Title Bar */}
                <div className="bg-white bg-opacity-50 p-4 rounded-t-2xl border-b-4 border-white">
                  <h3 className="text-2xl font-bold">{win.title}</h3>
                </div>

                {/* Window Content */}
                <div className="p-8 flex items-center justify-center h-full">
                  {win.hasStar ? (
                    <div className="text-center">
                      <Star className="w-32 h-32 text-yellow-400 fill-yellow-400 mx-auto mb-4" />
                      <p className="text-3xl font-bold">You found the star!</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-600">
                      <p className="text-2xl">This is the {win.title}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        {(step < 2 || foundStar) && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center gap-3"
            >
              {step === 3 ? (
                <>
                  <CheckCircle2 className="w-8 h-8" />
                  Complete Lesson
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
