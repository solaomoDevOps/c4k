import { useState } from 'react';
import { Minimize2, Maximize2, X, CheckCircle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface WindowControlLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

type WindowState = 'normal' | 'minimized' | 'maximized' | 'closed';
type Step = 'intro' | 'minimize' | 'maximize' | 'close' | 'complete';

export default function WindowControlLesson({ onBack, onComplete }: WindowControlLessonProps) {
  const [step, setStep] = useState<Step>('intro');
  const [stepHistory, setStepHistory] = useState<Step[]>(['intro']);
  const [windowState, setWindowState] = useState<WindowState>('normal');
  const [showConfetti, setShowConfetti] = useState(false);

  const navigateToStep = (newStep: Step) => {
    setStep(newStep);
    setStepHistory([...stepHistory, newStep]);
  };

  const handleMinimize = () => {
    setWindowState('minimized');
    setTimeout(() => {
      setWindowState('normal');
      navigateToStep('maximize');
    }, 2000);
  };

  const handleMaximize = () => {
    setWindowState('maximized');
    setTimeout(() => {
      setWindowState('normal');
      navigateToStep('close');
    }, 2000);
  };

  const handleClose = () => {
    setWindowState('closed');
    setTimeout(() => {
      setShowConfetti(true);
      navigateToStep('complete');
      setTimeout(onComplete, 3000);
    }, 1000);
  };

  const getProgress = () => {
    switch (step) {
      case 'intro': return 0;
      case 'minimize': return 25;
      case 'maximize': return 50;
      case 'close': return 75;
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
      setWindowState('normal');
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Understanding Windows"
        instructions="Windows are like boxes that hold your programs"
        voiceIntro="Programs open in windows. Let's learn how to control them!"
        onBack={onBack}
        handleBack={handleBackClick}
        progress={getProgress()}
        showMascot={true}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Window Controls</h2>
                <p className="text-2xl text-gray-700 mb-4">
                  Every window has three important buttons:
                </p>
                <div className="flex gap-4 justify-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Minimize2 className="w-4 h-4 text-yellow-800" />
                    </div>
                    <span className="text-xl font-bold">Minimize</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-green-800" />
                    </div>
                    <span className="text-xl font-bold">Maximize</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-red-800" />
                    </div>
                    <span className="text-xl font-bold">Close</span>
                  </div>
                </div>
              </div>

              <VoiceButton
                onClick={() => navigateToStep('minimize')}
                voiceText="Start the lesson"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Start Lesson
              </VoiceButton>
            </>
          )}

          {(step === 'minimize' || step === 'maximize' || step === 'close') && windowState !== 'closed' && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                  {step === 'minimize' && 'Minimize - Hide the window'}
                  {step === 'maximize' && 'Maximize - Make it full screen'}
                  {step === 'close' && 'Close - Exit the program'}
                </h3>
                <p className="text-xl text-gray-700">
                  {step === 'minimize' && 'Click the yellow button to hide the window'}
                  {step === 'maximize' && 'Click the green button to make it bigger'}
                  {step === 'close' && 'Click the red button to close the window'}
                </p>
              </div>

              {/* Mock Window */}
              <div
                className={`bg-white border-4 border-gray-300 rounded-2xl shadow-2xl transition-all duration-500 ${
                  windowState === 'minimized'
                    ? 'scale-0 opacity-0'
                    : windowState === 'maximized'
                    ? 'scale-110'
                    : 'scale-100'
                }`}
                style={{ width: windowState === 'maximized' ? '90%' : '600px', height: windowState === 'maximized' ? '500px' : '400px' }}
              >
                {/* Title Bar */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-t-xl flex items-center justify-between">
                  <span className="text-white font-bold text-xl">My Program</span>
                  <div className="flex gap-2">
                    {step === 'minimize' && (
                      <VoiceButton
                        onClick={handleMinimize}
                        voiceText="Minimize window"
                        className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                      >
                        <Minimize2 className="w-5 h-5 text-yellow-800" />
                      </VoiceButton>
                    )}
                    {step === 'maximize' && (
                      <VoiceButton
                        onClick={handleMaximize}
                        voiceText="Maximize window"
                        className="w-10 h-10 bg-green-400 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                      >
                        <Maximize2 className="w-5 h-5 text-green-800" />
                      </VoiceButton>
                    )}
                    {step === 'close' && (
                      <VoiceButton
                        onClick={handleClose}
                        voiceText="Close window"
                        className="w-10 h-10 bg-red-400 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                      >
                        <X className="w-5 h-5 text-red-800" />
                      </VoiceButton>
                    )}
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-8 flex items-center justify-center h-[calc(100%-60px)]">
                  <div className="text-center">
                    <div className="text-8xl mb-4">🎨</div>
                    <p className="text-2xl text-gray-600">This is a program window!</p>
                  </div>
                </div>
              </div>

              {windowState === 'minimized' && (
                <div className="text-center animate-fade-in">
                  <p className="text-2xl font-bold text-blue-600">
                    The window is now hidden! It's still running in the background.
                  </p>
                </div>
              )}
            </>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-4" />
              <h2 className="text-5xl font-bold text-green-600 mb-4">Excellent!</h2>
              <p className="text-3xl text-gray-700">
                You've mastered window controls!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
