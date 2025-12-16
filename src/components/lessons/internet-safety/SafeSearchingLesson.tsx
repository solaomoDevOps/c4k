import { useState, useEffect } from 'react';
import { Search, Star, CheckCircle, Sparkles } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface SafeSearchingLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface SearchItem {
  query: string;
  icon: string;
  result: string;
}

export default function SafeSearchingLesson({ onBack, onComplete }: SafeSearchingLessonProps) {
  const [step, setStep] = useState<'intro' | 'demo' | 'practice' | 'treasure' | 'complete'>('intro');
  const [currentSearch, setCurrentSearch] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [treasuresFound, setTreasuresFound] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const practiceSearches: SearchItem[] = [
    { query: 'cats', icon: '🐱', result: 'Look at all these cute cats!' },
    { query: 'cars', icon: '🚗', result: 'Wow, so many cool cars!' },
    { query: 'colors', icon: '🎨', result: 'Beautiful rainbow colors!' },
  ];

  const treasureSearches: SearchItem[] = [
    { query: 'dinosaur', icon: '🦕', result: 'You found a dinosaur!' },
    { query: 'rocket', icon: '🚀', result: 'You found a rocket!' },
    { query: 'rainbow', icon: '🌈', result: 'You found a rainbow!' },
  ];

  const currentPractice = practiceSearches[currentSearch];
  const currentTreasure = treasureSearches[currentSearch];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((step === 'practice' || step === 'treasure') && !showResult) {
        if (e.key === 'Enter') {
          handleSearch();
        } else if (e.key === 'Backspace') {
          setSearchText(prev => prev.slice(0, -1));
        } else if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
          setSearchText(prev => prev + e.key.toLowerCase());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, showResult, searchText]);

  const handleSearch = () => {
    const targetQuery = step === 'practice' ? currentPractice.query : currentTreasure.query;

    if (searchText.toLowerCase() === targetQuery.toLowerCase()) {
      setShowResult(true);
      if (step === 'treasure') {
        setTreasuresFound(treasuresFound + 1);
      }

      setTimeout(() => {
        setShowResult(false);
        setSearchText('');

        if (step === 'practice') {
          if (currentSearch < practiceSearches.length - 1) {
            setCurrentSearch(currentSearch + 1);
          } else {
            setCurrentSearch(0);
            setStep('treasure');
          }
        } else if (step === 'treasure') {
          if (currentSearch < treasureSearches.length - 1) {
            setCurrentSearch(currentSearch + 1);
          } else {
            setShowConfetti(true);
            setStep('complete');
            setTimeout(onComplete, 3000);
          }
        }
      }, 2500);
    }
  };

  const getProgress = () => {
    if (step === 'intro') return 15;
    if (step === 'demo') return 30;
    if (step === 'practice') return 55;
    if (step === 'treasure') return 80;
    return 100;
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Safe Searching"
        instructions="Learn to search safely on the internet"
        voiceIntro="Let's learn how to search for things safely online!"
        onBack={onBack}
        progress={getProgress()}
        showMascot={true}
        mascotMessage={
          step === 'intro' ? 'Searching is fun!' :
          step === 'demo' ? 'Watch how to search!' :
          showResult ? 'You found it!' :
          'Type and press Enter!'
        }
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <Search className="w-32 h-32 text-blue-500 mx-auto mb-6" />
                <h2 className="text-5xl font-bold text-gray-800 mb-6">Safe Searching</h2>
                <p className="text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  A search bar helps you find things on the internet!
                  Let's learn how to use it safely with a parent nearby.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-12 max-w-3xl border-4 border-blue-400">
                <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">Safe Searching Rules:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">1️⃣</span>
                    </div>
                    <p className="text-2xl text-blue-900">Always have a parent nearby</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">2️⃣</span>
                    </div>
                    <p className="text-2xl text-blue-900">Only search for safe things</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-2xl">3️⃣</span>
                    </div>
                    <p className="text-2xl text-blue-900">Ask before clicking anything</p>
                  </div>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('demo')}
                voiceText="See how searching works"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Show Me How!
              </VoiceButton>
            </>
          )}

          {step === 'demo' && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">How to Search</h2>
              </div>

              <div className="space-y-8 max-w-4xl">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-8 border-4 border-green-400">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="text-3xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="text-3xl font-bold text-green-800">Type Your Word</h3>
                  </div>
                  <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
                    <Search className="w-10 h-10 text-gray-400" />
                    <span className="text-3xl text-gray-600 font-mono">puppy</span>
                    <span className="text-2xl animate-pulse">|</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-400">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="text-3xl font-bold text-orange-600">2</span>
                    </div>
                    <h3 className="text-3xl font-bold text-orange-800">Press Enter</h3>
                  </div>
                  <div className="bg-white rounded-2xl p-6 flex items-center justify-center gap-4">
                    <span className="text-3xl font-bold text-orange-600">Press</span>
                    <div className="bg-orange-500 text-white px-8 py-4 rounded-xl text-2xl font-bold">
                      Enter ⏎
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-400">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="text-3xl font-bold text-purple-800">See Results!</h3>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center">
                    <div className="text-6xl mb-4">🐶</div>
                    <p className="text-2xl text-purple-900">Look at all the puppies!</p>
                  </div>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('practice')}
                voiceText="Practice searching"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Let Me Try!
              </VoiceButton>
            </>
          )}

          {(step === 'practice' || step === 'treasure') && !showResult && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-blue-600 mb-4">
                  {step === 'practice' ? 'Practice Searching' : 'Treasure Hunt!'}
                </h2>
                <p className="text-2xl text-gray-700">
                  {step === 'practice' ? 'Type this word:' : 'Search for this treasure:'}
                </p>
              </div>

              {/* Target Word */}
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-400">
                <div className="flex items-center gap-6">
                  <div className="text-8xl">
                    {step === 'practice' ? currentPractice.icon : currentTreasure.icon}
                  </div>
                  <div>
                    <p className="text-xl text-orange-700 mb-2">Type this word:</p>
                    <p className="text-5xl font-bold text-orange-800">
                      {step === 'practice' ? currentPractice.query : currentTreasure.query}
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-blue-400 w-full max-w-3xl">
                <div className="flex items-center gap-6">
                  <Search className="w-12 h-12 text-blue-500" />
                  <div className="flex-1 text-4xl font-mono text-gray-800">
                    {searchText || <span className="text-gray-300">Start typing...</span>}
                    <span className="animate-pulse">|</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 border-4 border-blue-400 rounded-2xl p-6">
                <p className="text-2xl text-blue-800 font-bold">
                  Type the word, then press Enter! ⏎
                </p>
              </div>

              {step === 'treasure' && (
                <div className="flex items-center gap-3">
                  <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  <span className="text-3xl font-bold text-gray-700">
                    Treasures Found: {treasuresFound}
                  </span>
                </div>
              )}
            </>
          )}

          {(step === 'practice' || step === 'treasure') && showResult && (
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-16 border-4 border-green-500 animate-fade-in text-center">
              <Sparkles className="w-24 h-24 text-green-600 mx-auto mb-6" />
              <div className="text-9xl mb-6">
                {step === 'practice' ? currentPractice.icon : currentTreasure.icon}
              </div>
              <h3 className="text-5xl font-bold text-green-700 mb-4">Amazing!</h3>
              <p className="text-3xl text-green-800">
                {step === 'practice' ? currentPractice.result : currentTreasure.result}
              </p>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Search Expert!</h2>
              <div className="text-8xl mb-6">🏆</div>
              <p className="text-3xl text-gray-700 mb-4">
                You found all {treasuresFound} treasures!
              </p>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
                You know how to search safely with a parent nearby!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
