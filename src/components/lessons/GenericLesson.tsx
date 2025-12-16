import { ArrowLeft, BookOpen, Lightbulb } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import Mascot from '../Mascot';
import ComputerPartsLesson from './computer-basics/ComputerPartsLesson';
import PowerButtonLesson from './computer-basics/PowerButtonLesson';
import FileFolderLesson from './files/FileFolderLesson';
import WindowControlLesson from './navigation/WindowControlLesson';
import WhatIsInternetLesson from './internet-safety/WhatIsInternetLesson';
import PersonalInfoLesson from './internet-safety/PersonalInfoLesson';
import OnlineSafetyLesson from './internet-safety/OnlineSafetyLesson';
import AdsPopupsLesson from './internet-safety/AdsPopupsLesson';
import SafeSearchingLesson from './internet-safety/SafeSearchingLesson';
import DrawingToolsLesson from './creative-tools/DrawingToolsLesson';
import CapitalLettersLesson from './advanced-typing/CapitalLettersLesson';
import TroubleshootingLesson from './bonus-skills/TroubleshootingLesson';
import SwitchWindowsLesson from './navigation/SwitchWindowsLesson';
import ScrollbarLesson from './navigation/ScrollbarLesson';
import MenusLesson from './navigation/MenusLesson';
import UsingDesktopLesson from './navigation/UsingDesktopLesson';
import OpeningClosingProgramsLesson from './navigation/OpeningClosingProgramsLesson';
import CreateFilesLesson from './files/CreateFilesLesson';
import SaveOpenFilesLesson from './files/SaveOpenFilesLesson';
import NamingFilesLesson from './files/NamingFilesLesson';
import StampsStickersLesson from './creative-tools/StampsStickersLesson';
import ScreenshotsLesson from './creative-tools/ScreenshotsLesson';
import ComicStripLesson from './creative-tools/ComicStripLesson';
import StoryBuilderLesson from './creative-tools/StoryBuilderLesson';
import PunctuationLesson from './advanced-typing/PunctuationLesson';
import ArrowKeysLesson from './advanced-typing/ArrowKeysLesson';
import BackspaceDeleteLesson from './advanced-typing/BackspaceDeleteLesson';
import SoundSettingsLesson from './bonus-skills/SoundSettingsLesson';
import TouchScreensLesson from './bonus-skills/TouchScreensLesson';
import TrackpadLesson from './bonus-skills/TrackpadLesson';
import KeyboardShortcutsLesson from './bonus-skills/KeyboardShortcutsLesson';
import TextFormattingLesson from './bonus-skills/TextFormattingLesson';
import DragDropMasteryLesson from './bonus-skills/DragDropMasteryLesson';

interface GenericLessonProps {
  lessonId: string;
  onBack: () => void;
}

