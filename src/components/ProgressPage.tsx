import { ArrowLeft, Trophy, Star, Award, Zap, Target, Medal } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ProgressPageProps {
  onBack: () => void;
}

export default function ProgressPage({ onBack }: ProgressPageProps) {
  const { currentChild, lessons, progress } = useApp();

  const completedLessons = progress.filter(p => p.completed);
  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
  const totalTime = progress.reduce((sum, p) => sum + p.time_spent, 0);

  const mouseLessons = lessons.filter(l => l.category === 'mouse');
  const keyboardLessons = lessons.filter(l => l.category === 'keyboard');

  const mouseCompleted = completedLessons.filter(p =>
    mouseLessons.find(l => l.id === p.lesson_id)
  ).length;

  const keyboardCompleted = completedLessons.filter(p =>
    keyboardLessons.find(l => l.id === p.lesson_id)
  ).length;

  const badges = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: Star,
      earned: completedLessons.length >= 1,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      title: 'Mouse Master',
      description: 'Complete all mouse lessons',
      icon: Target,
      earned: mouseCompleted === mouseLessons.length,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 3,
      title: 'Typing Pro',
      description: 'Complete all keyboard lessons',
      icon: Zap,
      earned: keyboardCompleted === keyboardLessons.length,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 4,
      title: 'Perfect Score',
      description: 'Score 100 in any lesson',
      icon: Trophy,
      earned: progress.some(p => p.score >= 100),
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 5,
      title: 'Super Student',
      description: 'Complete all lessons',
      icon: Award,
      earned: completedLessons.length === lessons.length,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 6,
      title: 'Speed Learner',
      description: 'Spend 30 minutes learning',
      icon: Medal,
      earned: totalTime >= 1800,
      color: 'from-red-400 to-orange-500'
    }
  ];

  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-2xl text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
            {currentChild?.name}'s Progress
          </h1>
          <p className="text-3xl text-gray-600">
            Look at all your amazing achievements!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl p-8 shadow-xl text-white">
            <Trophy className="w-16 h-16 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-center mb-2">{completedLessons.length}</div>
            <div className="text-xl text-center">Lessons Completed</div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 shadow-xl text-white">
            <Star className="w-16 h-16 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-center mb-2">{totalScore}</div>
            <div className="text-xl text-center">Total Points</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 shadow-xl text-white">
            <Award className="w-16 h-16 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-center mb-2">{earnedBadges.length}</div>
            <div className="text-xl text-center">Badges Earned</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-4xl font-bold mb-8 text-gray-700 flex items-center gap-3">
            <Award className="w-10 h-10 text-yellow-500" />
            Your Badges
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {badges.map(badge => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-6 transition-all duration-300 ${
                    badge.earned
                      ? `bg-gradient-to-br ${badge.color} text-white shadow-xl transform hover:scale-105`
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`rounded-full p-4 ${badge.earned ? 'bg-white bg-opacity-30' : 'bg-gray-200'}`}>
                      <IconComponent className="w-12 h-12" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">{badge.title}</h3>
                  <p className="text-center text-sm">{badge.description}</p>
                  {badge.earned && (
                    <div className="mt-4 text-center text-2xl animate-bounce">🎉</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-pink-600">
              🖱️ Mouse Lessons
            </h2>
            <div className="space-y-4">
              {mouseLessons.map(lesson => {
                const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-xl ${
                      lessonProgress?.completed
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-gray-700">{lesson.title}</div>
                        {lessonProgress && (
                          <div className="text-sm text-gray-600">
                            Score: {lessonProgress.score} points
                          </div>
                        )}
                      </div>
                      {lessonProgress?.completed && (
                        <div className="text-4xl">✅</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">
              ⌨️ Keyboard Lessons
            </h2>
            <div className="space-y-4">
              {keyboardLessons.map(lesson => {
                const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className={`p-4 rounded-xl ${
                      lessonProgress?.completed
                        ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-400'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-gray-700">{lesson.title}</div>
                        {lessonProgress && (
                          <div className="text-sm text-gray-600">
                            Score: {lessonProgress.score} points
                          </div>
                        )}
                      </div>
                      {lessonProgress?.completed && (
                        <div className="text-4xl">✅</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
