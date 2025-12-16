import { useState } from 'react';
import { Shield, Check, X, AlertTriangle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface OnlineSafetyLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface SafetyRule {
  id: string;
  situation: string;
  safe: boolean;
  explanation: string;
}

export default function OnlineSafetyLesson({ onBack, onComplete }: OnlineSafetyLessonProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const safetyRules: SafetyRule[] = [
    {
      id: '1',
      situation: 'A stranger online asks for your name and address',
      safe: false,
      explanation: 'Never share personal information with strangers online!',
    },
    {
      id: '2',
      situation: 'You see a confusing website and ask your parent for help',
      safe: true,
      explanation: 'Great job! Always ask a parent when you need help!',
    },
    {
      id: '3',
      situation: 'Someone you don\'t know sends you a friend request',
      safe: false,
      explanation: 'Only accept friend requests from people you know in real life!',
    },
    {
      id: '4',
      situation: 'You want to download a game and ask your parent first',
      safe: true,
      explanation: 'Perfect! Always ask a parent before downloading anything!',
    },
    {
      id: '5',
      situation: 'A popup says you won a prize and asks you to click',
      safe: false,
      explanation: 'These are tricks! Never click on popup prizes without asking a parent!',
    },
  ];

  const currentRule = safetyRules[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    const correct = answer === currentRule.safe;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);

      setTimeout(() => {
        setShowFeedback(false);
        if (currentQuestion < safetyRules.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setShowConfetti(true);
          setTimeout(onComplete, 3000);
        }
      }, 3000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
      }, 3000);
    }
  };

  const progress = ((currentQuestion + 1) / safetyRules.length) * 100;

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Online Safety"
        instructions="Stay safe online with these important rules"
        voiceIntro="Let's learn how to stay safe when using the internet!"
        onBack={onBack}
        progress={progress}
        showMascot={true}
        mascotMessage={showFeedback ? (isCorrect ? '🎉 Great job!' : '😮 Ouch! Try again!') : 'Is this safe or not safe?'}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {!showFeedback ? (
            <>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-12 max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-16 h-16 text-blue-600" />
                  <h3 className="text-3xl font-bold text-blue-900">Is this safe?</h3>
                </div>
                <p className="text-3xl text-gray-800 leading-relaxed mb-8">
                  {currentRule.situation}
                </p>
              </div>

              <div className="flex gap-8">
                <VoiceButton
                  onClick={() => handleAnswer(true)}
                  voiceText="Safe - this is okay to do"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-4xl font-bold py-12 px-24 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <Check className="w-12 h-12" />
                  Safe
                </VoiceButton>

                <VoiceButton
                  onClick={() => handleAnswer(false)}
                  voiceText="Not Safe - this could be dangerous"
                  className="bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 text-white text-4xl font-bold py-12 px-24 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <X className="w-12 h-12" />
                  Not Safe
                </VoiceButton>
              </div>

              <div className="text-2xl font-bold text-gray-600">
                Question {currentQuestion + 1} of {safetyRules.length}
              </div>
            </>
          ) : (
            <div
              className={`${
                isCorrect ? 'bg-green-100 border-green-500' : 'bg-orange-100 border-orange-500'
              } border-4 rounded-3xl p-12 max-w-4xl animate-fade-in`}
            >
              <div className="flex items-start gap-6">
                {isCorrect ? (
                  <Check className="w-20 h-20 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-20 h-20 text-orange-600 flex-shrink-0" />
                )}
                <div>
                  <h3 className={`text-4xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {isCorrect ? 'Correct! Great job!' : 'Ouch! Not quite right.'}
                  </h3>
                  <p className={`text-3xl leading-relaxed ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                    {currentRule.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentQuestion === safetyRules.length - 1 && showFeedback && (
            <div className="text-center mt-8">
              <div className="text-6xl mb-4">🛡️</div>
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Safety Shield Complete!</h2>
              <p className="text-3xl text-gray-700">
                You got {score} out of {safetyRules.length} correct!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
