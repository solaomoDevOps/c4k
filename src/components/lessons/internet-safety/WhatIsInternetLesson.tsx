import { useState } from 'react';
import { Globe, BookOpen, Video, Gamepad2, CheckCircle, X } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface WhatIsInternetLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Activity {
  id: string;
  title: string;
  icon: any;
  isOnline: boolean;
}

export default function WhatIsInternetLesson({ onBack, onComplete }: WhatIsInternetLessonProps) {
  const [step, setStep] = useState<'intro' | 'metaphors' | 'game' | 'complete'>('intro');
  const [score, setScore] = useState(0);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const activities: Activity[] = [
    { id: '1', title: 'Watch videos', icon: Video, isOnline: true },
    { id: '2', title: 'Play with toys', icon: Gamepad2, isOnline: false },
    { id: '3', title: 'Search for pictures', icon: Globe, isOnline: true },
    { id: '4', title: 'Read a paper book', icon: BookOpen, isOnline: false },
    { id: '5', title: 'Play online games', icon: Gamepad2, isOnline: true },
    { id: '6', title: 'Draw on paper', icon: BookOpen, isOnline: false },
  ];

  const handleAnswer = (answer: boolean) => {
    const activity = activities[currentActivity];
    const correct = answer === activity.isOnline;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentActivity < activities.length - 1) {
        setCurrentActivity(currentActivity + 1);
      } else {
        setShowConfetti(true);
        setStep('complete');
        setTimeout(onComplete, 3000);
      }
    }, 2000);
  };

  const getProgress = () => {
    if (step === 'intro') return 20;
    if (step === 'metaphors') return 40;
    if (step === 'game') return 70;
    return 100;
  };

  const ActivityIcon = activities[currentActivity]?.icon;

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="What Is the Internet?"
        instructions="Learn about the amazing internet!"
        voiceIntro="Let's learn about the internet - it's like a giant library where we can learn and play!"
        onBack={onBack}
        progress={getProgress()}
        showMascot={true}
        mascotMessage={
          step === 'intro' ? 'The internet is amazing!' :
          step === 'metaphors' ? 'Think of it like a library!' :
          showFeedback ? (isCorrect ? 'Great job! Correct!' : '😮 Ouch! Try again!') :
          'Online or offline?'
        }
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <Globe className="w-32 h-32 text-blue-500 mx-auto mb-6 animate-pulse" />
                <h2 className="text-5xl font-bold text-gray-800 mb-6">What Is the Internet?</h2>
                <p className="text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  The internet is like a magical place where we can learn new things,
                  watch fun videos, and play games!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 text-center transform hover:scale-105 transition-all">
                  <BookOpen className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">Learn</h3>
                  <p className="text-xl text-blue-900">Find answers to questions</p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 text-center transform hover:scale-105 transition-all">
                  <Video className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">Watch</h3>
                  <p className="text-xl text-purple-900">See fun videos</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8 text-center transform hover:scale-105 transition-all">
                  <Gamepad2 className="w-20 h-20 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Play</h3>
                  <p className="text-xl text-green-900">Play safe games</p>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('metaphors')}
                voiceText="Learn more about the internet"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Tell Me More!
              </VoiceButton>
            </>
          )}

          {step === 'metaphors' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-6">The Internet Is Like...</h2>
              </div>

              <div className="space-y-6 max-w-4xl">
                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-400">
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">📚</div>
                    <div>
                      <h3 className="text-3xl font-bold text-orange-800 mb-2">A Giant Library</h3>
                      <p className="text-2xl text-orange-900">
                        You can find information about anything you want to learn!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-8 border-4 border-pink-400">
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">🛣️</div>
                    <div>
                      <h3 className="text-3xl font-bold text-rose-800 mb-2">Roads Connecting Places</h3>
                      <p className="text-2xl text-rose-900">
                        It connects computers all around the world, like roads connect cities!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl p-8 border-4 border-green-400">
                  <div className="flex items-center gap-6">
                    <div className="text-6xl">🎮</div>
                    <div>
                      <h3 className="text-3xl font-bold text-teal-800 mb-2">A Fun Playground</h3>
                      <p className="text-2xl text-teal-900">
                        You can play games and have fun, but always with a parent nearby!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('game')}
                voiceText="Let's play a game"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Let's Play a Game!
              </VoiceButton>
            </>
          )}

          {step === 'game' && !showFeedback && ActivityIcon && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">Online or Offline?</h2>
                <p className="text-2xl text-gray-700">
                  Does this activity need the internet?
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl p-16 mb-8 border-4 border-blue-400">
                <ActivityIcon className="w-32 h-32 text-blue-600 mx-auto mb-6" />
                <h3 className="text-5xl font-bold text-gray-800 text-center">
                  {activities[currentActivity].title}
                </h3>
              </div>

              <div className="flex gap-8">
                <VoiceButton
                  onClick={() => handleAnswer(true)}
                  voiceText="This needs the internet - online"
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-4xl font-bold py-12 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <Globe className="w-12 h-12" />
                  Online
                </VoiceButton>

                <VoiceButton
                  onClick={() => handleAnswer(false)}
                  voiceText="This doesn't need the internet - offline"
                  className="bg-gradient-to-r from-gray-400 to-slate-500 hover:from-gray-500 hover:to-slate-600 text-white text-4xl font-bold py-12 px-20 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-4"
                >
                  <X className="w-12 h-12" />
                  Offline
                </VoiceButton>
              </div>

              <div className="text-2xl font-bold text-gray-600 mt-4">
                Question {currentActivity + 1} of {activities.length}
              </div>
            </>
          )}

          {step === 'game' && showFeedback && (
            <div
              className={`${
                isCorrect ? 'bg-green-100 border-green-500' : 'bg-orange-100 border-orange-500'
              } border-4 rounded-3xl p-12 max-w-4xl animate-fade-in`}
            >
              <div className="flex items-center gap-6">
                {isCorrect ? (
                  <CheckCircle className="w-20 h-20 text-green-600" />
                ) : (
                  <Globe className="w-20 h-20 text-orange-600" />
                )}
                <div>
                  <h3 className={`text-4xl font-bold mb-2 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite!'}
                  </h3>
                  <p className={`text-3xl ${isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
                    {activities[currentActivity].isOnline
                      ? 'This activity needs the internet!'
                      : 'You can do this without the internet!'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <Globe className="w-32 h-32 text-blue-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Great Job!</h2>
              <p className="text-3xl text-gray-700 mb-4">
                You got {score} out of {activities.length} correct!
              </p>
              <p className="text-2xl text-gray-600">
                Now you know what the internet is and what you can do with it!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
