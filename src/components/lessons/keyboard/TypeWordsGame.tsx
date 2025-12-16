import { useState, useEffect } from 'react';

interface TypeWordsGameProps {
  onComplete: (score: number) => void;
}

export default function TypeWordsGame({ onComplete }: TypeWordsGameProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [typedText, setTypedText] = useState('');
  const [score, setScore] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [bridge, setBridge] = useState(0);
  const targetWords = 10;

  const words = [
    'cat', 'dog', 'sun', 'fun', 'hat', 'bat',
    'red', 'blue', 'star', 'moon', 'tree', 'fish',
    'book', 'play', 'jump', 'run', 'look', 'good'
  ];

  useEffect(() => {
    generateNewWord();
  }, []);

  useEffect(() => {
    if (typedText.toLowerCase() === currentWord.toLowerCase()) {
      setScore(prev => prev + currentWord.length * 5);
      setWordsCompleted(prev => prev + 1);
      setBridge(prev => Math.min(prev + 10, 100));
      setTypedText('');

      if (wordsCompleted + 1 >= targetWords) {
        setTimeout(() => onComplete(score + currentWord.length * 5), 500);
      } else {
        generateNewWord();
      }
    }
  }, [typedText, currentWord, wordsCompleted, score, onComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setTypedText(prev => prev.slice(0, -1));
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setTypedText(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const generateNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
  };

  const getFingerInfo = (letter: string) => {
    const fingerMap: { [key: string]: { hand: string; finger: string } } = {
      'Q': { hand: 'Left', finger: 'Pinky' },
      'A': { hand: 'Left', finger: 'Pinky' },
      'Z': { hand: 'Left', finger: 'Pinky' },
      'W': { hand: 'Left', finger: 'Ring' },
      'S': { hand: 'Left', finger: 'Ring' },
      'X': { hand: 'Left', finger: 'Ring' },
      'E': { hand: 'Left', finger: 'Middle' },
      'D': { hand: 'Left', finger: 'Middle' },
      'C': { hand: 'Left', finger: 'Middle' },
      'R': { hand: 'Left', finger: 'Index' },
      'F': { hand: 'Left', finger: 'Index' },
      'V': { hand: 'Left', finger: 'Index' },
      'T': { hand: 'Left', finger: 'Index' },
      'G': { hand: 'Left', finger: 'Index' },
      'B': { hand: 'Left', finger: 'Index' },
      'Y': { hand: 'Right', finger: 'Index' },
      'H': { hand: 'Right', finger: 'Index' },
      'N': { hand: 'Right', finger: 'Index' },
      'U': { hand: 'Right', finger: 'Index' },
      'J': { hand: 'Right', finger: 'Index' },
      'M': { hand: 'Right', finger: 'Index' },
      'I': { hand: 'Right', finger: 'Middle' },
      'K': { hand: 'Right', finger: 'Middle' },
      'O': { hand: 'Right', finger: 'Ring' },
      'L': { hand: 'Right', finger: 'Ring' },
      'P': { hand: 'Right', finger: 'Pinky' }
    };
    return fingerMap[letter.toUpperCase()] || { hand: 'Right', finger: 'Pinky' };
  };

  const currentLetterIndex = typedText.length;
  const nextLetter = currentWord[currentLetterIndex]?.toUpperCase() || '';
  const fingerInfo = nextLetter ? getFingerInfo(nextLetter) : null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Score: <span className="text-blue-600">{score}</span>
        </div>
        <div className="text-3xl font-bold text-gray-700">
          Words: <span className="text-green-600">{wordsCompleted} / {targetWords}</span>
        </div>
      </div>

      <div className="mb-8 bg-blue-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          ⌨️ Type the word to build the bridge!
        </p>
        <p className="text-xl text-center text-gray-600 mb-4">
          Type each letter carefully
        </p>
        {fingerInfo && (
          <div className="flex justify-center gap-4">
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <p className="text-lg font-bold text-center">
                Next: <span className="text-3xl text-blue-600">{nextLetter}</span>
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <p className="text-lg font-bold text-center">
                {fingerInfo.hand === 'Left' ? '🤚' : '✋'} {fingerInfo.hand}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <p className="text-lg font-bold text-center text-orange-600">
                👆 {fingerInfo.finger}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-12 bg-gradient-to-b from-sky-200 to-blue-400 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-600 to-blue-400" />

        <div className="relative flex items-end justify-between h-48">
          <div className="w-32 bg-gradient-to-b from-green-600 to-green-800 rounded-t-xl flex items-center justify-center pb-8">
            <div className="text-6xl">🏰</div>
          </div>

          <div className="flex-1 flex items-end px-4">
            <div
              className="h-8 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg transition-all duration-500 shadow-lg"
              style={{ width: `${bridge}%` }}
            />
          </div>

          <div className="w-32 bg-gradient-to-b from-pink-600 to-pink-800 rounded-t-xl flex items-center justify-center pb-8">
            <div className="text-6xl">👑</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl text-gray-600 mb-2">Type this word:</div>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {currentWord}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {currentWord.split('').map((letter, index) => {
              const typed = typedText[index];
              const isCorrect = typed && typed.toLowerCase() === letter.toLowerCase();
              const isCurrent = index === typedText.length;

              return (
                <div
                  key={index}
                  className={`w-16 h-20 rounded-xl flex items-center justify-center text-4xl font-bold transition-all duration-200 ${
                    isCorrect
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-110'
                      : isCurrent
                      ? 'bg-gradient-to-br from-yellow-300 to-orange-400 text-white animate-pulse'
                      : 'bg-white border-4 border-gray-300 text-gray-400'
                  }`}
                >
                  {typed || ''}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6">
          <div className="text-center text-2xl text-gray-600 mb-3">What you typed:</div>
          <div className="bg-white rounded-xl p-6 text-4xl font-mono text-center min-h-20 flex items-center justify-center">
            {typedText || <span className="text-gray-300">Start typing...</span>}
          </div>
        </div>
      </div>

      {bridge === 100 && (
        <div className="text-center animate-bounce">
          <div className="text-5xl mb-2">🎉</div>
          <p className="text-2xl font-bold text-green-600">
            Bridge complete! Keep going!
          </p>
        </div>
      )}
    </div>
  );
}
