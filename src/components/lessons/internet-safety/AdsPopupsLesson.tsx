import { useState } from 'react';
import { X, AlertCircle, CheckCircle, Award } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface AdsPopupsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function AdsPopupsLesson({ onBack, onComplete }: AdsPopupsLessonProps) {
  const [step, setStep] = useState<'intro' | 'practice' | 'game' | 'complete'>('intro');
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupsBlocked, setPopupsBlocked] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startGame = () => {
    setGameActive(true);
    setPopupsBlocked(0);
    setTimeLeft(30);
    setShowPopup(true);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          setShowPopup(false);
          setShowConfetti(true);
          setTimeout(() => {
            setStep('complete');
            setTimeout(onComplete, 2000);
          }, 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClosePopup = (correct: boolean) => {
    if (correct) {
      setPopupsBlocked(popupsBlocked + 1);
      setScore(score + 10);
    }

    setShowPopup(false);

    if (gameActive && timeLeft > 0) {
      setTimeout(() => {
        setShowPopup(true);
      }, 1500);
    }
  };

  const getProgress = () => {
    if (step === 'intro') return 25;
    if (step === 'practice') return 50;
    if (step === 'game') return 75;
    return 100;
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Ads & Pop-ups"
        instructions="Learn to spot fake buttons and close pop-ups safely"
        voiceIntro="Some buttons on websites try to trick you. Let's learn to spot them!"
        onBack={onBack}
        progress={getProgress()}
        showMascot={true}
        mascotMessage={gameActive ? 'Click the X to close it!' : ''}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <AlertCircle className="w-32 h-32 text-orange-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Watch Out for Tricky Pop-ups!</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Sometimes websites show fake buttons that try to trick you.
                  Always close pop-ups by clicking the X button in the corner!
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 max-w-2xl border-4 border-orange-400">
                <h3 className="text-3xl font-bold text-orange-800 mb-4">Safety Tips:</h3>
                <ul className="space-y-3 text-2xl text-orange-900">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    Look for the X button in the corner
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    Don't click "Download" or "Prize" buttons
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    Ask a parent if you're not sure
                  </li>
                </ul>
              </div>

              <VoiceButton
                onClick={() => setStep('practice')}
                voiceText="Let's practice"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Let's Practice!
              </VoiceButton>
            </>
          )}

          {step === 'practice' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Practice Time!</h2>
                <p className="text-2xl text-gray-700">
                  A pop-up will appear. Close it by clicking the X button!
                </p>
              </div>

              <div className="relative w-full max-w-4xl h-96 bg-gradient-to-br from-sky-200 to-blue-300 rounded-3xl shadow-2xl p-8">
                <div className="text-center mt-20">
                  <div className="text-6xl mb-4">🌐</div>
                  <p className="text-3xl text-gray-700">This is a pretend website</p>
                </div>

                {showPopup && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-md relative shadow-2xl border-4 border-yellow-400">
                      <VoiceButton
                        onClick={() => handleClosePopup(true)}
                        voiceText="Close pop-up"
                        className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-all"
                      >
                        <X className="w-10 h-10 text-white" />
                      </VoiceButton>

                      <div className="text-center">
                        <div className="text-6xl mb-4">🎁</div>
                        <h3 className="text-3xl font-bold text-yellow-600 mb-4">
                          You Won a Prize!
                        </h3>
                        <p className="text-xl text-gray-600 mb-4">
                          (This is a fake pop-up!)
                        </p>
                        <button
                          onClick={() => handleClosePopup(false)}
                          className="bg-yellow-400 text-gray-800 px-8 py-4 rounded-xl text-xl font-bold"
                        >
                          Click Here! (Don't click this!)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {!showPopup && (
                <VoiceButton
                  onClick={() => {
                    setStep('game');
                    startGame();
                  }}
                  voiceText="Start the game"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                >
                  Great! Now Let's Play!
                </VoiceButton>
              )}
            </>
          )}

          {step === 'game' && gameActive && (
            <>
              <div className="flex gap-8 mb-4">
                <div className="bg-blue-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                  <p className="text-xl font-bold">Time: {timeLeft}s</p>
                </div>
                <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                  <p className="text-xl font-bold">Blocked: {popupsBlocked}</p>
                </div>
                <div className="bg-yellow-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                  <p className="text-xl font-bold">Score: {score}</p>
                </div>
              </div>

              <div className="relative w-full max-w-4xl h-96 bg-gradient-to-br from-sky-200 to-blue-300 rounded-3xl shadow-2xl p-8">
                <div className="text-center mt-20">
                  <div className="text-6xl mb-4">🌐</div>
                  <p className="text-2xl text-gray-700">Close all the pop-ups!</p>
                </div>

                {showPopup && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
                    <div
                      className="bg-white rounded-3xl p-8 max-w-md relative shadow-2xl border-4 border-yellow-400"
                      style={{
                        left: `${Math.random() * 20 - 10}%`,
                        top: `${Math.random() * 20 - 10}%`,
                      }}
                    >
                      <VoiceButton
                        onClick={() => handleClosePopup(true)}
                        voiceText="Close"
                        className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-all"
                      >
                        <X className="w-10 h-10 text-white" />
                      </VoiceButton>

                      <div className="text-center">
                        <div className="text-5xl mb-3">🎁</div>
                        <h3 className="text-2xl font-bold text-yellow-600 mb-2">Fake Prize!</h3>
                        <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-xl text-lg font-bold pointer-events-none">
                          Don't Click!
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <Award className="w-32 h-32 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Amazing Work!</h2>
              <p className="text-3xl text-gray-700 mb-4">
                You blocked {popupsBlocked} pop-ups!
              </p>
              <p className="text-2xl text-gray-600">
                You're a pop-up blocking pro!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
