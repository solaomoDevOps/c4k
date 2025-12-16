import { useState } from 'react';
import { ArrowLeft, Settings, User, BarChart3, Clock, LogOut, Download } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ParentDashboardProps {
  onBack: () => void;
}

export default function ParentDashboard({ onBack }: ParentDashboardProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [error, setError] = useState('');

  const { currentChild, lessons, progress, settings, signOut, user } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [childName, setChildName] = useState(currentChild?.name || '');
  const [handPref, setHandPref] = useState(currentChild?.hand_preference || 'right');
  const [computerType, setComputerType] = useState(currentChild?.computer_type || 'pc');

  const handleUnlock = () => {
    if (parseInt(mathAnswer) === num1 + num2) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Oops! Try again.');
      setMathAnswer('');
    }
  };

  const handleSaveProfile = async () => {
    if (!currentChild) return;

    setEditMode(false);
    window.location.reload();
  };

  const handleDownloadProgress = () => {
    if (!currentChild) return;

    const progressData = {
      childName: currentChild.name,
      ageGroup: currentChild.age_group,
      level: currentChild.level,
      xp: currentChild.xp,
      currentStreak: currentChild.current_streak,
      totalLessonsCompleted: completedLessons.length,
      totalLessons: lessons.length,
      averageScore,
      totalTime,
      lessonsDetails: completedLessons.map(p => {
        const lesson = lessons.find(l => l.id === p.lesson_id);
        return {
          lessonTitle: lesson?.title,
          category: lesson?.category,
          score: p.score,
          attempts: p.attempts,
          timeSpent: p.time_spent,
          completedAt: p.completed_at
        };
      })
    };

    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentChild.name}-progress-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out? Make sure to save any progress first.')) {
      await signOut();
      window.location.href = '/';
    }
  };

  const completedLessons = progress.filter(p => p.completed);
  const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
  const totalTime = Math.floor(progress.reduce((sum, p) => sum + p.time_spent, 0) / 60);
  const averageScore = completedLessons.length > 0
    ? Math.round(totalScore / completedLessons.length)
    : 0;

  const mouseLessons = lessons.filter(l => l.category === 'mouse');
  const keyboardLessons = lessons.filter(l => l.category === 'keyboard');

  const mouseCompleted = completedLessons.filter(p =>
    mouseLessons.find(l => l.id === p.lesson_id)
  ).length;

  const keyboardCompleted = completedLessons.filter(p =>
    keyboardLessons.find(l => l.id === p.lesson_id)
  ).length;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-2xl text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-8 h-8" />
            <span>Back</span>
          </button>

          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
            <div className="mb-8">
              <Settings className="w-20 h-20 mx-auto text-gray-600" />
            </div>

            <h1 className="text-4xl font-bold mb-6 text-gray-700">Parent Mode</h1>

            <p className="text-xl text-gray-600 mb-8">
              Solve this math problem to continue:
            </p>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 mb-6">
              <div className="text-5xl font-bold text-gray-700 mb-4">
                {num1} + {num2} = ?
              </div>
            </div>

            <input
              type="number"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Your answer"
              className="w-full text-3xl p-4 border-4 border-blue-300 rounded-xl mb-4 text-center focus:border-blue-500 focus:outline-none"
              autoFocus
            />

            {error && (
              <p className="text-xl text-red-500 mb-4">{error}</p>
            )}

            <button
              onClick={handleUnlock}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-2xl text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
          <span>Back to Child Mode</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Parent Dashboard
          </h1>
          <p className="text-2xl text-gray-600">
            Monitor {currentChild?.name}'s learning progress
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <BarChart3 className="w-10 h-10 text-blue-500 mb-3" />
            <div className="text-4xl font-bold text-gray-800 mb-1">
              {completedLessons.length}/{lessons.length}
            </div>
            <div className="text-gray-600">Lessons Done</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-5xl mb-3">⭐</div>
            <div className="text-4xl font-bold text-gray-800 mb-1">{totalScore}</div>
            <div className="text-gray-600">Total Points</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <Clock className="w-10 h-10 text-green-500 mb-3" />
            <div className="text-4xl font-bold text-gray-800 mb-1">{totalTime}</div>
            <div className="text-gray-600">Minutes Learned</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-5xl mb-3">📊</div>
            <div className="text-4xl font-bold text-gray-800 mb-1">{averageScore}</div>
            <div className="text-gray-600">Avg Score</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <User className="w-8 h-8 text-blue-500" />
              Child Profile
            </h2>

            {!editMode ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Name</div>
                  <div className="text-2xl font-bold text-gray-700">{currentChild?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Hand Preference</div>
                  <div className="text-2xl font-bold text-gray-700 capitalize">
                    {currentChild?.hand_preference} Hand
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Computer Type</div>
                  <div className="text-2xl font-bold text-gray-700 capitalize">
                    {currentChild?.computer_type === 'mac' ? '🍎 Mac' : '💻 PC'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Age Group</div>
                  <div className="text-2xl font-bold text-gray-700">{currentChild?.age_group}</div>
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full text-xl p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Hand Preference</label>
                  <select
                    value={handPref}
                    onChange={(e) => setHandPref(e.target.value as 'left' | 'right')}
                    className="w-full text-xl p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="right">Right Hand</option>
                    <option value="left">Left Hand</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Computer Type</label>
                  <select
                    value={computerType}
                    onChange={(e) => setComputerType(e.target.value as 'mac' | 'pc')}
                    className="w-full text-xl p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="pc">💻 PC (Windows/Linux/Chromebook)</option>
                    <option value="mac">🍎 Mac</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setChildName(currentChild?.name || '');
                      setHandPref(currentChild?.hand_preference || 'right');
                      setComputerType(currentChild?.computer_type || 'pc');
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
              <Settings className="w-8 h-8 text-green-500" />
              Settings
            </h2>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Audio</div>
                <div className="text-xl text-gray-700">
                  {settings?.audio_enabled ? '🔊 Enabled' : '🔇 Disabled'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Text Size</div>
                <div className="text-xl text-gray-700 capitalize">{settings?.text_size}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Difficulty Level</div>
                <div className="text-xl text-gray-700">Level {settings?.difficulty_level}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Learning Progress by Category</h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-gray-700">🖱️ Mouse Lessons</span>
                <span className="text-xl text-gray-600">
                  {mouseCompleted} / {mouseLessons.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-gradient-to-r from-pink-400 to-rose-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end px-3"
                  style={{ width: `${(mouseCompleted / mouseLessons.length) * 100}%` }}
                >
                  <span className="text-sm font-bold text-white">
                    {Math.round((mouseCompleted / mouseLessons.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-gray-700">⌨️ Keyboard Lessons</span>
                <span className="text-xl text-gray-600">
                  {keyboardCompleted} / {keyboardLessons.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end px-3"
                  style={{ width: `${(keyboardCompleted / keyboardLessons.length) * 100}%` }}
                >
                  <span className="text-sm font-bold text-white">
                    {Math.round((keyboardCompleted / keyboardLessons.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Parent Tips</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Encourage your child to practice for 10-15 minutes daily</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Celebrate completed lessons and earned badges together</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Sit with your child during lessons to provide support</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Let them repeat lessons to build confidence and skill</span>
            </li>
          </ul>
        </div>

        {user && (
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleDownloadProgress}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              <span className="text-xl">Download Progress Report</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xl">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
