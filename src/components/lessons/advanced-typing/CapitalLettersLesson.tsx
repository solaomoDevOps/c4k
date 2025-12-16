import { useState, useEffect } from 'react';
import { ArrowUp, CheckCircle, Star } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import Confetti from '../../Confetti';

interface CapitalLettersLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function CapitalLettersLesson({ onBack, onComplete }: CapitalLettersLessonProps) {
  const [step, setStep] = useState<'intro' | 'practice' | 'names' | 'complete'>('intro');
  const [currentWord, setCurrentWord] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [score, setScore] = useState(0);

  const practiceWords = [
    { word: 'Hello', hint: 'Start with capital H' },
    { word: 'World', hint: 'Start with capital W' },
    { word: 'Computer', hint: 'Start with capital C' },
  ];

  const names = [
    { name: 'Tom', hint: 'A boy\'s name' },
    { name: 'Sarah', hint: 'A girl\'s name' },
    { name: 'Max', hint: 'A boy\'s name' },
    { name: 'Lily', hint: 'A girl\'s name' },
  ];

  const currentTarget = step === 'practice'
    ? practiceWords[currentWord]?.word
    : names[currentWord]?.name;

  const currentHint = step === 'practice'
    ? practiceWords[currentWord]?.hint
    : names[currentWord]?.hint;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (step !== 'practice' && step !== 'names') return;

      if (e.key === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTypedText(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step]);

  useEffect(() => {
    if (!currentTarget) return;

    if (typedText === currentTarget) {
      setScore(score + 1);
      setShowGoodJob(true);
    }
  }, [typedText, currentTarget, score]);

  const handleContinue = () => {
    setShowGoodJob(false);
    setTypedText('');
    const maxWords = step === 'practice' ? practiceWords.length : names.length;

    if (currentWord < maxWords - 1) {
      setCurrentWord(currentWord + 1);
    } else {
      if (step === 'practice') {
        setCurrentWord(0);
        setStep('names');
      } else {
        setShowConfetti(true);
        setStep('complete');
        setTimeout(onComplete, 3000);
      }
    }
  };

  const getProgress = () => {
    if (step === 'intro') return 0;
    if (step === 'practice') return 33;
    if (step === 'names') return 66;
    return 100;
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Capital Letters"
        instructions="Make BIG letters with the Shift key!"
        voiceIntro="Let's learn to make capital letters with the Shift key!"
        onBack={onBack}
        progress={getProgress()}
        showMascot={true}
        mascotMessage={step === 'intro' ? 'Hold Shift and press a letter!' : currentHint}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <ArrowUp className="w-32 h-32 text-blue-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">The Shift Key</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                  The Shift key makes letters CAPITAL (big)!
                  Hold down Shift and press a letter to make it capital.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-12 max-w-2xl">
                <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">How to Use Shift:</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <span className="text-4xl font-bold">1</span>
                    </div>
                    <p className="text-2xl text-blue-900">Hold down the Shift key</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <span className="text-4xl font-bold">2</span>
                    </div>
                    <p className="text-2xl text-blue-900">Press a letter (like "h")</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <span className="text-4xl font-bold">3</span>
                    </div>
                    <p className="text-2xl text-blue-900">You get a capital "H"!</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('practice')}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Let's Practice!
              </button>
            </>
          )}

          {(step === 'practice' || step === 'names') && showGoodJob && (
            <div className="text-center animate-fade-in">
              <div className="text-9xl mb-6">🎉</div>
              <h2 className="text-6xl font-bold text-green-600 mb-4">Good Job!</h2>
              <p className="text-3xl text-gray-700 font-semibold mb-8">
                You typed it correctly!
              </p>
              <button
                onClick={handleContinue}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Continue
              </button>
            </div>
          )}

          {(step === 'practice' || step === 'names') && !showGoodJob && currentTarget && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">
                  {step === 'practice' ? 'Practice Words' : 'Type Names'}
                </h2>
                <p className="text-2xl text-gray-700">{currentHint}</p>
              </div>

              {/* Target Word */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 mb-4">
                <p className="text-6xl font-bold text-gray-800 text-center tracking-wider">
                  {currentTarget}
                </p>
              </div>

              {/* Typed Text */}
              <div className="bg-white border-8 border-blue-400 rounded-3xl p-8 min-w-[600px] min-h-[120px] flex items-center justify-center shadow-2xl">
                <p className="text-6xl font-bold text-blue-600 tracking-wider">
                  {typedText || <span className="text-gray-300 animate-pulse">|</span>}
                </p>
              </div>

              {/* Visual Shift Key Reminder */}
              <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 flex items-center gap-4">
                <ArrowUp className="w-12 h-12 text-yellow-700" />
                <p className="text-2xl font-bold text-yellow-800">
                  Remember: Hold Shift for capital letters!
                </p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-gray-700">
                  Score: {score}
                </span>
              </div>
            </>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Excellent Work!</h2>
              <p className="text-3xl text-gray-700 mb-4">
                You typed {score} words with capital letters!
              </p>
              <p className="text-2xl text-gray-600">
                Now you know how to use the Shift key!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
