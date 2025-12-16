import { useState } from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface StoryBuilderLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Character {
  id: string;
  name: string;
  emoji: string;
}

interface Background {
  id: string;
  name: string;
  emoji: string;
}

export default function StoryBuilderLesson({ onBack, onComplete }: StoryBuilderLessonProps) {
  const [step, setStep] = useState(0);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [storyText, setStoryText] = useState('');
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [selectedDecorations, setSelectedDecorations] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const characters: Character[] = [
    { id: 'hero', name: 'Hero', emoji: '🦸' },
    { id: 'princess', name: 'Princess', emoji: '👑' },
    { id: 'dragon', name: 'Dragon', emoji: '🐉' },
    { id: 'wizard', name: 'Wizard', emoji: '🧙' },
    { id: 'robot', name: 'Robot', emoji: '🤖' },
    { id: 'alien', name: 'Alien', emoji: '👽' },
  ];

  const backgrounds: Background[] = [
    { id: 'castle', name: 'Castle', emoji: '🏰' },
    { id: 'forest', name: 'Forest', emoji: '🌲' },
    { id: 'space', name: 'Space', emoji: '🌌' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊' },
    { id: 'desert', name: 'Desert', emoji: '🏜️' },
    { id: 'city', name: 'City', emoji: '🏙️' },
  ];

  const decorations = [
    { id: 'sparkles', emoji: '✨' },
    { id: 'hearts', emoji: '💗' },
    { id: 'stars', emoji: '⭐' },
    { id: 'flowers', emoji: '🌸' },
    { id: 'sun', emoji: '☀️' },
    { id: 'moon', emoji: '🌙' },
    { id: 'clouds', emoji: '☁️' },
    { id: 'rainbow', emoji: '🌈' },
  ];

  const instructions = [
    "Create an amazing story combining characters, text, and decorations!",
    "Choose characters, write 3-5 sentences, select a background, and add decorations!",
    "Beautiful story created! You're a storyteller!"
  ];

  const toggleCharacter = (id: string) => {
    if (selectedCharacters.includes(id)) {
      setSelectedCharacters(selectedCharacters.filter(c => c !== id));
    } else {
      if (selectedCharacters.length < 3) {
        setSelectedCharacters([...selectedCharacters, id]);
      }
    }
  };

  const toggleDecoration = (id: string) => {
    if (selectedDecorations.includes(id)) {
      setSelectedDecorations(selectedDecorations.filter(d => d !== id));
    } else {
      setSelectedDecorations([...selectedDecorations, id]);
    }
  };

  const canSubmit = () => {
    const sentences = storyText.trim().split('.').filter(s => s.trim());
    return selectedCharacters.length >= 1 && sentences.length >= 3 && selectedBackground && selectedDecorations.length >= 2;
  };

  const handleComplete = () => {
    if (canSubmit()) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1500);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-fuchsia-100 to-pink-100">
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

        <div className="bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Story Builder</h1>
          <p className="text-2xl text-white opacity-90">Create your own magical story with characters and decorations!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <BookOpen className="w-24 h-24 text-fuchsia-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">What is a Story?</h2>
                <p className="text-2xl text-gray-700">
                  A story has characters, a plot (what happens), a setting (where), and decorations (how it looks)!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-50 rounded-2xl p-6 border-4 border-pink-400">
                <div className="text-6xl mb-3">👥</div>
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Characters</h3>
                <p className="text-gray-700">Who is in your story?</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6 border-4 border-purple-400">
                <div className="text-6xl mb-3">📖</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Story Text</h3>
                <p className="text-gray-700">What happens? (3-5 sentences)</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6 border-4 border-blue-400">
                <div className="text-6xl mb-3">🏰</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Background</h3>
                <p className="text-gray-700">Where does it happen?</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-6 border-4 border-yellow-400">
                <div className="text-6xl mb-3">✨</div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">Decorations</h3>
                <p className="text-gray-700">Make it fancy!</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Start Writing! ✍️
            </button>
          </div>
        )}

        {/* Step 1: Story Builder */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Your Story</h2>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{selectedCharacters.length}</p>
                  <p className="text-gray-600">Characters chosen</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{storyText.split('.').filter(s => s.trim()).length}</p>
                  <p className="text-gray-600">Sentences</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{selectedDecorations.length}</p>
                  <p className="text-gray-600">Decorations</p>
                </div>
              </div>
            </div>

            {/* Step 1a: Choose Characters */}
            <div className="bg-pink-50 rounded-2xl p-6 mb-8 border-4 border-pink-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Step 1: Choose Characters (up to 3)</h3>
              <div className="grid grid-cols-3 gap-3">
                {characters.map(char => (
                  <button
                    key={char.id}
                    onClick={() => toggleCharacter(char.id)}
                    className={`p-4 rounded-xl font-bold text-xl transition-all ${
                      selectedCharacters.includes(char.id)
                        ? 'bg-pink-500 text-white scale-110 shadow-lg'
                        : 'bg-white text-gray-800 border-4 border-pink-300 hover:border-pink-500'
                    }`}
                  >
                    <div className="text-5xl mb-2">{char.emoji}</div>
                    {char.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Write Story */}
            <div className="bg-purple-50 rounded-2xl p-6 mb-8 border-4 border-purple-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Step 2: Write Your Story (3-5 sentences)</h3>
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Once upon a time... Write what happens in your story!"
                className="w-full h-32 p-4 border-4 border-purple-300 rounded-xl text-xl resize-none focus:outline-none focus:border-purple-500"
              />
              <p className="text-gray-600 mt-2">
                {storyText.split('.').filter(s => s.trim()).length} / 3-5 sentences
              </p>
            </div>

            {/* Step 3: Choose Background */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-4 border-blue-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Step 3: Choose a Background</h3>
              <div className="grid grid-cols-3 gap-3">
                {backgrounds.map(bg => (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBackground(bg.id)}
                    className={`p-4 rounded-xl font-bold text-xl transition-all ${
                      selectedBackground === bg.id
                        ? 'bg-blue-500 text-white scale-110 shadow-lg'
                        : 'bg-white text-gray-800 border-4 border-blue-300 hover:border-blue-500'
                    }`}
                  >
                    <div className="text-5xl mb-2">{bg.emoji}</div>
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add Decorations */}
            <div className="bg-yellow-50 rounded-2xl p-6 mb-8 border-4 border-yellow-400">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Step 4: Add Decorations (choose at least 2)</h3>
              <div className="grid grid-cols-4 gap-3">
                {decorations.map(deco => (
                  <button
                    key={deco.id}
                    onClick={() => toggleDecoration(deco.id)}
                    className={`p-4 rounded-xl font-bold text-2xl transition-all ${
                      selectedDecorations.includes(deco.id)
                        ? 'bg-yellow-400 text-white scale-110 shadow-lg'
                        : 'bg-white text-gray-800 border-4 border-yellow-300 hover:border-yellow-500'
                    }`}
                  >
                    {deco.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Story Preview */}
            <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-2xl p-8 mb-8 border-4 border-fuchsia-400 min-h-48">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Story Preview:</h3>
              {selectedBackground && (
                <p className="text-6xl text-center mb-4">
                  {backgrounds.find(b => b.id === selectedBackground)?.emoji}
                </p>
              )}
              {selectedCharacters.length > 0 && (
                <p className="text-5xl text-center mb-4">
                  {selectedCharacters.map(id => characters.find(c => c.id === id)?.emoji).join(' ')}
                </p>
              )}
              {storyText && (
                <p className="text-2xl text-gray-800 mb-4 italic">{storyText}</p>
              )}
              {selectedDecorations.length > 0 && (
                <p className="text-5xl text-center">
                  {selectedDecorations.map(id => decorations.find(d => d.id === id)?.emoji).join(' ')}
                </p>
              )}
            </div>

            {/* Complete Button */}
            <button
              onClick={handleComplete}
              disabled={!canSubmit()}
              className="w-full bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 disabled:scale-100 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-8 h-8" />
              {canSubmit() ? 'Save Story!' : 'Complete all steps!'}
            </button>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-pink-600 mb-4">Amazing Story!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You've created a beautiful story with characters, plot, setting, and decorations!
            </p>

            {/* Story Summary */}
            <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-2xl p-8 mb-8 border-4 border-fuchsia-400">
              <p className="text-2xl text-gray-800 mb-4">
                <strong>Your Story:</strong>
              </p>
              {selectedBackground && (
                <p className="text-6xl text-center mb-4">
                  {backgrounds.find(b => b.id === selectedBackground)?.emoji}
                </p>
              )}
              {selectedCharacters.length > 0 && (
                <p className="text-5xl text-center mb-4">
                  {selectedCharacters.map(id => characters.find(c => c.id === id)?.emoji).join(' ')}
                </p>
              )}
              <p className="text-xl text-gray-800 mb-4 italic p-4 bg-white rounded-lg">
                {storyText}
              </p>
              {selectedDecorations.length > 0 && (
                <p className="text-5xl text-center">
                  {selectedDecorations.map(id => decorations.find(d => d.id === id)?.emoji).join(' ')}
                </p>
              )}
            </div>

            <div className="bg-pink-50 rounded-2xl p-6 mb-8 border-4 border-pink-400">
              <p className="text-2xl text-pink-800 mb-4">You're a talented storyteller!</p>
              <p className="text-xl text-pink-700">Keep creating amazing stories! 📖✨</p>
            </div>

            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Complete Lesson ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
