import { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText, Image, Sticker } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface CreateFilesLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function CreateFilesLesson({ onBack, onComplete }: CreateFilesLessonProps) {
  const [step, setStep] = useState(0);
  const [createdFiles, setCreatedFiles] = useState<{type: string, icon: any, name: string}[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const fileTypes = [
    { type: 'text', icon: FileText, label: '📝 Word File', name: 'My Story' },
    { type: 'image', icon: Image, label: '🎨 Picture', name: 'My Drawing' },
    { type: 'sticker', icon: Sticker, label: '⭐ Sticker Page', name: 'Fun Stickers' },
  ];

  const handleCreateFile = (fileType: any) => {
    if (createdFiles.some(f => f.type === fileType.type)) return;

    const newFiles = [...createdFiles, fileType];
    setCreatedFiles(newFiles);

    if (newFiles.length === 3 && step === 1) {
      setShowConfetti(true);
      setTimeout(() => setStep(2), 1000);
    }
  };

  const instructions = [
    "A file is like a special box where your computer keeps your work safe!",
    "Create 3 different files! Click each 'New File' button to make a picture, word file, and sticker page.",
    "Perfect! You created all three magic boxes! Now your computer can keep your work safe!"
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
          <h1 className="text-5xl font-bold text-white mb-2">Creating Files</h1>
          <p className="text-2xl text-white opacity-90">Make special boxes for your work!</p>
        </div>

        {/* File Creation Area */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Make the Magic Boxes!</h2>
            <p className="text-2xl text-gray-600">
              Created: {createdFiles.length} / 3 files
            </p>
          </div>

          {/* New File Buttons */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {fileTypes.map((fileType) => (
              <button
                key={fileType.type}
                onClick={() => step >= 1 && handleCreateFile(fileType)}
                disabled={createdFiles.some(f => f.type === fileType.type)}
                className={`p-8 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                  createdFiles.some(f => f.type === fileType.type)
                    ? 'bg-green-100 border-green-500 cursor-not-allowed'
                    : 'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-400 hover:border-cyan-500'
                }`}
              >
                <div className="text-6xl mb-4">{fileType.label.split(' ')[0]}</div>
                <p className="text-2xl font-bold text-gray-800">{fileType.label.split(' ')[1]}</p>
                {createdFiles.some(f => f.type === fileType.type) && (
                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mt-4" />
                )}
              </button>
            ))}
          </div>

          {/* Created Files Display */}
          {createdFiles.length > 0 && (
            <div className="bg-blue-50 border-4 border-blue-400 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Your Files:</h3>
              <div className="grid grid-cols-3 gap-4">
                {createdFiles.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition-all"
                  >
                    <file.icon className="w-16 h-16 text-blue-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-gray-800">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
            disabled={step === 1 && createdFiles.length < 3}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Creating' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Create All Files!'}
          </button>
        </div>
      </div>
    </div>
  );
}
