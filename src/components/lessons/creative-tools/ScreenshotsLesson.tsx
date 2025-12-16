import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Camera, Download } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface ScreenshotsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function ScreenshotsLesson({ onBack, onComplete }: ScreenshotsLessonProps) {
  const [step, setStep] = useState(0);
  const [screenshots, setScreenshots] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = ['🏆', '🎨', '🌈'];

  const handleTakeScreenshot = () => {
    const newScreenshots = [...screenshots, currentImage];
    setScreenshots(newScreenshots);

    if (newScreenshots.length >= 3 && step === 1) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const handleNextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const instructions = [
    "A screenshot is like taking a photo of your screen! It saves what you see.",
    "Capture the treasure! Take 3 screenshots of different pictures. Click the camera button!",
    "Perfect! You've mastered taking screenshots!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-fuchsia-100 to-pink-100">
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

        <div className="bg-gradient-to-br from-fuchsia-400 to-pink-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Taking Screenshots</h1>
          <p className="text-2xl text-white opacity-90">Capture what's on your screen!</p>
        </div>

        {step >= 1 && (
          <>
            {/* Main Display */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12 mb-6 min-h-[300px] flex items-center justify-center border-8 border-blue-200">
                <div className="text-center">
                  <div className="text-9xl mb-4">{images[currentImage]}</div>
                  <p className="text-3xl font-bold text-gray-800">
                    {currentImage === 0 ? 'Trophy!' : currentImage === 1 ? 'Painting!' : 'Rainbow!'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleNextImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105"
                >
                  Show Next Picture
                </button>

                <button
                  onClick={handleTakeScreenshot}
                  className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white text-2xl font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center gap-3"
                >
                  <Camera className="w-8 h-8" />
                  Take Screenshot
                </button>
              </div>

              <p className="text-center text-2xl font-bold text-gray-700 mt-6">
                Screenshots taken: {screenshots.length} / 3
              </p>
            </div>

            {/* Saved Screenshots */}
            {screenshots.length > 0 && (
              <div className="bg-green-50 border-4 border-green-400 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-green-800">Your Screenshots:</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {screenshots.map((imgIndex, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg text-center border-4 border-green-300"
                    >
                      <div className="text-6xl mb-2">{images[imgIndex]}</div>
                      <p className="text-lg font-bold text-gray-600">Screenshot {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
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
            disabled={step === 1 && screenshots.length < 3}
            className="bg-gradient-to-r from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Practice' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Take 3 Screenshots!'}
          </button>
        </div>
      </div>
    </div>
  );
}
