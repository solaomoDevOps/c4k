import { useState } from 'react';
import { Power, CheckCircle, AlertCircle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface PowerButtonLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'power-on' | 'shutdown' | 'quiz' | 'complete';

export default function PowerButtonLesson({ onBack, onComplete }: PowerButtonLessonProps) {
  const [step, setStep] = useState<Step>('intro');
  const [stepHistory, setStepHistory] = useState<Step[]>(['intro']);
  const [computerOn, setComputerOn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);

  const navigateToStep = (newStep: Step) => {
    setStep(newStep);
    setStepHistory([...stepHistory, newStep]);
  };

  const handlePowerOn = () => {
    setComputerOn(true);
    setTimeout(() => navigateToStep('shutdown'), 2000);
  };

  const handleShutdown = () => {
    setComputerOn(false);
    setTimeout(() => navigateToStep('quiz'), 2000);
  };

  const handleQuiz = (answer: boolean) => {
    setQuizAnswer(answer);
    if (!answer) {
      setTimeout(() => {
        navigateToStep('complete');
        setShowConfetti(true);
        setTimeout(onComplete, 3000);
      }, 2000);
    } else {
      setTimeout(() => setQuizAnswer(null), 2000);
    }
  };

  const getProgress = () => {
    switch (step) {
      case 'intro': return 0;
      case 'power-on': return 33;
      case 'shutdown': return 66;
      case 'quiz': return 90;
      case 'complete': return 100;
      default: return 0;
    }
  };

  const handleBackClick = () => {
    if (stepHistory.length <= 1) {
      onBack();
    } else {
      const newHistory = [...stepHistory];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setStep(previousStep);
      if (previousStep === 'intro') {
        setComputerOn(false);
        setQuizAnswer(null);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Turning On & Off"
        instructions="Learn the right way to start and stop your computer"
        voiceIntro="Let's learn how to turn the computer on and off safely!"
        onBack={onBack}
        handleBack={handleBackClick}
        progress={getProgress()}
        showMascot={true}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Power Button</h2>
                <p className="text-2xl text-gray-700">
                  The power button turns your computer on and off safely.
                </p>
              </div>
              <VoiceButton
                onClick={() => navigateToStep('power-on')}
                voiceText="Start the lesson"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Start Lesson
              </VoiceButton>
            </>
          )}

          {step === 'power-on' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Turning On</h2>
                <p className="text-2xl text-gray-700">
                  Press the power button to turn on the computer!
                </p>
              </div>

              <div className={`relative transition-all duration-1000 ${computerOn ? 'opacity-100' : 'opacity-50'}`}>
                <div className="w-96 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center relative">
                  {computerOn && (
                    <div className="animate-fade-in">
                      <div className="text-8xl">💻</div>
                    </div>
                  )}
                  {!computerOn && <div className="text-6xl opacity-30">💻</div>}
                </div>

                <VoiceButton
                  onClick={handlePowerOn}
                  disabled={computerOn}
                  voiceText="Press the power button"
                  className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 ${
                    computerOn ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white p-6 rounded-full shadow-2xl transition-all duration-300 disabled:cursor-not-allowed`}
                >
                  <Power className="w-12 h-12" />
                </VoiceButton>
              </div>
            </>
          )}

          {step === 'shutdown' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Shutting Down</h2>
                <p className="text-2xl text-gray-700">
                  Always shut down properly using the power button or shutdown menu!
                </p>
              </div>

              <div className="relative">
                <div className="w-96 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-8xl">💻</div>
                </div>

                <VoiceButton
                  onClick={handleShutdown}
                  voiceText="Shut down the computer"
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-full shadow-2xl transition-all duration-300"
                >
                  <Power className="w-12 h-12" />
                </VoiceButton>
              </div>
            </>
          )}

          {step === 'quiz' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Quick Quiz!</h2>
                <p className="text-3xl text-gray-700 font-semibold mb-8">
                  Should you turn off a computer by pulling the plug?
                </p>
              </div>

              {quizAnswer === null ? (
                <div className="flex gap-8">
                  <VoiceButton
                    onClick={() => handleQuiz(true)}
                    voiceText="Yes"
                    className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-3xl font-bold py-8 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    Yes
                  </VoiceButton>
                  <VoiceButton
                    onClick={() => handleQuiz(false)}
                    voiceText="No"
                    className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-3xl font-bold py-8 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    No
                  </VoiceButton>
                </div>
              ) : quizAnswer ? (
                <div className="bg-red-100 border-4 border-red-500 rounded-3xl p-8 animate-fade-in">
                  <div className="flex items-center gap-4 text-red-700">
                    <AlertCircle className="w-12 h-12" />
                    <p className="text-2xl font-bold">
                      Not quite! Always use the proper shutdown button.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-100 border-4 border-green-500 rounded-3xl p-8 animate-fade-in">
                  <div className="flex items-center gap-4 text-green-700">
                    <CheckCircle className="w-12 h-12" />
                    <p className="text-2xl font-bold">
                      Correct! Always shut down properly to protect your computer!
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
