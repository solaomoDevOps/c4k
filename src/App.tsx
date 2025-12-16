import { useState, useEffect } from 'react';
import { Mail, Monitor } from 'lucide-react';
import { AppProvider, useApp } from './contexts/AppContext';
import { VoiceProvider } from './contexts/VoiceContext';
import WelcomeScreen from './components/WelcomeScreen';
import ChildDashboard from './components/ChildDashboard';
import MouseLesson from './components/lessons/MouseLesson';
import KeyboardLesson from './components/lessons/KeyboardLesson';
import GenericLesson from './components/lessons/GenericLesson';
import ProgressPage from './components/ProgressPage';
import ParentDashboard from './components/ParentDashboard';
import MouseMaze from './components/minigames/MouseMaze';
import TypingRace from './components/minigames/TypingRace';
import ColoringGame from './components/minigames/ColoringGame';
import DailyRewardModal from './components/DailyRewardModal';
import LessonSelection from './components/LessonSelection';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import FAQ from './components/FAQ';

type Page = 'welcome' | 'dashboard' | 'lesson-selection' | 'mouse-lesson' | 'keyboard-lesson' | 'generic-lesson' | 'progress' | 'parent' | 'mouse-maze' | 'typing-race' | 'coloring-game' | 'about' | 'privacy' | 'terms' | 'faq';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { currentChild, user, isEmailVerified, addXP, isReturningUser } = useApp();

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

  useEffect(() => {
    if (currentChild && isReturningUser && currentPage === 'welcome') {
      setCurrentPage('dashboard');
    }
  }, [currentChild, isReturningUser, currentPage]);

  const navigateTo = (page: Page, lessonIdOrCategory?: string) => {
    const lessonPages: Page[] = ['lesson-selection', 'mouse-lesson', 'keyboard-lesson', 'generic-lesson', 'mouse-maze', 'typing-race', 'coloring-game'];

    if (isMobile && lessonPages.includes(page)) {
      return;
    }

    if (page === 'lesson-selection' && lessonIdOrCategory) {
      setSelectedCategory(lessonIdOrCategory);
    } else if (lessonIdOrCategory) {
      setSelectedLessonId(lessonIdOrCategory);
    }
    setCurrentPage(page);
  };

  const handleMiniGameComplete = async (score: number) => {
    await addXP(score);
    navigateTo('dashboard');
  };

  const showHeader = currentChild !== null && (user === null || isEmailVerified) && currentPage !== 'welcome';

  if (user && !isEmailVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-2xl">
          <div className="mb-6">
            <div className="bg-yellow-100 rounded-full p-6 inline-block">
              <Mail className="w-16 h-16 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Verify Your Email</h2>
          <p className="text-xl text-gray-600 mb-8">
            Please check your email and click the verification link to continue. Once verified, you can start learning!
          </p>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </div>
    );
  }

  const publicPages: Page[] = ['welcome', 'about', 'privacy', 'terms', 'faq'];

  if (!currentChild && !publicPages.includes(currentPage)) {
    return <WelcomeScreen onComplete={() => navigateTo('dashboard')} />;
  }

  const lessonPages: Page[] = ['lesson-selection', 'mouse-lesson', 'keyboard-lesson', 'generic-lesson', 'mouse-maze', 'typing-race', 'coloring-game'];

  if (isMobile && currentChild && lessonPages.includes(currentPage)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-2xl">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full p-6 inline-block">
              <Monitor className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Desktop Required</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Lessons and games require a desktop or laptop computer with a keyboard and mouse. Please switch to a computer to begin learning.
          </p>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 flex flex-col">
      <DailyRewardModal />

      {showHeader && (
        <Header
          currentPage={currentPage}
          onNavigate={navigateTo}
          showNavigation={currentPage !== 'welcome'}
        />
      )}

      <main className="flex-1">
        {currentPage === 'welcome' && (
          <WelcomeScreen onComplete={() => navigateTo('dashboard')} />
        )}

        {currentPage === 'dashboard' && (
          <ChildDashboard onNavigate={navigateTo} />
        )}

        {currentPage === 'lesson-selection' && selectedCategory && (
          <LessonSelection
            category={selectedCategory}
            onBack={() => navigateTo('dashboard')}
            onSelectLesson={(lessonId) => {
              setSelectedLessonId(lessonId);
              const category = selectedCategory;
              if (category === 'mouse') navigateTo('mouse-lesson', lessonId);
              else if (category === 'keyboard') navigateTo('keyboard-lesson', lessonId);
              else navigateTo('generic-lesson', lessonId);
            }}
          />
        )}

        {currentPage === 'mouse-lesson' && selectedLessonId && (
          <MouseLesson
            lessonId={selectedLessonId}
            onBack={() => navigateTo('lesson-selection', selectedCategory || 'mouse')}
            onComplete={() => navigateTo('progress')}
          />
        )}

        {currentPage === 'keyboard-lesson' && selectedLessonId && (
          <KeyboardLesson
            lessonId={selectedLessonId}
            onBack={() => navigateTo('lesson-selection', selectedCategory || 'keyboard')}
            onComplete={() => navigateTo('progress')}
          />
        )}

        {currentPage === 'generic-lesson' && selectedLessonId && (
          <GenericLesson
            lessonId={selectedLessonId}
            onBack={() => navigateTo('lesson-selection', selectedCategory || 'computer-basics')}
          />
        )}

        {currentPage === 'progress' && (
          <ProgressPage onBack={() => navigateTo('dashboard')} />
        )}

        {currentPage === 'parent' && (
          <ParentDashboard onBack={() => navigateTo('dashboard')} />
        )}

        {currentPage === 'mouse-maze' && (
          <MouseMaze
            onComplete={handleMiniGameComplete}
            onExit={() => navigateTo('dashboard')}
          />
        )}

        {currentPage === 'typing-race' && (
          <TypingRace
            onComplete={handleMiniGameComplete}
            onExit={() => navigateTo('dashboard')}
          />
        )}

        {currentPage === 'coloring-game' && (
          <ColoringGame
            onComplete={handleMiniGameComplete}
            onExit={() => navigateTo('dashboard')}
          />
        )}

        {currentPage === 'about' && (
          <AboutUs onBack={() => navigateTo(currentChild ? 'dashboard' : 'welcome')} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy onBack={() => navigateTo(currentChild ? 'dashboard' : 'welcome')} />
        )}

        {currentPage === 'terms' && (
          <TermsOfUse
            onBack={() => navigateTo(currentChild ? 'dashboard' : 'welcome')}
            onNavigateToPrivacy={() => navigateTo('privacy')}
          />
        )}

        {currentPage === 'faq' && (
          <FAQ onBack={() => navigateTo(currentChild ? 'dashboard' : 'welcome')} />
        )}
      </main>

      {currentPage === 'welcome' || (currentChild && currentPage !== 'about' && currentPage !== 'privacy' && currentPage !== 'terms' && currentPage !== 'faq') ? (
        <Footer
          onNavigateToAbout={() => navigateTo('about')}
          onNavigate={(page, category) => navigateTo(page as Page, category)}
        />
      ) : null}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <VoiceProvider>
        <AppContent />
      </VoiceProvider>
    </AppProvider>
  );
}

export default App;
