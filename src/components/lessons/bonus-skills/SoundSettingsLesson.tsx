import { useState } from 'react';
import { Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface SoundSettingsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface ScenarioTask {
  name: string;
  description: string;
  targetVolume: number;
  emoji: string;
  completed: boolean;
}

export default function SoundSettingsLesson({ onBack, onComplete }: SoundSettingsLessonProps) {
  const [step, setStep] = useState(0);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const [scenarios, setScenarios] = useState<ScenarioTask[]>([
    { name: 'Quiet Library', description: 'Set volume for a quiet library', targetVolume: 20, emoji: '📚', completed: false },
    { name: 'Normal Speaking', description: 'Set volume for normal conversation', targetVolume: 50, emoji: '💬', completed: false },
    { name: 'Party Time!', description: 'Set volume for a party', targetVolume: 80, emoji: '🎉', completed: false },
  ]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [matchedScenarios, setMatchedScenarios] = useState(0);

  const instructions = [
    "Volume control helps you hear things at the right level! Let's learn how to adjust it safely.",
    "Green zone (20-60) is safe for your ears! Make the music match each scenario.",
    "Excellent! You're a sound settings expert!"
  ];

  const isInGreenZone = volume >= 20 && volume <= 60;
  const isAtTarget = Math.abs(volume - scenarios[currentScenario].targetVolume) <= 5;

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setMuted(false);
  };

  const handleScenarioMatch = () => {
    if (isAtTarget) {
      const newScenarios = [...scenarios];
      newScenarios[currentScenario].completed = true;
      setScenarios(newScenarios);
      setMatchedScenarios(matchedScenarios + 1);

      if (matchedScenarios + 1 === 3) {
        setShowConfetti(true);
        setTimeout(() => setStep(2), 1500);
      } else {
        setCurrentScenario(currentScenario + 1);
        setVolume(50);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-amber-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Sound Settings</h1>
          <p className="text-2xl text-white opacity-90">Learn to control volume safely!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Volume2 className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">What is Volume?</h2>
                <p className="text-2xl text-gray-700">
                  Volume is how loud or quiet sound is. We need to adjust it to protect our ears and hear things clearly!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-red-400">
                <div className="text-5xl mb-3">🔊</div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">Too Loud</h3>
                <p className="text-gray-700">Can hurt your ears (80+)</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <div className="text-5xl mb-3">🔉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Just Right!</h3>
                <p className="text-gray-700">Safe zone (20-60)</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-gray-400">
                <div className="text-5xl mb-3">🔇</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">Too Quiet</h3>
                <p className="text-gray-700">Hard to hear (under 20)</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Start Game! 🎮
            </button>
          </div>
        )}

        {/* Step 1: Game */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Make the Music Just Right!</h2>
              <p className="text-2xl text-gray-600">Completed: {matchedScenarios} / 3</p>
            </div>

            {/* Current Scenario */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{scenarios[currentScenario].emoji}</div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{scenarios[currentScenario].name}</h3>
                <p className="text-2xl text-gray-600">{scenarios[currentScenario].description}</p>
              </div>
            </div>

            {/* Volume Control */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {muted ? (
                    <VolumeX className="w-12 h-12 text-red-500" />
                  ) : (
                    <Volume2 className="w-12 h-12 text-yellow-500" />
                  )}
                  <div className="text-5xl font-bold text-gray-800">{volume}</div>
                </div>
                <button
                  onClick={() => setMuted(!muted)}
                  className={`px-6 py-3 rounded-xl font-bold text-xl transition-all ${
                    muted
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                  }`}
                >
                  {muted ? 'Unmute' : 'Mute'}
                </button>
              </div>

              {/* Slider with Green Zone */}
              <div className="relative mb-4">
                <div className="absolute top-1/2 left-[20%] right-[40%] h-4 bg-green-400 rounded-full transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  disabled={muted}
                  className="w-full h-4 bg-gray-300 rounded-full appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              <div className="flex justify-between text-gray-600 mb-6">
                <span className="text-lg">0 (Silent)</span>
                <span className="text-lg font-bold text-green-600">Green Zone!</span>
                <span className="text-lg">100 (Loud)</span>
              </div>

              {/* Status Messages */}
              {!muted && (
                <div className="text-center">
                  {!isInGreenZone && (
                    <p className="text-2xl font-bold text-orange-600 mb-2">
                      {volume < 20 ? '📢 Turn it up a bit!' : '🔊 That\'s too loud! Turn it down!'}
                    </p>
                  )}
                  {isInGreenZone && (
                    <p className="text-2xl font-bold text-green-600 mb-2">✓ You're in the safe zone!</p>
                  )}
                  {isAtTarget && (
                    <p className="text-3xl font-bold text-green-700 animate-bounce">
                      🎵 Perfect match! 🎵
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Match Button */}
            <button
              onClick={handleScenarioMatch}
              disabled={!isAtTarget || muted}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-400 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 disabled:scale-100 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-8 h-8" />
              Match Scenario!
            </button>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex gap-3">
                {scenarios.map((_, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-4 rounded-full transition-all ${
                      idx === currentScenario
                        ? 'bg-yellow-500 scale-110'
                        : scenarios[idx].completed
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-green-600 mb-4">Perfect Volume Control!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You matched all 3 scenarios and kept the volume safe!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <p className="text-2xl text-green-800 mb-4">Remember: Keep volume in the green zone (20-60) to protect your ears!</p>
              <p className="text-2xl text-green-700">Now you're a sound settings expert! 🎵</p>
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
