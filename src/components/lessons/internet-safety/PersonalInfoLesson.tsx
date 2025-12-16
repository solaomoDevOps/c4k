import { useState } from 'react';
import { Shield, Lock, Check, X, AlertTriangle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface PersonalInfoLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface InfoItem {
  id: string;
  text: string;
  icon: string;
  isSafe: boolean;
  explanation: string;
}

export default function PersonalInfoLesson({ onBack, onComplete }: PersonalInfoLessonProps) {
  const [step, setStep] = useState<'intro' | 'learn' | 'game' | 'complete'>('intro');
  const [currentItem, setCurrentItem] = useState(0);
  const [score, setScore] = useState(0);
  const [shieldPieces, setShieldPieces] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const privateInfo = [
    { item: 'Your name', icon: '👤' },
    { item: 'Your age', icon: '🎂' },
    { item: 'Your school', icon: '🏫' },
    { item: 'Your address', icon: '🏠' },
    { item: 'Your photos', icon: '📸' },
    { item: 'Your passwords', icon: '🔐' },
  ];

  const gameItems: InfoItem[] = [
    {
      id: '1',
      text: 'Share your favorite color',
      icon: '🎨',
      isSafe: true,
      explanation: 'Favorite colors are safe to share!',
    },
    {
      id: '2',
      text: 'Tell someone your home address',
      icon: '🏠',
      isSafe: false,
      explanation: 'Never share your address online! Only parents can share this.',
    },
    {
      id: '3',
      text: 'Show your favorite cartoon character',
      icon: '📺',
      isSafe: true,
      explanation: 'Talking about cartoons is safe!',
    },
    {
      id: '4',
      text: 'Share your password',
      icon: '🔐',
      isSafe: false,
      explanation: 'NEVER share passwords with anyone except your parents!',
    },
    {
      id: '5',
      text: 'Talk about animals you like',
      icon: '🐶',
      isSafe: true,
      explanation: 'Talking about animals is safe and fun!',
    },
    {
      id: '6',
      text: 'Tell someone what school you go to',
      icon: '🏫',
      isSafe: false,
      explanation: 'Never tell strangers online about your school!',
    },
  ];

  const handleAnswer = (answer: boolean) => {
    const item = gameItems[currentItem];
    const correct = answer === item.isSafe;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
      setShieldPieces(shieldPieces + 1);

      setTimeout(() => {
        setShowFeedback(false);
        if (currentItem < gameItems.length - 1) {
          setCurrentItem(currentItem + 1);
        } else {
          setShowConfetti(true);
          setStep('complete');
          setTimeout(onComplete, 3000);
        }
      }, 2500);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
      }, 2500);
    }
  };

  const getProgress = () => {
    if (step === 'intro') return 20;
    if (step === 'learn') return 40;
    if (step === 'game') return 70;
    return 100;
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Personal Information Safety"
        instructions="Learn to keep your information private and safe"
        voiceIntro="Let's learn about keeping your personal information safe online!"
        onBack={onBack}
        progress={getProgress()}
        showMascot={true}
        mascotMessage={
          step === 'intro' ? 'Safety is super important!' :
          step === 'learn' ? 'Never share these!' :
          showFeedback ? (isCorrect ? 'Great job! Good choice!' : '😮 Ouch! Try again!') :
          'Is this safe to share?'
        }
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <Lock className="w-32 h-32 text-blue-500 mx-auto mb-6" />
                <h2 className="text-5xl font-bold text-gray-800 mb-6">Keep Your Info Private!</h2>
                <p className="text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  Some information is private and special - just for you and your family!
                  Let's learn what to keep safe.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-rose-100 rounded-3xl p-12 max-w-3xl border-4 border-red-400">
                <div className="flex items-center gap-6 mb-6">
                  <AlertTriangle className="w-16 h-16 text-red-600" />
                  <h3 className="text-3xl font-bold text-red-800">Important Rule:</h3>
                </div>
                <p className="text-3xl text-red-900 leading-relaxed">
                  NEVER share personal information online without asking a parent first!
                </p>
              </div>

              <VoiceButton
                onClick={() => setStep('learn')}
                voiceText="Learn what to keep private"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                What Should I Keep Private?
              </VoiceButton>
            </>
          )}

          {step === 'learn' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-red-600 mb-4">Never Share These Online:</h2>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {privateInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-8 border-4 border-red-400 text-center transform hover:scale-105 transition-all"
                  >
                    <div className="text-6xl mb-4">{info.icon}</div>
                    <h3 className="text-2xl font-bold text-red-800">{info.item}</h3>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 max-w-3xl border-4 border-green-400">
                <div className="flex items-center gap-6">
                  <Check className="w-16 h-16 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">What TO Do:</h3>
                    <p className="text-xl text-green-900">
                      Always ask a parent or trusted adult before sharing ANYTHING online!
                    </p>
                  </div>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('game')}
                voiceText="Play the safety game"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Play the Shield Game!
              </VoiceButton>
            </>
          )}

          {step === 'game' && !showFeedback && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Build Your Safety Shield!</h2>
                <p className="text-2xl text-gray-700">Choose only the SAFE items!</p>
              </div>

              {/* Shield Progress */}
              <div className="flex gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-lg ${
                      i < shieldPieces ? 'bg-blue-500' : 'bg-gray-300'
                    } flex items-center justify-center transition-all duration-300`}
                  >
                    {i < shieldPieces && <Shield className="w-10 h-10 text-white" />}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-16 mb-8 border-4 border-purple-400">
                <div className="text-8xl mb-6 text-center">{gameItems[currentItem].icon}</div>
                <h3 className="text-4xl font-bold text-gray-800 text-center">
                  {gameItems[currentItem].text}
                </h3>
              </div>

              <div className="flex gap-8">
                <VoiceButton
                  onClick={() => handleAnswer(true)}
                  voiceText="This is safe to share"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-4xl font-bold py-12 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <Check className="w-12 h-12" />
                  Safe
                </VoiceButton>

                <VoiceButton
                  onClick={() => handleAnswer(false)}
                  voiceText="This is not safe to share"
                  className="bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 text-white text-4xl font-bold py-12 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <X className="w-12 h-12" />
                  Not Safe
                </VoiceButton>
              </div>

              <div className="text-2xl font-bold text-gray-600">
                Item {currentItem + 1} of {gameItems.length}
              </div>
            </>
          )}

          {step === 'game' && showFeedback && (
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
                    {isCorrect ? 'Great job! Good Choice!' : 'Ouch! Not quite right.'}
                  </h3>
                  <p className={`text-3xl leading-relaxed ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                    {gameItems[currentItem].explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <Shield className="w-32 h-32 text-blue-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Safety Shield Complete!</h2>
              <div className="text-8xl mb-6">🛡️</div>
              <p className="text-3xl text-gray-700 mb-4">
                You built a {shieldPieces}-piece shield!
              </p>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
                You know how to keep your personal information safe online!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
