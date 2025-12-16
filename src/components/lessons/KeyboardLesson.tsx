import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import KeyboardIntroGame from './keyboard/KeyboardIntroGame';
import HandPlacementGame from './keyboard/HandPlacementGame';
import TypeLettersGame from './keyboard/TypeLettersGame';
import TypeWordsGame from './keyboard/TypeWordsGame';

interface KeyboardLessonProps {
  lessonId: string;
  onBack: () => void;
  onComplete: () => void;
}

export default function KeyboardLesson({ lessonId, onBack, onComplete }: KeyboardLessonProps) {
  const { lessons, completeLesson, currentChild } = useApp();
  const [stage, setStage] = useState<'intro' | 'game' | 'complete'>('intro');
  const [stageHistory, setStageHistory] = useState<('intro' | 'game' | 'complete')[]>(['intro']);
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState(0);

  const lesson = lessons.find(l => l.id === lessonId);

  useEffect(() => {
    if (stage === 'game') {
      setStartTime(Date.now());
    }
  }, [stage]);

  if (!lesson) return null;

  const navigateToStage = (newStage: 'intro' | 'game' | 'complete') => {
    setStage(newStage);
    setStageHistory([...stageHistory, newStage]);
  };

  const handleGameComplete = (gameScore: number) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setScore(gameScore);
    const minScore = 50; // Minimum score to pass
    if (gameScore >= minScore) {
      completeLesson(lessonId, gameScore, timeSpent);
    }
    navigateToStage('complete');
  };

  const renderGame = () => {
    switch (lesson.lesson_number) {
      case 1:
        return <KeyboardIntroGame onComplete={handleGameComplete} computerType={currentChild?.computer_type || 'pc'} />;
      case 2:
        return <HandPlacementGame onComplete={handleGameComplete} handPreference={currentChild?.hand_preference || 'right'} />;
      case 3:
        return <TypeLettersGame onComplete={handleGameComplete} />;
      case 4:
        return <TypeWordsGame onComplete={handleGameComplete} />;
      default:
        return <KeyboardIntroGame onComplete={handleGameComplete} computerType={currentChild?.computer_type || 'pc'} />;
    }
  };

  const handleBackClick = () => {
    if (stageHistory.length <= 1) {
      onBack();
    } else {
      const newHistory = [...stageHistory];
      newHistory.pop();
      const previousStage = newHistory[newHistory.length - 1];
      setStageHistory(newHistory);
      setStage(previousStage);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={handleBackClick}
          className="mb-8 flex items-center gap-2 text-2xl text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
          <span>Back</span>
        </button>

        {stage === 'intro' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in">
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full p-8 shadow-xl">
                <div className="text-6xl">⌨️</div>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6 text-blue-600">
              {lesson.title}
            </h1>

            <p className="text-3xl text-gray-600 mb-12">
              {lesson.description}
            </p>

            <button
              onClick={() => navigateToStage('game')}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Lesson!
            </button>
          </div>
        )}

        {stage === 'game' && (
          <div className="animate-fade-in">
            {renderGame()}
          </div>
        )}

        {stage === 'complete' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in">
            {score >= 50 ? (
              <>
                <div className="mb-8">
                  <CheckCircle2 className="w-32 h-32 text-green-500 mx-auto animate-bounce" />
                </div>

                <h1 className="text-6xl font-bold mb-6 text-green-600">
                  Fantastic!
                </h1>

                <p className="text-4xl text-gray-700 mb-4">
                  You scored {score} points!
                </p>

                <p className="text-3xl text-gray-600 mb-12">
                  You're becoming a typing expert!
                </p>

                <div className="flex gap-6 justify-center">
                  <button
                    onClick={() => {
                      navigateToStage('game');
                      setScore(0);
                    }}
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-2xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={onComplete}
                    className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-2xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="text-8xl">😬</div>
                </div>

                <h1 className="text-6xl font-bold mb-6 text-orange-600">
                  Ouch! Try Again
                </h1>

                <p className="text-4xl text-gray-700 mb-4">
                  You scored {score} points
                </p>

                <p className="text-3xl text-gray-600 mb-12">
                  You need at least 50 points to pass. Let's practice more!
                </p>

                <div className="flex gap-6 justify-center">
                  <button
                    onClick={() => {
                      navigateToStage('game');
                      setScore(0);
                    }}
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-2xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Try Again
                  </button>

                  <button
                    onClick={onBack}
                    className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white text-2xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Back to Lessons
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
