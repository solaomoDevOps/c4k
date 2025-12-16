import { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface NamingFilesLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function NamingFilesLesson({ onBack, onComplete }: NamingFilesLessonProps) {
  const [step, setStep] = useState(0);
  const [namedFiles, setNamedFiles] = useState<{[key: string]: string}>({
    file1: '',
    file2: '',
    file3: ''
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const fileImages = {
    file1: '🐱',
    file2: '🏠',
    file3: '🌞'
  };

  const suggestedNames = {
    file1: ['My Cat', 'Fluffy', 'Kitty'],
    file2: ['My House', 'Red House', 'Home'],
    file3: ['Sunny Day', 'Yellow Sun', 'Sunshine']
  };

  const handleNameFile = (fileId: string, name: string) => {
    const newNamed = { ...namedFiles, [fileId]: name };
    setNamedFiles(newNamed);

    const allNamed = Object.values(newNamed).every(n => n.length > 0);
    if (allNamed && step === 1) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const instructions = [
    "Names help your computer find your work! Good names tell you what's inside.",
    "Give each picture a name! You can type your own or click a suggested name.",
    "Excellent naming! Now your computer knows exactly what each file contains!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-amber-100 to-orange-100">
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

        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Naming Files</h1>
          <p className="text-2xl text-white opacity-90">Give your files good names!</p>
        </div>

        {step >= 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Name the Pictures!
            </h2>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Named: {Object.values(namedFiles).filter(n => n.length > 0).length} / 3
            </p>

            <div className="space-y-6">
              {Object.keys(fileImages).map((fileId) => (
                <div key={fileId} className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200">
                  <div className="flex items-center gap-6">
                    <div className="text-8xl">{fileImages[fileId as keyof typeof fileImages]}</div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <input
                          type="text"
                          value={namedFiles[fileId]}
                          onChange={(e) => handleNameFile(fileId, e.target.value)}
                          placeholder="untitled"
                          className="flex-1 text-2xl font-bold px-4 py-3 rounded-xl border-4 border-blue-300 focus:border-blue-500 outline-none"
                          maxLength={20}
                        />
                        {namedFiles[fileId] && (
                          <CheckCircle2 className="w-8 h-8 text-green-500" />
                        )}
                      </div>

                      <div className="flex gap-2">
                        <span className="text-lg text-gray-600 mr-2">Suggestions:</span>
                        {suggestedNames[fileId as keyof typeof suggestedNames].map((name) => (
                          <button
                            key={name}
                            onClick={() => handleNameFile(fileId, name)}
                            className="bg-white border-2 border-blue-300 hover:border-blue-500 px-4 py-2 rounded-lg text-lg font-medium transition-all hover:scale-105"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            disabled={step === 1 && Object.values(namedFiles).filter(n => n.length > 0).length < 3}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Naming' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Name All Files!'}
          </button>
        </div>
      </div>
    </div>
  );
}