export default function GenericLesson({ lessonId, onBack }: GenericLessonProps) {
  const { lessons, completeLesson } = useApp();
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) return null;

  const handleComplete = async () => {
    await completeLesson(lessonId);
    onBack();
  };

  // Route to specific interactive lessons based on category and lesson number

  // Computer Basics
  if (lesson.category === 'computer-basics' && lesson.lesson_number === 1) {
    return <ComputerPartsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'computer-basics' && lesson.lesson_number === 2) {
    return <PowerButtonLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Files
  if (lesson.category === 'files' && lesson.lesson_number === 1) {
    return <FileFolderLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'files' && lesson.lesson_number === 2) {
    return <CreateFilesLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'files' && lesson.lesson_number === 3) {
    return <SaveOpenFilesLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'files' && lesson.lesson_number === 4) {
    return <NamingFilesLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Navigation
  if (lesson.category === 'navigation' && lesson.lesson_number === 1) {
    return <WindowControlLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'navigation' && lesson.lesson_number === 2) {
    return <MenusLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'navigation' && lesson.lesson_number === 3) {
    return <UsingDesktopLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'navigation' && lesson.lesson_number === 4) {
    return <OpeningClosingProgramsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'navigation' && lesson.lesson_number === 5) {
    return <SwitchWindowsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'navigation' && lesson.lesson_number === 6) {
    return <ScrollbarLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Internet Safety
  if (lesson.category === 'internet-safety' && lesson.lesson_number === 1) {
    return <WhatIsInternetLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'internet-safety' && lesson.lesson_number === 2) {
    return <PersonalInfoLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'internet-safety' && lesson.lesson_number === 3) {
    return <OnlineSafetyLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'internet-safety' && lesson.lesson_number === 4) {
    return <AdsPopupsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'internet-safety' && lesson.lesson_number === 5) {
    return <SafeSearchingLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Creative Tools
  if (lesson.category === 'creative-tools' && lesson.lesson_number === 1) {
    return <DrawingToolsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'creative-tools' && lesson.lesson_number === 2) {
    return <StampsStickersLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'creative-tools' && lesson.lesson_number === 3) {
    return <ScreenshotsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'creative-tools' && lesson.lesson_number === 4) {
    return <ComicStripLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'creative-tools' && lesson.lesson_number === 5) {
    return <StoryBuilderLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Advanced Typing
  if (lesson.category === 'advanced-typing' && lesson.lesson_number === 1) {
    return <CapitalLettersLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'advanced-typing' && lesson.lesson_number === 2) {
    return <PunctuationLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'advanced-typing' && lesson.lesson_number === 3) {
    return <ArrowKeysLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'advanced-typing' && lesson.lesson_number === 4) {
    return <BackspaceDeleteLesson onBack={onBack} onComplete={handleComplete} />;
  }

  // Bonus Skills
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 1) {
    return <TroubleshootingLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 2) {
    return <SoundSettingsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 3) {
    return <TouchScreensLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 4) {
    return <TrackpadLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 5) {
    return <KeyboardShortcutsLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 6) {
    return <TextFormattingLesson onBack={onBack} onComplete={handleComplete} />;
  }
  if (lesson.category === 'bonus-skills' && lesson.lesson_number === 7) {
    return <DragDropMasteryLesson onBack={onBack} onComplete={handleComplete} />;
  }

  const categoryNames: Record<string, string> = {
    'computer-basics': 'Computer Basics',
    'navigation': 'Navigation',
    'files': 'Files & Folders',
    'creative-tools': 'Creative Tools',
    'advanced-typing': 'Advanced Typing',
    'internet-safety': 'Internet Safety'
  };

  const categoryColors: Record<string, string> = {
    'computer-basics': 'from-purple-400 to-indigo-500',
    'navigation': 'from-teal-400 to-cyan-500',
    'files': 'from-amber-400 to-orange-500',
    'creative-tools': 'from-fuchsia-400 to-pink-500',
    'advanced-typing': 'from-emerald-400 to-green-500',
    'internet-safety': 'from-red-400 to-rose-500'
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 to-pink-100">
      <Mascot
        message="These lessons are coming soon! Check back later."
        emotion="happy"
        position="bottom-right"
      />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back to Dashboard</span>
        </button>

        <div className={`bg-gradient-to-br ${categoryColors[lesson.category] || 'from-blue-400 to-cyan-500'} rounded-3xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="w-16 h-16 text-white" />
            <div>
              <p className="text-xl text-white opacity-90">
                {categoryNames[lesson.category] || lesson.category}
              </p>
              <h1 className="text-5xl font-bold text-white">
                {lesson.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About This Lesson</h2>
              <p className="text-2xl text-gray-700 leading-relaxed">
                {lesson.description}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-4 border-blue-400 rounded-3xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Coming Soon!</h3>
            <p className="text-xl text-blue-800 leading-relaxed">
              We're working hard to create interactive lessons for {categoryNames[lesson.category] || lesson.category}.
              For now, you can explore the other available lessons and games!
            </p>
            <button
              onClick={onBack}
              className="mt-8 bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
