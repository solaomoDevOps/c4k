import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface ScrollbarLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ScrollbarLesson({ onBack, onComplete }: ScrollbarLessonProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [foundAnimals, setFoundAnimals] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const animals = ['🦁 Lion', '🐘 Elephant', '🦒 Giraffe', '🦓 Zebra', '🐒 Monkey'];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercent = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setScrollPosition(scrollPercent);

    // Check for found animals
    const newFoundAnimals = animals.filter((_, index) => {
      const animalPosition = (index / (animals.length - 1)) * 100;
      return scrollPercent >= animalPosition - 10;
    });

    if (newFoundAnimals.length > foundAnimals.length) {
      setFoundAnimals(newFoundAnimals);
    }

    if (newFoundAnimals.length === animals.length && step === 1 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const instructions = [
    "Scrolling lets you move the page up and down, like lowering or raising a magic curtain!",
    "Scroll down to find all the hidden animals! Use your mouse wheel or drag the scrollbar.",
    "Amazing! You found all the animals! You're a scrolling master!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-teal-100 to-cyan-100">
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

        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Using Scrollbars</h1>
          <p className="text-2xl text-white opacity-90">Scroll to reveal more content!</p>
        </div>

        {/* Scrollable Demo */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              Animals Found: {foundAnimals.length} / {animals.length}
            </p>
            {step === 0 && (
              <div className="animate-bounce mt-4">
                <ChevronDown className="w-12 h-12 text-teal-500 mx-auto" />
                <p className="text-xl text-teal-600 font-bold">Scroll Down!</p>
              </div>
            )}
          </div>

          {/* Scrollable Area */}
          <div
            onScroll={handleScroll}
            className="h-[400px] overflow-y-scroll border-4 border-teal-300 rounded-2xl p-8 bg-gradient-to-b from-blue-50 to-green-50"
            style={{
              scrollbarWidth: 'thick',
              scrollbarColor: '#14b8a6 #f0fdfa'
            }}
          >
            {animals.map((animal, index) => (
              <div
                key={index}
                className={`mb-32 last:mb-8 text-center transition-all duration-500 ${
                  foundAnimals.includes(animal) ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                }`}
              >
                <div className="text-8xl mb-4">{animal.split(' ')[0]}</div>
                <p className="text-4xl font-bold text-gray-800">{animal.split(' ')[1]}</p>
                {foundAnimals.includes(animal) && (
                  <div className="mt-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

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
            disabled={step === 1 && foundAnimals.length < animals.length}
            className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Practice' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Find All Animals!'}
          </button>
        </div>
      </div>
    </div>
  );
}
