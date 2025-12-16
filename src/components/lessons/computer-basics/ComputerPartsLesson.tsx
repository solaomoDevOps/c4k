import { useState } from 'react';
import { Monitor, Mouse, Keyboard, Cpu, CheckCircle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface ComputerPartsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Part {
  id: string;
  name: string;
  icon: any;
  description: string;
  learned: boolean;
}

export default function ComputerPartsLesson({ onBack, onComplete }: ComputerPartsLessonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGoodJob, setShowGoodJob] = useState(false);
  const [parts, setParts] = useState<Part[]>([
    {
      id: 'monitor',
      name: 'Monitor',
      icon: Monitor,
      description: 'This is the screen where you see everything!',
      learned: false,
    },
    {
      id: 'mouse',
      name: 'Mouse',
      icon: Mouse,
      description: 'This helps you point and click on things!',
      learned: false,
    },
    {
      id: 'keyboard',
      name: 'Keyboard',
      icon: Keyboard,
      description: 'This is where you type letters and numbers!',
      learned: false,
    },
    {
      id: 'cpu',
      name: 'Computer/CPU',
      icon: Cpu,
      description: 'This is the brain of the computer!',
      learned: false,
    },
  ]);

  const currentPart = parts[currentStep];

  const handleNext = () => {
    const newParts = [...parts];
    newParts[currentStep].learned = true;
    setParts(newParts);

    if (currentStep < parts.length - 1) {
      setShowGoodJob(true);
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  const handleContinue = () => {
    setShowGoodJob(false);
    setCurrentStep(currentStep + 1);
  };

  const progress = ((currentStep + 1) / parts.length) * 100;

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Computer Parts"
        instructions="Let's learn about the different parts of a computer!"
        voiceIntro="Welcome! Today we will learn about computer parts. Let's start with the monitor!"
        onBack={onBack}
        progress={progress}
        showMascot={true}
        mascotMessage={currentPart ? `This is the ${currentPart.name}!` : ''}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {showGoodJob ? (
            <>
              <div className="text-center animate-fade-in">
                <div className="text-9xl mb-6">🎉</div>
                <h2 className="text-6xl font-bold text-green-600 mb-4">Good Job!</h2>
                <p className="text-3xl text-gray-700 font-semibold mb-8">
                  You learned about the {parts[currentStep].name}!
                </p>
                <VoiceButton
                  onClick={handleContinue}
                  voiceText="Continue to next part"
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                >
                  Continue
                </VoiceButton>
              </div>
            </>
          ) : currentPart ? (
            <>
              {/* Part Icon */}
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-12 shadow-xl animate-fade-in">
                <currentPart.icon className="w-48 h-48 text-blue-600" strokeWidth={1.5} />
              </div>

              {/* Part Name */}
              <div className="text-center">
                <h2 className="text-6xl font-bold text-blue-600 mb-4">{currentPart.name}</h2>
                <p className="text-3xl text-gray-700 font-semibold max-w-2xl">
                  {currentPart.description}
                </p>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-4">
                {parts.map((part, index) => (
                  <div
                    key={part.id}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      part.learned
                        ? 'bg-green-500 scale-125'
                        : index === currentStep
                        ? 'bg-blue-500 scale-110'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <VoiceButton
                onClick={handleNext}
                voiceText={currentStep < parts.length - 1 ? 'Next part' : 'Finish lesson'}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-3"
              >
                {currentStep < parts.length - 1 ? (
                  <>Next Part</>
                ) : (
                  <>
                    <CheckCircle className="w-8 h-8" />
                    Finish!
                  </>
                )}
              </VoiceButton>
            </>
          ) : null}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
