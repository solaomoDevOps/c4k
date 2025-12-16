import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Delete } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface BackspaceDeleteLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function BackspaceDeleteLesson({ onBack, onComplete }: BackspaceDeleteLessonProps) {
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [fixedWords, setFixedWords] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const sillyWords = [
    { wrong: 'caaaat', correct: 'cat' },
    { wrong: 'dooog', correct: 'dog' },
    { wrong: 'suuun', correct: 'sun' },
    { wrong: 'treee', correct: 'tree' },
    { wrong: 'boook', correct: 'book' }
  ];

  const currentIndex = fixedWords;
  const currentSillyWord = sillyWords[currentIndex];

  const handleInputChange = (value: string) => {
    setCurrentWord(value);

    if (value === currentSillyWord?.correct) {
      const newFixed = fixedWords + 1;
      setFixedWords(newFixed);
      setCurrentWord('');

      if (newFixed === sillyWords.length && step === 1) {
        setShowConfetti(true);
        setTimeout(() => setStep(2), 1000);
      }
    }
  };

  const instructions = [
    "Backspace removes the letter behind your cursor. Delete removes the letter in front. Let's fix mistakes!",
    "Clean Up the Silly Words! Remove extra letters to fix each word. Use Backspace or Delete!",
    "Perfect editing! You fixed all the silly words!"
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
          <h1 className="text-5xl font-bold text-white mb-2">Backspace and Delete</h1>
          <p className="text-2xl text-white opacity-90">Fix mistakes safely!</p>
        </div>

        {step >= 1 && currentIndex < sillyWords.length && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <p className="text-center text-2xl font-bold text-gray-600 mb-8">
              Word {currentIndex + 1} of {sillyWords.length}
            </p>

            <div className="bg-red-50 rounded-2xl p-8 mb-6 border-4 border-red-300">
              <p className="text-center text-xl text-gray-600 mb-2">Silly Word:</p>
              <p className="text-6xl font-bold text-red-600 text-center line-through">
                {currentSillyWord.wrong}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8 mb-6 border-4 border-green-300">
              <p className="text-center text-xl text-gray-600 mb-2">Fix it here:</p>
              <input
                type="text"
                value={currentWord}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type the correct word..."
                autoFocus
                className="w-full text-6xl font-bold text-center px-4 py-6 rounded-xl border-4 border-green-400 focus:border-green-600 outline-none bg-white"
              />
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-300">
              <p className="text-center text-xl font-bold text-blue-800 mb-3">
                💡 Hint: The correct word is "{currentSillyWord.correct}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-white rounded-xl p-4 border-2 border-gray-300">
                  <Delete className="w-8 h-8 text-gray-600 mb-2 mx-auto" />
                  <p className="text-lg font-bold">Backspace Key</p>
                  <p className="text-sm text-gray-600">Removes left</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-gray-300">
                  <Delete className="w-8 h-8 text-gray-600 mb-2 mx-auto" />
                  <p className="text-lg font-bold">Delete Key</p>
                  <p className="text-sm text-gray-600">Removes right</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-green-600">
                ✓ Fixed: {fixedWords}
              </p>
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
            disabled={step === 1 && fixedWords < sillyWords.length}
            className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Fixing' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Fix All Words!'}
          </button>
        </div>
      </div>
    </div>
  );
}
