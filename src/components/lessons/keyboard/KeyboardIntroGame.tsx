import { useState, useEffect } from 'react';

interface KeyboardIntroGameProps {
  onComplete: (score: number) => void;
  computerType: 'mac' | 'pc';
}

export default function KeyboardIntroGame({ onComplete, computerType }: KeyboardIntroGameProps) {
  const [currentKey, setCurrentKey] = useState('');
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const targetKeys = ['Space', 'Enter', 'A', 'S', 'D'];

  useEffect(() => {
    if (keysPressed.length === 0) {
      setCurrentKey(targetKeys[0]);
    }
  }, [keysPressed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key === ' ' ? 'Space' : e.key === 'Enter' ? 'Enter' : e.key.toUpperCase();

      if (key === currentKey && !keysPressed.includes(key)) {
        setKeysPressed(prev => [...prev, key]);
        setScore(prev => prev + 1);

        const nextIndex = targetKeys.indexOf(key) + 1;
        if (nextIndex < targetKeys.length) {
          setCurrentKey(targetKeys[nextIndex]);
        } else {
          setTimeout(() => onComplete(score + 1), 500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentKey, keysPressed, score, onComplete]);

  const getKeyDisplay = (key: string) => {
    if (key === 'Space') return '⎵ SPACE';
    if (key === 'Enter') {
      return computerType === 'mac' ? '↵ RETURN' : '↵ ENTER';
    }
    return key;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Keys Found: <span className="text-blue-600">{keysPressed.length} / {targetKeys.length}</span>
        </div>
      </div>

      <div className="mb-8 bg-blue-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          ⌨️ Let's explore the keyboard!
        </p>
        <p className="text-xl text-center text-gray-600">
          Press the key shown below
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-12 shadow-2xl animate-pulse">
          <div className="text-7xl font-bold text-white text-center">
            {getKeyDisplay(currentKey)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {targetKeys.map(key => (
          <div
            key={key}
            className={`p-6 rounded-2xl text-center text-2xl font-bold transition-all duration-300 ${
              keysPressed.includes(key)
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-105'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {getKeyDisplay(key)}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Keyboard Parts
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <div className="text-4xl mb-2 text-center">🔤</div>
            <p className="text-lg font-semibold text-center text-gray-700">Letter Keys</p>
            <p className="text-sm text-center text-gray-600">A-Z letters</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="text-4xl mb-2 text-center">🔢</div>
            <p className="text-lg font-semibold text-center text-gray-700">Number Keys</p>
            <p className="text-sm text-center text-gray-600">0-9 numbers</p>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <div className="text-4xl mb-2 text-center">⎵</div>
            <p className="text-lg font-semibold text-center text-gray-700">Space Bar</p>
            <p className="text-sm text-center text-gray-600">Makes spaces</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {computerType === 'mac' ? '🍎 Special Mac Keys' : '💻 Special PC Keys'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {computerType === 'mac' ? (
            <>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⌘</div>
                <p className="text-lg font-semibold text-center text-gray-700">Command</p>
                <p className="text-sm text-center text-gray-600">For shortcuts</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⌥</div>
                <p className="text-lg font-semibold text-center text-gray-700">Option</p>
                <p className="text-sm text-center text-gray-600">Special characters</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⌃</div>
                <p className="text-lg font-semibold text-center text-gray-700">Control</p>
                <p className="text-sm text-center text-gray-600">Extra controls</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⇪</div>
                <p className="text-lg font-semibold text-center text-gray-700">Caps Lock</p>
                <p className="text-sm text-center text-gray-600">Capital letters</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⇥</div>
                <p className="text-lg font-semibold text-center text-gray-700">Tab</p>
                <p className="text-sm text-center text-gray-600">Indent & move</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⌫</div>
                <p className="text-lg font-semibold text-center text-gray-700">Delete</p>
                <p className="text-sm text-center text-gray-600">Remove text</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⊞</div>
                <p className="text-lg font-semibold text-center text-gray-700">Windows</p>
                <p className="text-sm text-center text-gray-600">For shortcuts</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">Alt</div>
                <p className="text-lg font-semibold text-center text-gray-700">Alt</p>
                <p className="text-sm text-center text-gray-600">Alternate key</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">Ctrl</div>
                <p className="text-lg font-semibold text-center text-gray-700">Control</p>
                <p className="text-sm text-center text-gray-600">For shortcuts</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⇪</div>
                <p className="text-lg font-semibold text-center text-gray-700">Caps Lock</p>
                <p className="text-sm text-center text-gray-600">Capital letters</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">Tab</div>
                <p className="text-lg font-semibold text-center text-gray-700">Tab</p>
                <p className="text-sm text-center text-gray-600">Indent & move</p>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-4xl mb-2 text-center">⌫</div>
                <p className="text-lg font-semibold text-center text-gray-700">Backspace</p>
                <p className="text-sm text-center text-gray-600">Remove text</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
