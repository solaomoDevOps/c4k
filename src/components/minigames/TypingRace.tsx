import { useState, useEffect } from 'react';
import { Home, Zap } from 'lucide-react';
import { playSound } from '../../utils/sounds';
import Confetti from '../Confetti';
import Mascot from '../Mascot';

interface TypingRaceProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

const words = ['cat', 'dog', 'sun', 'moon', 'star', 'tree', 'fish', 'bird', 'bear', 'lion'];

export default function TypingRace({ onComplete, onExit }: TypingRaceProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [distance, setDistance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !completed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !completed) {
      setCompleted(true);
      if (wordsTyped >= 10) {
        setShowConfetti(true);
        playSound.celebration();
      }
      setTimeout(() => onComplete(score), 2000);
    }
  }, [timeLeft, completed, wordsTyped, score, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (value === currentWord) {
      playSound.success();
      setWordsTyped(prev => prev + 1);
      setScore(prev => prev + 10);
      setDistance(prev => prev + 10);
      setInput('');
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-100 to-emerald-100">
      <Confetti active={showConfetti} />

      <Mascot
        message={completed ? `You typed ${wordsTyped} words!` : "Type the words to race!"}
        emotion={completed ? "celebrating" : "excited"}
        position="top-left"
      />

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-green-600">Typing Race</h1>
          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-gray-700">Time: {timeLeft}s</span>
            </div>
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-gray-700">Words: {wordsTyped}</span>
            </div>
            <button
              onClick={onExit}
              className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all"
            >
              <Home className="w-8 h-8 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative bg-white rounded-3xl p-12 shadow-2xl mb-8">
          <div className="relative h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl overflow-hidden mb-8">
            <div className="absolute top-0 left-0 h-full flex items-center">
              <div
                className="transition-all duration-300 ease-out"
                style={{ marginLeft: `${Math.min(distance * 3, 90)}%` }}
              >
                <span className="text-6xl">🏃</span>
              </div>
            </div>
            <div className="absolute top-0 right-4 h-full flex items-center">
              <span className="text-6xl">🏁</span>
            </div>
          </div>

          {!completed && (
            <>
              <div className="text-center mb-8">
                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
                  {currentWord}
                </div>
                <Zap className="w-12 h-12 mx-auto text-yellow-500 animate-bounce" />
              </div>

              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type the word here"
                className="w-full text-4xl p-6 border-4 border-green-300 rounded-2xl text-center focus:border-green-500 focus:outline-none"
                autoFocus
                disabled={completed}
              />
            </>
          )}

          {completed && (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {wordsTyped >= 10 ? '🏆' : '🌟'}
              </div>
              <h2 className="text-5xl font-bold text-gray-700 mb-4">
                {wordsTyped >= 10 ? 'Amazing!' : 'Good Try!'}
              </h2>
              <p className="text-3xl text-gray-600 mb-4">
                You typed {wordsTyped} words!
              </p>
              <div className="text-4xl font-bold text-green-600">
                Score: {score}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-700 mb-2 text-center">
            Tip: Type fast and accurately!
          </h3>
          <p className="text-xl text-gray-600 text-center">
            The more words you type, the higher your score!
          </p>
        </div>
      </div>
    </div>
  );
}
