import { useState } from 'react';
import { AppWindow, CheckCircle, X, Maximize2, Minimize2 } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface OpeningClosingProgramsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'opening' | 'closing' | 'practice' | 'quiz' | 'complete';

export default function OpeningClosingProgramsLesson({ onBack, onComplete }: OpeningClosingProgramsLessonProps) {
  const [step, setStep] = useState<Step>('intro');
  const [stepHistory, setStepHistory] = useState<Step[]>(['intro']);
  const [showConfetti, setShowConfetti] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [practicePrograms, setPracticePrograms] = useState<boolean[]>([false, false, false]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const navigateToStep = (newStep: Step) => {
    setStep(newStep);
    setStepHistory([...stepHistory, newStep]);
  };

  const handleOpenProgram = () => {
    setProgramOpen(true);
    setTimeout(() => navigateToStep('closing'), 2000);
  };

  const handleCloseProgram = () => {
    setProgramOpen(false);
    setTimeout(() => navigateToStep('practice'), 2000);
  };

  const handlePracticeOpen = (index: number) => {
    const newPrograms = [...practicePrograms];
    newPrograms[index] = true;
    setPracticePrograms(newPrograms);
  };

  const handlePracticeClose = (index: number) => {
    const newPrograms = [...practicePrograms];
    newPrograms[index] = false;
    setPracticePrograms(newPrograms);
  };

  const handleContinueFromPractice = () => {
    navigateToStep('quiz');
  };

  const handleQuiz = (answer: string) => {
    setQuizAnswer(answer);
    if (answer === 'x-button') {
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
      case 'opening': return 20;
      case 'closing': return 40;
      case 'practice': return 60;
      case 'quiz': return 85;
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
        setProgramOpen(false);
        setPracticePrograms([false, false, false]);
        setQuizAnswer(null);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Opening & Closing Programs"
        instructions="Learn how to start and exit programs properly"
        voiceIntro="Let's learn how to open and close programs on your computer!"
        onBack={onBack}
        handleBack={handleBackClick}
        progress={getProgress()}
        showMascot={true}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <AppWindow className="w-32 h-32 mx-auto mb-6 text-blue-600" />
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Programs and Apps</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                  Programs (also called applications or apps) are tools you use on your computer
                  to do different tasks like drawing, writing, or playing games!
                </p>
              </div>
              <VoiceButton
                onClick={() => navigateToStep('opening')}
                voiceText="Let's learn how to open programs"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Start Lesson
              </VoiceButton>
            </>
          )}

          {step === 'opening' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Opening Programs</h2>
                <p className="text-2xl text-gray-700 mb-6">
                  To open a program, double-click its icon or single-click it in the menu!
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                {!programOpen ? (
                  <VoiceButton
                    onClick={handleOpenProgram}
                    voiceText="Double-click to open the program"
                    className="bg-blue-100 hover:bg-blue-200 rounded-3xl p-12 text-center transition-all transform hover:scale-105"
                  >
                    <AppWindow className="w-32 h-32 mx-auto mb-4 text-blue-600" />
                    <p className="text-2xl font-bold">My Program</p>
                    <p className="text-gray-600 mt-2">Double-click to open</p>
                  </VoiceButton>
                ) : (
                  <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl border-4 border-blue-500 animate-fade-in">
                    <div className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-t-2xl -mx-8 -mt-8 mb-6">
                      <div className="flex items-center gap-2">
                        <AppWindow className="w-6 h-6" />
                        <span className="font-bold">My Program</span>
                      </div>
                      <div className="flex gap-2">
                        <Minimize2 className="w-5 h-5" />
                        <Maximize2 className="w-5 h-5" />
                        <X className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-center py-12">
                      <div className="text-7xl mb-4">🎮</div>
                      <p className="text-2xl font-bold text-gray-700">Program is now open!</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 'closing' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Closing Programs</h2>
                <p className="text-2xl text-gray-700 mb-6">
                  To close a program, click the X button in the top corner of the window!
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl border-4 border-blue-500">
                <div className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-t-2xl -mx-8 -mt-8 mb-6">
                  <div className="flex items-center gap-2">
                    <AppWindow className="w-6 h-6" />
                    <span className="font-bold">My Program</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="hover:bg-blue-600 p-1 rounded">
                      <Minimize2 className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-blue-600 p-1 rounded">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <VoiceButton
                      onClick={handleCloseProgram}
                      voiceText="Click the X button to close"
                      className="hover:bg-red-500 p-1 rounded transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </VoiceButton>
                  </div>
                </div>
                <div className="text-center py-12">
                  <div className="text-7xl mb-4">🎮</div>
                  <p className="text-2xl font-bold text-gray-700">Click the X to close!</p>
                </div>
              </div>
            </>
          )}

          {step === 'practice' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Practice Time!</h2>
                <p className="text-2xl text-gray-700">
                  Try opening and closing these programs!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
                {[
                  { id: 0, name: 'Game App', icon: '🎮' },
                  { id: 1, name: 'Draw App', icon: '🎨' },
                  { id: 2, name: 'Music App', icon: '🎵' }
                ].map(app => (
                  <div key={app.id} className="flex flex-col items-center">
                    {!practicePrograms[app.id] ? (
                      <VoiceButton
                        onClick={() => handlePracticeOpen(app.id)}
                        voiceText={`Open ${app.name}`}
                        className="bg-blue-100 hover:bg-blue-200 rounded-2xl p-8 text-center transition-all transform hover:scale-105 w-full"
                      >
                        <div className="text-6xl mb-3">{app.icon}</div>
                        <p className="text-xl font-bold">{app.name}</p>
                      </VoiceButton>
                    ) : (
                      <div className="bg-white rounded-2xl shadow-xl border-4 border-blue-500 w-full animate-fade-in">
                        <div className="flex items-center justify-between bg-blue-500 text-white p-3 rounded-t-xl">
                          <span className="text-sm font-bold">{app.name}</span>
                          <VoiceButton
                            onClick={() => handlePracticeClose(app.id)}
                            voiceText="Close"
                            className="hover:bg-red-500 p-1 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </VoiceButton>
                        </div>
                        <div className="p-6 text-center">
                          <div className="text-5xl mb-2">{app.icon}</div>
                          <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <VoiceButton
                onClick={handleContinueFromPractice}
                voiceText="Continue to quiz"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 mt-6"
              >
                Continue
              </VoiceButton>
            </>
          )}

          {step === 'quiz' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Quick Quiz!</h2>
                <p className="text-3xl text-gray-700 font-semibold mb-8">
                  How do you properly close a program?
                </p>
              </div>

              {quizAnswer === null ? (
                <div className="grid grid-cols-1 gap-6 max-w-2xl">
                  <VoiceButton
                    onClick={() => handleQuiz('x-button')}
                    voiceText="Click the X button in the corner"
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Click the X button in the corner
                  </VoiceButton>
                  <VoiceButton
                    onClick={() => handleQuiz('power-button')}
                    voiceText="Press the power button"
                    className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Press the computer's power button
                  </VoiceButton>
                  <VoiceButton
                    onClick={() => handleQuiz('pull-plug')}
                    voiceText="Unplug the computer"
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Unplug the computer
                  </VoiceButton>
                </div>
              ) : quizAnswer === 'x-button' ? (
                <div className="bg-green-100 border-4 border-green-500 rounded-3xl p-8 animate-fade-in max-w-2xl">
                  <div className="flex items-center gap-4 text-green-700">
                    <CheckCircle className="w-12 h-12" />
                    <p className="text-2xl font-bold">
                      Perfect! Always use the X button to close programs properly!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-100 border-4 border-red-500 rounded-3xl p-8 animate-fade-in max-w-2xl">
                  <div className="flex items-center gap-4 text-red-700">
                    <X className="w-12 h-12" />
                    <p className="text-2xl font-bold">
                      Not quite! Use the X button in the window's corner to close programs safely.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'complete' && (
            <div className="text-center">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-green-600 mb-4">Excellent Work!</h2>
              <p className="text-3xl text-gray-700">
                You now know how to open and close programs!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
