import { useState } from 'react';
import { ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface ComicStripLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ComicStripLesson({ onBack, onComplete }: ComicStripLessonProps) {
  const [step, setStep] = useState(0);
  const [panels, setPanels] = useState([
    { character: '', background: '', text: '' },
    { character: '', background: '', text: '' },
    { character: '', background: '', text: '' }
  ]);
  const [showConfetti, setShowConfetti] = useState(false);

  const characters = ['🤖', '🐻', '🐱', '🐶'];
  const backgrounds = ['🏠', '🌳', '🏖️', '🌙'];

  const handleUpdatePanel = (index: number, field: string, value: string) => {
    const newPanels = [...panels];
    newPanels[index] = { ...newPanels[index], [field]: value };
    setPanels(newPanels);

    const allComplete = newPanels.every(p => p.character && p.background && p.text);
    if (allComplete && step === 1) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const instructions = [
    "A comic strip is a picture story with speech bubbles! Let's create one!",
    "Make the Mascot's Adventure! Fill all 3 panels with a character, background, and text.",
    "Amazing story! You're a comic book creator!"
  ];

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
          <h1 className="text-5xl font-bold text-white mb-2">Creating a Comic Strip</h1>
          <p className="text-2xl text-white opacity-90">Tell your story in 3 panels!</p>
        </div>

        {step >= 1 && (
          <div className="space-y-6">
            {panels.map((panel, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-fuchsia-500" />
                  <h3 className="text-2xl font-bold text-gray-800">Panel {index + 1}</h3>
                  {panel.character && panel.background && panel.text && (
                    <CheckCircle2 className="w-6 h-6 text-green-500 ml-auto" />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Comic Panel Preview */}
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 border-8 border-black min-h-[300px] flex flex-col items-center justify-center">
                    <div className="text-8xl mb-4">{panel.background || '□'}</div>
                    <div className="text-9xl mb-4">{panel.character || '?'}</div>
                    {panel.text && (
                      <div className="bg-white rounded-2xl px-6 py-4 border-4 border-black relative">
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white"></div>
                        <p className="text-2xl font-bold text-gray-800">{panel.text}</p>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xl font-bold text-gray-700 mb-2">
                        Choose Character:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {characters.map((char) => (
                          <button
                            key={char}
                            onClick={() => handleUpdatePanel(index, 'character', char)}
                            className={`text-5xl p-4 rounded-xl transition-all transform hover:scale-110 ${
                              panel.character === char
                                ? 'bg-fuchsia-200 ring-4 ring-fuchsia-500'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-gray-700 mb-2">
                        Choose Background:
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {backgrounds.map((bg) => (
                          <button
                            key={bg}
                            onClick={() => handleUpdatePanel(index, 'background', bg)}
                            className={`text-5xl p-4 rounded-xl transition-all transform hover:scale-110 ${
                              panel.background === bg
                                ? 'bg-pink-200 ring-4 ring-pink-500'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {bg}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-gray-700 mb-2">
                        Type Speech:
                      </label>
                      <input
                        type="text"
                        value={panel.text}
                        onChange={(e) => handleUpdatePanel(index, 'text', e.target.value)}
                        placeholder="What happens?"
                        maxLength={30}
                        className="w-full text-2xl px-4 py-3 rounded-xl border-4 border-gray-300 focus:border-fuchsia-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue/Complete Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (step < 1) {
                setStep(1);
              } else if (step === 2) {
                onComplete();
              }
            }}
            disabled={step === 1 && !panels.every(p => p.character && p.background && p.text)}
            className="bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Creating' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Complete All Panels!'}
          </button>
        </div>
      </div>
    </div>
  );
}
