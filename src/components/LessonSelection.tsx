import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Lock, CheckCircle, UserPlus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import VoiceButton from './VoiceButton';
import AuthModal from './AuthModal';
import MobileWarning from './MobileWarning';

interface LessonSelectionProps {
  category: string;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function LessonSelection({ category, onBack, onSelectLesson }: LessonSelectionProps) {
  const { lessons, progress, user } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [isMobile, setIsMobile] = useState(false);

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

  const isGuestMode = !user;
  const completedLessonsCount = progress.filter(p => p.completed).length;

  const categoryLessons = lessons
    .filter(l => l.category === category)
    .sort((a, b) => (a.lesson_number || 0) - (b.lesson_number || 0));

  const categoryInfo: Record<string, { name: string; color: string; icon: string; description: string }> = {
    'mouse': {
      name: 'Mouse Skills',
      color: 'from-pink-400 to-rose-500',
      icon: '🖱️',
      description: 'Master clicking, dragging, and moving the mouse!'
    },
    'keyboard': {
      name: 'Keyboard Skills',
      color: 'from-blue-400 to-cyan-500',
      icon: '⌨️',
      description: 'Learn to type letters, words, and more!'
    },
    'computer-basics': {
      name: 'Computer Basics',
      color: 'from-orange-400 to-red-500',
      icon: '💻',
      description: 'Understand how computers work!'
    },
    'navigation': {
      name: 'Navigation',
      color: 'from-teal-400 to-cyan-500',
      icon: '🧭',
      description: 'Learn to use windows and menus!'
    },
    'files': {
      name: 'Files & Folders',
      color: 'from-amber-400 to-orange-500',
      icon: '📁',
      description: 'Organize your computer files!'
    },
    'creative-tools': {
      name: 'Creative Tools',
      color: 'from-fuchsia-400 to-pink-500',
      icon: '🎨',
      description: 'Draw, create, and express yourself!'
    },
    'advanced-typing': {
      name: 'Advanced Typing',
      color: 'from-emerald-400 to-green-500',
      icon: '⚡',
      description: 'Take your typing to the next level!'
    },
    'internet-safety': {
      name: 'Internet Safety',
      color: 'from-red-400 to-rose-500',
      icon: '🛡️',
      description: 'Stay safe while browsing online!'
    },
    'bonus-skills': {
      name: 'Bonus Skills',
      color: 'from-yellow-400 to-amber-500',
      icon: '⭐',
      description: 'Extra tips and tricks!'
    }
  };

  const info = categoryInfo[category] || {
    name: category,
    color: 'from-blue-400 to-cyan-500',
    icon: '📚',
    description: 'Learn new computer skills!'
  };

  const getFreeLessons = () => {
    const allLessons = [...lessons].sort((a, b) => {
      if (a.category === b.category) {
        return (a.lesson_number || 0) - (b.lesson_number || 0);
      }
      const categoryOrder = ['mouse', 'keyboard', 'computer-basics', 'navigation', 'files', 'creative-tools', 'advanced-typing', 'internet-safety', 'bonus-skills'];
      return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    });

    return allLessons.slice(0, 2).map(l => l.id);
  };

  const getLessonStatus = (lessonId: string) => {
    const lessonProgress = progress.find(p => p.lesson_id === lessonId);
    if (lessonProgress?.completed) return 'completed';

    if (isGuestMode) {
      const freeLessons = getFreeLessons();
      if (!freeLessons.includes(lessonId)) {
        return 'locked';
      }
    }

    return 'available';
  };

  const handleLessonClick = (lessonId: string, status: string) => {
    if (isMobile) {
      alert('Lessons require a desktop or laptop computer with a keyboard and mouse. Please switch to a computer to begin learning.');
      return;
    }
    if (status === 'locked') {
      setAuthMode('signup');
      setShowAuthModal(true);
    } else {
      onSelectLesson(lessonId);
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array(difficulty).fill('⭐').join('');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
          }}
        />
      )}

      <div className="max-w-5xl mx-auto">
        {isMobile && <MobileWarning allowRegistration={false} />}

        <button
          onClick={onBack}
          className="mb-6 md:mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-base md:text-xl font-bold">Back to Dashboard</span>
        </button>

        <div className={`bg-gradient-to-br ${info.color} rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 shadow-2xl`}>
          <div className="text-center">
            <div className="text-5xl md:text-7xl mb-3 md:mb-4">{info.icon}</div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3">{info.name}</h1>
            <p className="text-lg md:text-2xl text-white opacity-90">{info.description}</p>
          </div>
        </div>

        {isGuestMode && (
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-xl text-center">
            <UserPlus className="w-10 h-10 md:w-12 md:h-12 text-white mx-auto mb-2 md:mb-3" />
            <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">Guest Mode - Limited Access</h3>
            <p className="text-base md:text-xl text-white opacity-90 mb-3 md:mb-4">
              You can try 2 lessons for free as a guest. Register for free to unlock all {lessons.length} lessons and track your progress!
            </p>
            <button
              onClick={() => {
                setAuthMode('signup');
                setShowAuthModal(true);
              }}
              className="bg-white text-orange-600 font-bold text-base md:text-xl px-6 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Create Free Account
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {categoryLessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id);
            const isCompleted = status === 'completed';
            const isLocked = status === 'locked';

            return (
              <VoiceButton
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.id, status)}
                voiceText={`Lesson ${lesson.lesson_number}: ${lesson.title}`}
                disabled={isLocked}
                className={`relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl transform hover:scale-105 transition-all text-left group ${
                  isCompleted ? 'border-4 border-green-400' :
                  isLocked ? 'border-4 border-gray-300 opacity-60' :
                  'border-4 border-gray-200'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-8 h-8 text-green-500 fill-green-100" />
                  </div>
                )}

                {isLocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-8 h-8 text-gray-500" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${info.color} rounded-2xl p-4 text-4xl font-bold text-white min-w-[80px] text-center`}>
                    {lesson.lesson_number}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-3">
                      {lesson.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getDifficultyStars(lesson.difficulty)}</span>
                      </div>

                      {isCompleted && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          ✓ Completed
                        </div>
                      )}

                      {isLocked && (
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Lock className="w-4 h-4" />
                          Register to Unlock
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </VoiceButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
