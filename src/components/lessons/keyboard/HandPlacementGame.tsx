import { useState, useEffect } from 'react';

interface HandPlacementGameProps {
  onComplete: (score: number) => void;
  handPreference: 'left' | 'right';
}

export default function HandPlacementGame({ onComplete, handPreference }: HandPlacementGameProps) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const leftHandKeys = ['A', 'S', 'D', 'F'];
  const rightHandKeys = ['J', 'K', 'L', ';'];
  const steps = handPreference === 'left'
    ? [...leftHandKeys, ...rightHandKeys]
    : [...rightHandKeys, ...leftHandKeys];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      const expectedKey = steps[step].toUpperCase();

      if (key === expectedKey) {
        setScore(prev => prev + 1);
        if (step < steps.length - 1) {
          setStep(prev => prev + 1);
        } else {
          setTimeout(() => onComplete(score + 1), 500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, score, steps, onComplete]);

  const getHandForKey = (key: string) => {
    return leftHandKeys.includes(key) ? 'left' : 'right';
  };

  const getFingerForKey = (key: string) => {
    const fingerMap: { [key: string]: string } = {
      'A': 'Pinky Finger',
      'S': 'Ring Finger',
      'D': 'Middle Finger',
      'F': 'Index Finger',
      'J': 'Index Finger',
      'K': 'Middle Finger',
      'L': 'Ring Finger',
      ';': 'Pinky Finger'
    };
    return fingerMap[key] || '';
  };

  const currentKey = steps[step];
  const currentHand = getHandForKey(currentKey);
  const currentFinger = getFingerForKey(currentKey);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Keys Pressed: <span className="text-blue-600">{step} / {steps.length}</span>
        </div>
      </div>

      <div className="mb-8 bg-green-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          🖐️ Learn where your hands go!
        </p>
        <p className="text-xl text-center text-gray-600 mb-3">
          Press the highlighted keys with the correct hand
        </p>
        <div className="bg-white rounded-xl p-4 inline-block mx-auto">
          <p className="text-2xl font-bold text-center text-blue-600">
            Use your {currentHand === 'left' ? 'LEFT' : 'RIGHT'} hand
          </p>
          <p className="text-xl font-bold text-center text-orange-600">
            {currentFinger} 👆
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-12 mb-12">
        <div className={`transition-all duration-300 ${currentHand === 'left' ? 'scale-125' : 'opacity-50'}`}>
          <div className="text-8xl mb-2">🤚</div>
          <div className="text-2xl font-bold text-center text-gray-700">Left Hand</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-16 shadow-2xl animate-pulse">
          <div className="text-8xl font-bold text-white">
            {currentKey}
          </div>
        </div>

        <div className={`transition-all duration-300 ${currentHand === 'right' ? 'scale-125' : 'opacity-50'}`}>
          <div className="text-8xl mb-2">✋</div>
          <div className="text-2xl font-bold text-center text-gray-700">Right Hand</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8">
        <div className="flex justify-center gap-2 mb-8">
          <div className="text-center">
            <div className="text-xl font-bold mb-4 text-pink-600">Left Hand</div>
            <div className="flex gap-2 mb-3">
              {leftHandKeys.map((key, index) => (
                <div key={key} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                      currentKey === key
                        ? 'bg-gradient-to-br from-yellow-300 to-orange-400 text-white scale-110 animate-bounce'
                        : step > steps.indexOf(key)
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                        : 'bg-white text-gray-700 border-2 border-pink-300'
                    }`}
                  >
                    {key}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <div className="w-16 text-center font-semibold text-pink-700">Pinky</div>
              <div className="w-16 text-center font-semibold text-pink-700">Ring</div>
              <div className="w-16 text-center font-semibold text-pink-700">Middle</div>
              <div className="w-16 text-center font-semibold text-pink-700">Index</div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="w-32 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center text-sm text-white font-bold mb-2">
              SPACE
            </div>
            <div className="text-xs text-center font-semibold text-gray-600">Thumbs</div>
          </div>

          <div className="text-center">
            <div className="text-xl font-bold mb-4 text-blue-600">Right Hand</div>
            <div className="flex gap-2 mb-3">
              {rightHandKeys.map((key, index) => (
                <div key={key} className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                      currentKey === key
                        ? 'bg-gradient-to-br from-yellow-300 to-orange-400 text-white scale-110 animate-bounce'
                        : step > steps.indexOf(key)
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                        : 'bg-white text-gray-700 border-2 border-blue-300'
                    }`}
                  >
                    {key}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 text-xs">
              <div className="w-16 text-center font-semibold text-blue-700">Index</div>
              <div className="w-16 text-center font-semibold text-blue-700">Middle</div>
              <div className="w-16 text-center font-semibold text-blue-700">Ring</div>
              <div className="w-16 text-center font-semibold text-blue-700">Pinky</div>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 mb-4">
          <p className="text-lg font-bold">
            {currentHand === 'left'
              ? '← Use your LEFT hand for these keys'
              : 'Use your RIGHT hand for these keys →'
            }
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-lg text-center text-gray-700 font-semibold">
            📍 Home Row Position: Keep your fingers resting on these keys when not typing!
          </p>
        </div>
      </div>
    </div>
  );
}
