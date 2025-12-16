import { useState } from 'react';
import { File, Folder, CheckCircle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface FileFolderLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Item {
  id: string;
  name: string;
  type: 'file' | 'folder';
  category: 'document' | 'picture' | 'music';
}

export default function FileFolderLesson({ onBack, onComplete }: FileFolderLessonProps) {
  const [step, setStep] = useState<'intro' | 'practice' | 'complete'>('intro');
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  const [items] = useState<Item[]>([
    { id: '1', name: 'vacation.jpg', type: 'file', category: 'picture' },
    { id: '2', name: 'homework.doc', type: 'file', category: 'document' },
    { id: '3', name: 'song.mp3', type: 'file', category: 'music' },
    { id: '4', name: 'birthday.jpg', type: 'file', category: 'picture' },
  ]);

  const [folders] = useState([
    { name: 'Pictures', category: 'picture' as const, items: [] as Item[] },
    { id: 'documents',name: 'Documents', category: 'document' as const, items: [] as Item[] },
    { name: 'Music', category: 'music' as const, items: [] as Item[] },
  ]);

  const [placedItems, setPlacedItems] = useState<Item[]>([]);
  const [currentItem, setCurrentItem] = useState(0);

  const handlePlaceItem = (folderCategory: 'document' | 'picture' | 'music') => {
    const item = items[currentItem];
    if (item.category === folderCategory) {
      setScore(score + 1);
      setPlacedItems([...placedItems, item]);

      if (currentItem < items.length - 1) {
        setCurrentItem(currentItem + 1);
      } else {
        setShowConfetti(true);
        setTimeout(() => {
          setStep('complete');
          setTimeout(onComplete, 2000);
        }, 2000);
      }
    }
  };

  const progress = ((currentItem + 1) / items.length) * 100;

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Files and Folders"
        instructions="Files are like papers, folders are like boxes to organize them"
        voiceIntro="Files and folders help us keep our computer organized! Let's practice!"
        onBack={onBack}
        progress={step === 'practice' ? progress : 0}
        showMascot={true}
        mascotMessage={step === 'practice' ? 'Drag the file to the right folder!' : ''}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="grid grid-cols-2 gap-12 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-3xl p-8 mb-4">
                    <File className="w-32 h-32 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">File</h3>
                  <p className="text-xl text-gray-700">
                    A file is like a piece of paper with information on it
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-100 rounded-3xl p-8 mb-4">
                    <Folder className="w-32 h-32 text-yellow-600 mx-auto" />
                  </div>
                  <h3 className="text-3xl font-bold text-yellow-600 mb-2">Folder</h3>
                  <p className="text-xl text-gray-700">
                    A folder holds many files to keep them organized
                  </p>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('practice')}
                voiceText="Start practicing"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Let's Practice!
              </VoiceButton>
            </>
          )}

          {step === 'practice' && currentItem < items.length && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-blue-600 mb-4">
                  Where does this file belong?
                </h3>
              </div>

              {/* Current File */}
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 shadow-xl mb-8">
                <File className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-center text-blue-700">
                  {items[currentItem].name}
                </p>
              </div>

              {/* Folders */}
              <div className="flex gap-6 justify-center">
                {folders.map((folder) => (
                  <VoiceButton
                    key={folder.category}
                    onClick={() => handlePlaceItem(folder.category)}
                    voiceText={`Place in ${folder.name} folder`}
                    className="bg-gradient-to-br from-yellow-200 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 border-4 border-yellow-500 rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all duration-200 flex flex-col items-center gap-4"
                  >
                    <Folder className="w-20 h-20 text-yellow-700" />
                    <span className="text-2xl font-bold text-yellow-800">{folder.name}</span>
                  </VoiceButton>
                ))}
              </div>

              <div className="text-xl font-bold text-gray-600">
                Score: {score} / {items.length}
              </div>
            </>
          )}

          {step === 'complete' && (
            <div className="text-center">
              <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-4" />
              <h2 className="text-5xl font-bold text-green-600 mb-4">Perfect!</h2>
              <p className="text-3xl text-gray-700">
                You organized all the files correctly!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
