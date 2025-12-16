import { useState } from 'react';
import { Wrench, AlertCircle, CheckCircle, HelpCircle, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface TroubleshootingLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  icon: any;
  solutions: { text: string; correct: boolean }[];
  explanation: string;
}

export default function TroubleshootingLesson({ onBack, onComplete }: TroubleshootingLessonProps) {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const problems: Problem[] = [
    {
      id: '1',
      title: 'Screen is Frozen',
      description: 'Your computer screen is frozen and won\'t move!',
      icon: AlertCircle,
      solutions: [
        { text: 'Ask a parent or adult for help', correct: true },
        { text: 'Keep clicking everywhere really fast', correct: false },
        { text: 'Turn off the monitor', correct: false },
      ],
      explanation: 'When your computer freezes, always ask an adult for help! They can restart it safely.',
    },
    {
      id: '2',
      title: 'No Sound',
      description: 'You can\'t hear any sound from your computer!',
      icon: VolumeX,
      solutions: [
        { text: 'Check if the volume is muted or turned down', correct: true },
        { text: 'Restart the whole computer immediately', correct: false },
        { text: 'Click random buttons', correct: false },
      ],
      explanation: 'First check the volume! Make sure it\'s not muted and turned up. If that doesn\'t work, ask an adult.',
    },
    {
      id: '3',
      title: 'Program Won\'t Open',
      description: 'You clicked on a program but it won\'t open!',
      icon: HelpCircle,
      solutions: [
        { text: 'Wait a moment, then try clicking once more', correct: true },
        { text: 'Click it 100 times really fast', correct: false },
        { text: 'Turn off the computer', correct: false },
      ],
      explanation: 'Sometimes programs take a few seconds to open. Wait patiently, and if it still doesn\'t work, ask an adult!',
    },
    {
      id: '4',
      title: 'Strange Error Message',
      description: 'A message popped up that you don\'t understand!',
      icon: AlertCircle,
      solutions: [
        { text: 'Call a parent or adult to read it', correct: true },
        { text: 'Click OK without reading it', correct: false },
        { text: 'Close the computer', correct: false },
      ],
      explanation: 'Never click on messages you don\'t understand! Always ask an adult to read it and help you.',
    },
  ];

  const problem = problems[currentProblem];

  const handleAnswer = (index: number) => {
    const correct = problem.solutions[index].correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(currentProblem + 1);
      } else {
        setShowConfetti(true);
        setTimeout(onComplete, 3000);
      }
    }, 3000);
  };

  const progress = ((currentProblem + 1) / problems.length) * 100;
  const Icon = problem.icon;

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Basic Troubleshooting"
        instructions="Sometimes computers need help - here's what to do!"
        voiceIntro="Sometimes computers have problems. Let's learn what to do!"
        onBack={onBack}
        progress={progress}
        showMascot={true}
        mascotMessage={showFeedback ? (isCorrect ? 'Perfect! Great job!' : '😮 Ouch! Try again!') : 'What should you do?'}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {!showFeedback ? (
            <>
              {/* Problem Display */}
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-12 max-w-4xl border-4 border-orange-400">
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-white rounded-full p-6">
                    <Icon className="w-20 h-20 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-orange-900 mb-2">Problem:</h3>
                    <h2 className="text-3xl font-bold text-orange-800">{problem.title}</h2>
                  </div>
                </div>
                <p className="text-3xl text-orange-900 leading-relaxed">
                  {problem.description}
                </p>
              </div>

              <h3 className="text-3xl font-bold text-gray-800">What should you do?</h3>

              {/* Solution Options */}
              <div className="space-y-4 w-full max-w-3xl">
                {problem.solutions.map((solution, index) => (
                  <VoiceButton
                    key={index}
                    onClick={() => handleAnswer(index)}
                    voiceText={solution.text}
                    className="w-full bg-white hover:bg-blue-50 border-4 border-blue-400 hover:border-blue-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <p className="text-2xl font-semibold text-gray-800">{solution.text}</p>
                    </div>
                  </VoiceButton>
                ))}
              </div>

              <div className="text-2xl font-bold text-gray-600">
                Problem {currentProblem + 1} of {problems.length}
              </div>
            </>
          ) : (
            <div
              className={`${
                isCorrect ? 'bg-green-100 border-green-500' : 'bg-yellow-100 border-yellow-500'
              } border-4 rounded-3xl p-12 max-w-4xl animate-fade-in`}
            >
              <div className="flex items-start gap-6">
                {isCorrect ? (
                  <CheckCircle className="w-20 h-20 text-green-600 flex-shrink-0" />
                ) : (
                  <Wrench className="w-20 h-20 text-yellow-600 flex-shrink-0" />
                )}
                <div>
                  <h3 className={`text-4xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-yellow-700'}`}>
                    {isCorrect ? 'Perfect! Great job!' : 'Ouch! Not quite right.'}
                  </h3>
                  <p className={`text-3xl leading-relaxed ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                    {problem.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentProblem === problems.length - 1 && showFeedback && (
            <div className="bg-blue-100 border-4 border-blue-500 rounded-3xl p-8 text-center max-w-2xl">
              <Wrench className="w-24 h-24 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-blue-800 mb-4">Great Job!</h3>
              <p className="text-2xl text-blue-900">
                You solved {score} out of {problems.length} problems correctly!
              </p>
              <p className="text-xl text-blue-700 mt-4">
                Remember: When in doubt, always ask an adult for help!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
