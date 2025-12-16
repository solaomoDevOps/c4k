import { useState } from 'react';
import { Keyboard, CheckCircle2, RotateCcw, Copy, Save } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface KeyboardShortcutsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Shortcut {
  id: string;
  name: string;
  keys: string[];
  description: string;
  completed: boolean;
  icon: any;
}

export default function KeyboardShortcutsLesson({ onBack, onComplete }: KeyboardShortcutsLessonProps) {
  const [step, setStep] = useState(0);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    {
      id: 'undo',
      name: 'Undo',
      keys: ['Ctrl', 'Z'],
      description: 'Go back to the previous action',
      completed: false,
      icon: RotateCcw
    },
    {
      id: 'save',
      name: 'Save',
      keys: ['Ctrl', 'S'],
      description: 'Save your work',
      completed: false,
      icon: Save
    },
    {
      id: 'copy',
      name: 'Copy',
      keys: ['Ctrl', 'C'],
      description: 'Copy something',
      completed: false,
      icon: Copy
    },
    {
      id: 'paste',
      name: 'Paste',
      keys: ['Ctrl', 'V'],
      description: 'Paste something',
      completed: false,
      icon: Copy
    },
  ]);
  const [completedCount, setCompletedCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastMatched, setLastMatched] = useState<string | null>(null);

  const instructions = [
    "Keyboard shortcuts are quick ways to do things! Let's learn the most important ones.",
    "Press each keyboard shortcut combination. Watch the keys light up!",
    "Excellent! You've mastered keyboard shortcuts!"
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.ctrlKey ? 'Ctrl' : e.key.toUpperCase();
    const newPressed = new Set(pressedKeys);

    if (e.ctrlKey) {
      newPressed.add('Ctrl');
    }
    if (e.key.toLowerCase() === 'z') {
      newPressed.add('Z');
      checkShortcut(['Ctrl', 'Z']);
    } else if (e.key.toLowerCase() === 's') {
      newPressed.add('S');
      checkShortcut(['Ctrl', 'S']);
    } else if (e.key.toLowerCase() === 'c') {
      newPressed.add('C');
      checkShortcut(['Ctrl', 'C']);
    } else if (e.key.toLowerCase() === 'v') {
      newPressed.add('V');
      checkShortcut(['Ctrl', 'V']);
    }

    setPressedKeys(newPressed);
    e.preventDefault();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    setPressedKeys(new Set());
  };

  const checkShortcut = (keys: string[]) => {
    const matched = shortcuts.find(s =>
      s.keys.join(',') === keys.join(',') && !s.completed
    );

    if (matched) {
      setShortcuts(prev => prev.map(s =>
        s.id === matched.id ? { ...s, completed: true } : s
      ));
      setLastMatched(matched.id);
      setCompletedCount(prev => {
        const newCount = prev + 1;
        if (newCount === 4) {
          setShowConfetti(true);
          setTimeout(() => setStep(2), 1500);
        }
        return newCount;
      });

      setTimeout(() => setLastMatched(null), 1000);
    }
  };

  return (
    <div
      className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-amber-100"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
    >
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Keyboard Shortcuts</h1>
          <p className="text-2xl text-white opacity-90">Learn quick keyboard combinations to work faster!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Keyboard className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">What Are Shortcuts?</h2>
                <p className="text-2xl text-gray-700">
                  Instead of clicking menus, you can hold Ctrl and press a letter for quick actions!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-blue-400">
                <RotateCcw className="w-12 h-12 text-blue-600 mb-3" />
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Ctrl + Z</h3>
                <p className="text-gray-700">Undo (go back)</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <Save className="w-12 h-12 text-green-600 mb-3" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">Ctrl + S</h3>
                <p className="text-gray-700">Save your work</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-purple-400">
                <Copy className="w-12 h-12 text-purple-600 mb-3" />
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Ctrl + C</h3>
                <p className="text-gray-700">Copy text</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-pink-400">
                <Copy className="w-12 h-12 text-pink-600 mb-3" />
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Ctrl + V</h3>
                <p className="text-gray-700">Paste text</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Practice Shortcuts! ⌨️
            </button>
          </div>
        )}

        {/* Step 1: Game */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Practice Keyboard Shortcuts</h2>
              <p className="text-2xl text-gray-600">Shortcuts learned: {completedCount} / 4</p>
              <p className="text-gray-600 mt-4">Click below and press the shortcut keys on your keyboard</p>
            </div>

            {/* Focus area */}
            <div className="bg-yellow-50 rounded-2xl p-8 mb-8 border-4 border-yellow-400 text-center">
              <p className="text-2xl font-bold text-gray-700 mb-4">Ready for shortcuts...</p>
              <div className="text-6xl mb-4">⌨️</div>
            </div>

            {/* Shortcut Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {shortcuts.map(shortcut => {
                const Icon = shortcut.icon;
                const isActive = lastMatched === shortcut.id;

                return (
                  <div
                    key={shortcut.id}
                    className={`rounded-2xl p-6 border-4 transition-all ${
                      shortcut.completed
                        ? 'bg-green-100 border-green-500'
                        : isActive
                        ? 'bg-yellow-200 border-yellow-500 scale-105'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className={`w-10 h-10 ${
                        shortcut.completed
                          ? 'text-green-600'
                          : isActive
                          ? 'text-yellow-600'
                          : 'text-gray-600'
                      }`} />
                      <h3 className="text-2xl font-bold text-gray-800">{shortcut.name}</h3>
                      {shortcut.completed && (
                        <CheckCircle2 className="w-8 h-8 text-green-600 ml-auto" />
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{shortcut.description}</p>

                    {/* Key Display */}
                    <div className="flex gap-2 justify-center">
                      {shortcut.keys.map((key, idx) => (
                        <div key={idx}>
                          <div className={`px-4 py-3 rounded-lg font-bold text-lg border-2 transition-all ${
                            shortcut.completed
                              ? 'bg-green-400 border-green-600 text-white'
                              : isActive && pressedKeys.has(key)
                              ? 'bg-yellow-400 border-yellow-600 text-gray-800 scale-110'
                              : 'bg-white border-gray-300 text-gray-800'
                          }`}>
                            {key}
                          </div>
                          {idx < shortcut.keys.length - 1 && (
                            <div className="text-2xl text-gray-400 mx-2">+</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-400">
              <p className="text-xl text-blue-800 mb-2">💡 How to practice:</p>
              <p className="text-xl text-blue-800">Hold down Ctrl + press Z, S, C, or V</p>
              <p className="text-xl text-blue-800">Watch the keys light up when matched!</p>
            </div>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-green-600 mb-4">Shortcut Master!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You've learned all 4 essential keyboard shortcuts!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <div className="text-left space-y-4">
                <p className="text-2xl text-green-800">⏮️ Ctrl + Z = Undo (go back)</p>
                <p className="text-2xl text-green-800">💾 Ctrl + S = Save your work</p>
                <p className="text-2xl text-green-800">📋 Ctrl + C = Copy text</p>
                <p className="text-2xl text-green-800">📎 Ctrl + V = Paste text</p>
              </div>
              <p className="text-xl text-green-700 mt-6 font-bold">Use these every day to work faster!</p>
            </div>

            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Complete Lesson ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
