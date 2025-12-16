import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Save, FolderOpen } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface SaveOpenFilesLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function SaveOpenFilesLesson({ onBack, onComplete }: SaveOpenFilesLessonProps) {
  const [step, setStep] = useState(0);
  const [savedFiles, setSavedFiles] = useState<string[]>([]);
  const [openedFiles, setOpenedFiles] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const filesToSave = ['Drawing', 'Story', 'Letter'];

  const handleSaveFile = (fileName: string) => {
    if (!savedFiles.includes(fileName)) {
      const newSaved = [...savedFiles, fileName];
      setSavedFiles(newSaved);
      if (newSaved.length === 3 && step === 1) {
        setTimeout(() => setStep(2), 500);
      }
    }
  };

  const handleOpenFile = (fileName: string) => {
    if (!openedFiles.includes(fileName)) {
      const newOpened = [...openedFiles, fileName];
      setOpenedFiles(newOpened);
      if (newOpened.length === 3 && step === 2) {
        setShowConfetti(true);
        setTimeout(() => setStep(3), 1000);
      }
    }
  };

  const instructions = [
    "Saving means the computer remembers your work so you can find it later!",
    "Save all three projects! Click the Save button for each one.",
    "Now open your saved files! Click each file to open it again.",
    "Perfect! You now know how to save and open files like a pro!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-amber-100 to-orange-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 3 ? "excited" : "happy"}
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
          <h1 className="text-5xl font-bold text-white mb-2">Saving and Opening Files</h1>
          <p className="text-2xl text-white opacity-90">Keep your work safe!</p>
        </div>

        {/* Save Phase */}
        {step >= 1 && step < 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Save the Mascot's Work!
            </h2>
            <p className="text-xl text-gray-600 mb-6 text-center">
              Saved: {savedFiles.length} / 3
            </p>

            <div className="grid grid-cols-3 gap-6">
              {filesToSave.map((file) => (
                <div key={file} className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200">
                  <div className="text-6xl mb-4 text-center">
                    {file === 'Drawing' ? '🎨' : file === 'Story' ? '📖' : '✉️'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    My {file}
                  </h3>
                  <button
                    onClick={() => handleSaveFile(file)}
                    disabled={savedFiles.includes(file)}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-xl font-bold transition-all ${
                      savedFiles.includes(file)
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
                    }`}
                  >
                    {savedFiles.includes(file) ? (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-6 h-6" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Open Phase */}
        {step >= 2 && step < 3 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Open Your Saved Files!
            </h2>
            <p className="text-xl text-gray-600 mb-6 text-center">
              Opened: {openedFiles.length} / 3
            </p>

            <div className="grid grid-cols-3 gap-6">
              {savedFiles.map((file) => (
                <button
                  key={file}
                  onClick={() => handleOpenFile(file)}
                  disabled={openedFiles.includes(file)}
                  className={`rounded-2xl p-8 border-4 transition-all transform hover:scale-105 ${
                    openedFiles.includes(file)
                      ? 'bg-green-100 border-green-500 cursor-not-allowed'
                      : 'bg-white border-amber-400 hover:border-orange-500'
                  }`}
                >
                  <FolderOpen className={`w-16 h-16 mx-auto mb-4 ${
                    openedFiles.includes(file) ? 'text-green-500' : 'text-amber-500'
                  }`} />
                  <p className="text-2xl font-bold text-gray-800">My {file}</p>
                  {openedFiles.includes(file) && (
                    <div className="mt-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                    </div>
                  )}
                </button>
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
              } else if (step === 3) {
                onComplete();
              }
            }}
            disabled={(step === 1 && savedFiles.length < 3) || (step === 2 && openedFiles.length < 3)}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Learning' : step === 3 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : step === 1 ? 'Save All Files!' : 'Open All Files!'}
          </button>
        </div>
      </div>
    </div>
  );
}
