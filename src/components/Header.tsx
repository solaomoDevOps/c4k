import { useState } from 'react';
import { Star, User, Menu, X, Home, BarChart3, Settings, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import VoiceToggle from './VoiceToggle';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  showNavigation?: boolean;
}

export default function Header({ currentPage, onNavigate, showNavigation = true }: HeaderProps) {
  const { currentChild, isReturningUser, signOut } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-blue-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 group"
          >
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 transition-all duration-300">
              computer4kids
            </h1>
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <VoiceToggle position="static" size="medium" />
            </div>

            {showNavigation && currentChild && (
              <>
                <nav className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      currentPage === 'dashboard'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Home
                  </button>
                  <button
                    onClick={() => onNavigate('progress')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      currentPage === 'progress'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Progress
                  </button>
                  <button
                    onClick={() => onNavigate('parent')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                      currentPage === 'parent'
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Parent
                  </button>
                </nav>

                <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-xl border-2 border-yellow-300">
                  <div className="text-3xl">{currentChild.avatar}</div>
                  <div>
                    {isReturningUser && (
                      <p className="text-xs text-gray-600">Welcome back!</p>
                    )}
                    <p className="font-bold text-gray-800 text-sm">{currentChild.name}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-yellow-600 text-sm">{currentChild.xp || 0}</span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-xl shadow-md"
                >
                  {menuOpen ? <X className="w-6 h-6" />: <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>

        {menuOpen && showNavigation && currentChild && (
          <div className="md:hidden py-4 border-t-2 border-blue-100 animate-fade-in">
            <div className="flex flex-col gap-2">
              <div className="mb-3">
                <VoiceToggle position="static" size="medium" />
              </div>

              <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-3 rounded-xl border-2 border-yellow-300 mb-3">
                <div className="text-4xl">{currentChild.avatar}</div>
                <div className="flex-1">
                  {isReturningUser && (
                    <p className="text-sm text-gray-600">Welcome back!</p>
                  )}
                  <p className="font-bold text-gray-800">{currentChild.name}</p>
                </div>
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-yellow-600">{currentChild.xp || 0}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                  currentPage === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('progress');
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                  currentPage === 'progress'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Progress
              </button>
              <button
                onClick={() => {
                  onNavigate('parent');
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                  currentPage === 'parent'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-700 hover:bg-orange-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                Parent Dashboard
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
