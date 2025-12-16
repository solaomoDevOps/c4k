import { useState, useEffect } from 'react';
import { MousePointer2, Keyboard, Trophy, Settings, Star, Gamepad2, Sparkles, Flame, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import AvatarSelector from './AvatarSelector';
import MobileWarning from './MobileWarning';
import VoiceButton from './VoiceButton';

interface ChildDashboardProps {
  onNavigate: (page: 'lesson-selection' | 'mouse-lesson' | 'keyboard-lesson' | 'generic-lesson' | 'progress' | 'parent' | 'mouse-maze' | 'typing-race' | 'coloring-game', lessonIdOrCategory?: string) => void;
}

export default function ChildDashboard({ onNavigate }: ChildDashboardProps) {
  const { currentChild, lessons, progress, getLevel } = useApp();
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isGuestMode = localStorage.getItem('isGuest') === 'true';
  const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const smallScreen = window.innerWidth < 768;
      setIsMobile(mobile || smallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldShowCategory = (category: string) => {
    return true;
  };

  const mouseLessons = lessons.filter(l => l.category === 'mouse');
  const keyboardLessons = lessons.filter(l => l.category === 'keyboard');
  const computerBasicsLessons = lessons.filter(l => l.category === 'computer-basics');
  const navigationLessons = lessons.filter(l => l.category === 'navigation');
  const filesLessons = lessons.filter(l => l.category === 'files');
  const creativeToolsLessons = lessons.filter(l => l.category === 'creative-tools');
  const advancedTypingLessons = lessons.filter(l => l.category === 'advanced-typing');
  const internetSafetyLessons = lessons.filter(l => l.category === 'internet-safety');
  const bonusSkillsLessons = lessons.filter(l => l.category === 'bonus-skills');

  useEffect(() => {
    console.log('Total lessons:', lessons.length);
    console.log('Mouse lessons:', mouseLessons.length);
    console.log('Keyboard lessons:', keyboardLessons.length);
    console.log('Computer basics:', computerBasicsLessons.length);
    console.log('Navigation:', navigationLessons.length);
    console.log('Files:', filesLessons.length);
    console.log('Creative tools:', creativeToolsLessons.length);
    console.log('Advanced typing:', advancedTypingLessons.length);
    console.log('Internet safety:', internetSafetyLessons.length);
    console.log('Bonus skills:', bonusSkillsLessons.length);
  }, [lessons]);

  const completedCount = progress.filter(p => p.completed).length;
  const totalLessons = lessons.length;

  const getNextLesson = (category: string) => {
    const categoryLessons = lessons.filter(l => l.category === category);
    const completed = progress.filter(p => p.completed).map(p => p.lesson_id);

    const nextLesson = categoryLessons.find(lesson => !completed.includes(lesson.id));
    return nextLesson || categoryLessons[0];
  };

  const getLessonProgress = (categoryLessons: typeof lessons) => {
    return progress.filter(p => p.completed && categoryLessons.find(l => l.id === p.lesson_id)).length;
  };

  const getAvatarEmoji = () => {
    const avatarMap: Record<string, string> = {
      robot: '🤖', bear: '🐻', cat: '🐱', dog: '🐶', lion: '🦁',
      unicorn: '🦄', dragon: '🐉', astronaut: '👨‍🚀', ninja: '🥷',
      pirate: '🏴‍☠️', alien: '👽', superhero: '🦸'
    };
    return avatarMap[currentChild?.selected_avatar || 'robot'] || '🤖';
  };

  const levelName = getLevel();
  const xpToNextLevel = currentChild ? (currentChild.level * 100) - currentChild.xp : 100;

  const handleLessonClick = (page: any, category?: string) => {
    if (isMobile) {
      alert('Lessons require a desktop or laptop computer with a keyboard and mouse. Please switch to a computer to begin learning.');
      return;
    }
    onNavigate(page, category);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {showAvatarSelector && <AvatarSelector onClose={() => setShowAvatarSelector(false)} />}

      <div className="max-w-6xl mx-auto">
        {isMobile && <MobileWarning allowRegistration={false} />}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
            <button
              onClick={() => setShowAvatarSelector(true)}
              className="text-5xl md:text-8xl hover:scale-110 transition-transform cursor-pointer bg-white rounded-full p-3 md:p-4 shadow-lg"
            >
              {getAvatarEmoji()}
            </button>
            <div className="flex-1">
              <h1 className="text-3xl md:text-6xl font-bold text-blue-600 mb-2">
                Hello, {currentChild?.career_role ? `${currentChild.career_role.charAt(0).toUpperCase() + currentChild.career_role.slice(1)} ` : ''}{currentChild?.name}!
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-3 py-1 md:px-4 md:py-2">
                  <span className="text-sm md:text-xl font-bold text-white">
                    {levelName} Level {currentChild?.level}
                  </span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                  <span className="text-sm md:text-xl font-bold text-gray-700">{currentChild?.xp} XP</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2 bg-white rounded-full px-3 py-1 md:px-4 md:py-2 shadow">
                  <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  <span className="text-sm md:text-xl font-bold text-gray-700">{currentChild?.current_streak || 0} day streak</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('parent')}
            className="bg-gray-200 hover:bg-gray-300 p-3 md:p-4 rounded-full transition-all duration-200 self-end md:self-auto"
            title="Parent Mode"
          >
            <Settings className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 gap-2">
            <div className="flex items-center gap-2 md:gap-3">
              <Star className="w-6 h-6 md:w-10 md:h-10 text-yellow-400 fill-yellow-400" />
              <span className="text-lg md:text-2xl font-bold text-gray-700">
                Progress: {completedCount} / {totalLessons} lessons
              </span>
            </div>
            <span className="text-sm md:text-xl text-gray-600">{xpToNextLevel} XP to next level</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-4 md:mb-6">📚 Computer Skills Lessons</h2>

        {lessons.length === 0 && (
          <div className="bg-yellow-50 border-4 border-yellow-300 rounded-3xl p-8 mb-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-3xl font-bold text-yellow-900 mb-2">Loading lessons...</h3>
              <p className="text-xl text-yellow-800">Please wait while we prepare your learning adventure!</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mouseLessons.length > 0 && shouldShowCategory('mouse') && (
            <VoiceButton
              onClick={() => handleLessonClick('lesson-selection', 'mouse')}
              voiceText="Mouse lessons: Learn to click, drag, and move!"
              className="bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                <MousePointer2 className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-white">Mouse</h3>
            </div>
            <p className="text-base text-pink-100 mb-2">
              Click, drag, and move!
            </p>
            <div className="bg-pink-300 rounded-full px-3 py-1 inline-block">
              <span className="text-sm font-bold text-pink-800">
                {getLessonProgress(mouseLessons)} / {mouseLessons.length}
              </span>
            </div>
          </VoiceButton>
          )}

          {keyboardLessons.length > 0 && shouldShowCategory('keyboard') && (
            <VoiceButton
              onClick={() => handleLessonClick('lesson-selection', 'keyboard')}
              voiceText="Keyboard lessons: Learn to type letters and words!"
              className="bg-gradient-to-br from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                <Keyboard className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-white">Keyboard</h3>
            </div>
            <p className="text-base text-blue-100 mb-2">
              Type letters and words!
            </p>
            <div className="bg-blue-300 rounded-full px-3 py-1 inline-block">
              <span className="text-sm font-bold text-blue-800">
                {getLessonProgress(keyboardLessons)} / {keyboardLessons.length}
              </span>
            </div>
          </VoiceButton>
          )}

          {computerBasicsLessons.length > 0 && shouldShowCategory('computer-basics') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'computer-basics')}
              className="bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Settings className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Computer Basics</h3>
              </div>
              <p className="text-base text-orange-100 mb-2">
                Learn computer parts!
              </p>
              <div className="bg-orange-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-orange-800">
                  {getLessonProgress(computerBasicsLessons)} / {computerBasicsLessons.length}
                </span>
              </div>
            </button>
          )}

          {navigationLessons.length > 0 && shouldShowCategory('navigation') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'navigation')}
              className="bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Gamepad2 className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Navigation</h3>
              </div>
              <p className="text-base text-teal-100 mb-2">
                Windows and menus!
              </p>
              <div className="bg-teal-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-teal-800">
                  {getLessonProgress(navigationLessons)} / {navigationLessons.length}
                </span>
              </div>
            </button>
          )}

          {filesLessons.length > 0 && shouldShowCategory('files') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'files')}
              className="bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <User className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Files & Folders</h3>
              </div>
              <p className="text-base text-amber-100 mb-2">
                Organize your work!
              </p>
              <div className="bg-amber-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-amber-800">
                  {getLessonProgress(filesLessons)} / {filesLessons.length}
                </span>
              </div>
            </button>
          )}

          {creativeToolsLessons.length > 0 && shouldShowCategory('creative-tools') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'creative-tools')}
              className="bg-gradient-to-br from-fuchsia-400 to-pink-500 hover:from-fuchsia-500 hover:to-pink-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Sparkles className="w-8 h-8 text-fuchsia-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Creative Tools</h3>
              </div>
              <p className="text-base text-fuchsia-100 mb-2">
                Draw and create!
              </p>
              <div className="bg-fuchsia-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-fuchsia-800">
                  {getLessonProgress(creativeToolsLessons)} / {creativeToolsLessons.length}
                </span>
              </div>
            </button>
          )}

          {advancedTypingLessons.length > 0 && shouldShowCategory('advanced-typing') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'advanced-typing')}
              className="bg-gradient-to-br from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Keyboard className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Advanced Typing</h3>
              </div>
              <p className="text-base text-emerald-100 mb-2">
                Capitals and punctuation!
              </p>
              <div className="bg-emerald-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-emerald-800">
                  {getLessonProgress(advancedTypingLessons)} / {advancedTypingLessons.length}
                </span>
              </div>
            </button>
          )}

          {internetSafetyLessons.length > 0 && shouldShowCategory('internet-safety') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'internet-safety')}
              className="bg-gradient-to-br from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Star className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Internet Safety</h3>
              </div>
              <p className="text-base text-red-100 mb-2">
                Stay safe online!
              </p>
              <div className="bg-red-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-red-800">
                  {getLessonProgress(internetSafetyLessons)} / {internetSafetyLessons.length}
                </span>
              </div>
            </button>
          )}

          {bonusSkillsLessons.length > 0 && shouldShowCategory('bonus-skills') && (
            <button
              onClick={() => handleLessonClick('lesson-selection', 'bonus-skills')}
              className="bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white rounded-full p-3 group-hover:animate-bounce">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-white">Bonus Skills</h3>
              </div>
              <p className="text-base text-yellow-100 mb-2">
                Extra helpful tips!
              </p>
              <div className="bg-yellow-300 rounded-full px-3 py-1 inline-block">
                <span className="text-sm font-bold text-yellow-800">
                  {getLessonProgress(bonusSkillsLessons)} / {bonusSkillsLessons.length}
                </span>
              </div>
            </button>
          )}
        </div>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-4 md:mb-6">🎮 Fun Games</h2>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <button
            onClick={() => handleLessonClick('mouse-maze')}
            className="bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl transform hover:scale-105 transition-all text-left group"
          >
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-2 md:mb-3">🏃</div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Mouse Maze</h3>
              <p className="text-sm md:text-lg text-green-100">Guide the star to the trophy!</p>
            </div>
          </button>

          <button
            onClick={() => handleLessonClick('typing-race')}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl transform hover:scale-105 transition-all text-left group"
          >
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-2 md:mb-3">⚡</div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Typing Race</h3>
              <p className="text-sm md:text-lg text-yellow-100">Type words as fast as you can!</p>
            </div>
          </button>

          <button
            onClick={() => handleLessonClick('coloring-game')}
            className="bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl transform hover:scale-105 transition-all text-left group"
          >
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-2 md:mb-3">🎨</div>
              <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Color & Click</h3>
              <p className="text-sm md:text-lg text-purple-100">Paint a colorful masterpiece!</p>
            </div>
          </button>
        </div>

        <button
          onClick={() => onNavigate('progress')}
          className="w-full bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-200 text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white rounded-full p-6 group-hover:animate-bounce">
                <Trophy className="w-12 h-12 text-orange-600" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-1">My Achievements</h2>
                <p className="text-xl text-orange-100">
                  See your badges and progress!
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-white mb-1">{completedCount}</div>
              <div className="text-lg text-orange-100">Lessons Done</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
