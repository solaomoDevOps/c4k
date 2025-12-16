import { useState } from 'react';
import { Monitor, CheckCircle, Folder, AppWindow } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface UsingDesktopLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

type Step = 'intro' | 'icons' | 'files' | 'practice' | 'complete';

export default function UsingDesktopLesson({ onBack, onComplete }: UsingDesktopLessonProps) {
  const [step, setStep] = useState<Step>('intro');
  const [stepHistory, setStepHistory] = useState<Step[]>(['intro']);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickedIcons, setClickedIcons] = useState<string[]>([]);

  const desktopIcons = [
    { id: 'folder', icon: <Folder className="w-16 h-16 text-yellow-600" />, name: 'My Folder' },
    { id: 'app1', icon: <AppWindow className="w-16 h-16 text-blue-600" />, name: 'My App' },
    { id: 'app2', icon: <AppWindow className="w-16 h-16 text-green-600" />, name: 'Games' }
  ];

  const navigateToStep = (newStep: Step) => {
    setStep(newStep);
    setStepHistory([...stepHistory, newStep]);
  };

  const handleIconClick = (iconId: string) => {
    if (!clickedIcons.includes(iconId)) {
      setClickedIcons([...clickedIcons, iconId]);
    }
  };

  const handlePracticeComplete = () => {
    if (clickedIcons.length === desktopIcons.length) {
      navigateToStep('complete');
      setShowConfetti(true);
      setTimeout(onComplete, 3000);
    }
  };

  const getProgress = () => {
    switch (step) {
      case 'intro': return 0;
      case 'icons': return 25;
      case 'files': return 50;
      case 'practice': return 75;
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
        setClickedIcons([]);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Using the Desktop"
        instructions="Learn how to use your computer desktop and organize icons"
        voiceIntro="Let's learn about the desktop and how to use it!"
        onBack={onBack}
        handleBack={handleBackClick}
        progress={getProgress()}
        showMascot={true}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <Monitor className="w-32 h-32 mx-auto mb-6 text-blue-600" />
                <h2 className="text-4xl font-bold text-blue-600 mb-4">What is the Desktop?</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                  The desktop is the main screen you see when your computer starts.
                  It's like the top of a real desk where you keep your important items!
                </p>
              </div>
              <VoiceButton
                onClick={() => navigateToStep('icons')}
                voiceText="Let's explore the desktop"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Start Lesson
              </VoiceButton>
            </>
          )}

          {step === 'icons' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Desktop Icons</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                  Icons are small pictures on your desktop that represent files, folders, or programs.
                  You can click on them to open what they represent!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="bg-blue-100 rounded-3xl p-8 text-center">
                  <Folder className="w-24 h-24 mx-auto mb-4 text-yellow-600" />
                  <p className="text-xl font-bold">Folders</p>
                  <p className="text-gray-600">Store files</p>
                </div>
                <div className="bg-green-100 rounded-3xl p-8 text-center">
                  <AppWindow className="w-24 h-24 mx-auto mb-4 text-blue-600" />
                  <p className="text-xl font-bold">Programs</p>
                  <p className="text-gray-600">Open apps</p>
                </div>
                <div className="bg-purple-100 rounded-3xl p-8 text-center">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-xl font-bold">Files</p>
                  <p className="text-gray-600">Your work</p>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('files')}
                voiceText="Continue to learn more"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Continue
              </VoiceButton>
            </>
          )}

          {step === 'files' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Organizing Your Desktop</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-6">
                  Keep your desktop tidy by organizing icons into folders and only keeping
                  the things you use often on your desktop!
                </p>
                <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 max-w-2xl mx-auto">
                  <p className="text-xl text-gray-800">
                    <span className="font-bold">Tip:</span> A clean desktop makes it easier to find what you need!
                  </p>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('practice')}
                voiceText="Try it yourself"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Try It Now
              </VoiceButton>
            </>
          )}

          {step === 'practice' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Practice Time!</h2>
                <p className="text-2xl text-gray-700 mb-4">
                  Click on each icon on the practice desktop below!
                </p>
                <p className="text-xl text-gray-500">
                  Clicked: {clickedIcons.length} / {desktopIcons.length}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl p-12 w-full max-w-4xl min-h-96 relative shadow-2xl">
                <div className="grid grid-cols-3 gap-8">
                  {desktopIcons.map(icon => (
                    <VoiceButton
                      key={icon.id}
                      onClick={() => handleIconClick(icon.id)}
                      voiceText={`Click ${icon.name}`}
                      className={`bg-white/90 hover:bg-white rounded-2xl p-6 text-center transition-all transform hover:scale-105 ${
                        clickedIcons.includes(icon.id) ? 'ring-4 ring-green-400' : ''
                      }`}
                    >
                      {icon.icon}
                      <p className="text-lg font-bold mt-3">{icon.name}</p>
                      {clickedIcons.includes(icon.id) && (
                        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mt-2" />
                      )}
                    </VoiceButton>
                  ))}
                </div>
              </div>

              {clickedIcons.length === desktopIcons.length && (
                <VoiceButton
                  onClick={handlePracticeComplete}
                  voiceText="Complete the lesson"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 animate-bounce"
                >
                  Complete Lesson
                </VoiceButton>
              )}
            </>
          )}

          {step === 'complete' && (
            <div className="text-center">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-green-600 mb-4">Great Job!</h2>
              <p className="text-3xl text-gray-700">
                You now know how to use the desktop!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
