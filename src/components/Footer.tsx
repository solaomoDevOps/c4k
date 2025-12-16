import { Heart, Shield, Mail, BookOpen, Users, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigateToAbout?: () => void;
  onNavigate?: (page: string, category?: string) => void;
}

export default function Footer({ onNavigateToAbout, onNavigate }: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (page: string, category?: string) => {
    if (onNavigate) {
      onNavigate(page, category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <button
              onClick={() => handleNavigation('welcome')}
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Computer 4 Kids</h3>
            </button>
            <p className="text-blue-200 text-sm leading-relaxed">
              Making computer learning fun and safe for children ages 4-12. Building essential digital skills through interactive lessons and engaging games.
            </p>
          </div>

          {/* Learning Resources */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">Learning</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavigation('lesson-selection', 'mouse')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-yellow-400">→</span>
                  Mouse Skills
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('lesson-selection', 'keyboard')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-yellow-400">→</span>
                  Keyboard Skills
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('lesson-selection', 'internet-safety')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-yellow-400">→</span>
                  Internet Safety
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('dashboard')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-yellow-400">→</span>
                  Fun Games
                </button>
              </li>
            </ul>
          </div>

          {/* For Parents */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">For Parents</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavigation('parent')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-green-400">→</span>
                  Parent Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('progress')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-green-400">→</span>
                  Progress Tracking
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('lesson-selection', 'internet-safety')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-green-400">→</span>
                  Safety Tips
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('faq')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-green-400">→</span>
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Safety */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold">Safety First</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={onNavigateToAbout} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-pink-400">→</span>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('privacy')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-pink-400">→</span>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('terms')} className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="text-pink-400">→</span>
                  Terms of Use
                </button>
              </li>
              <li>
                <a href="mailto:support@computer4kids.com" className="text-blue-200 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li className="pt-2">
                <div className="bg-green-500/20 border-2 border-green-400 rounded-lg p-2">
                  <p className="text-green-300 text-xs font-semibold flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    100% Kid-Safe
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Fun Divider */}
        <div className="my-8 border-t-2 border-blue-700"></div>

        {/* Educational Values */}
        <div className="bg-gradient-to-r from-cyan-800/50 to-blue-800/50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold mb-3 text-center text-cyan-300">What We Teach</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-3xl mb-2">🖱️</div>
              <p className="text-xs font-semibold text-blue-200">Mouse Skills</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-3xl mb-2">⌨️</div>
              <p className="text-xs font-semibold text-blue-200">Typing Skills</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-xs font-semibold text-blue-200">Online Safety</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-xs font-semibold text-blue-200">Creativity</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-3xl mb-2">💻</div>
              <p className="text-xs font-semibold text-blue-200">Computer Basics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 border-t-2 border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-blue-300">
              <p>© {currentYear} Computer 4 Kids</p>
              <span className="hidden md:inline text-blue-700">|</span>
              <p className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-red-400 fill-red-400 animate-pulse" /> for kids everywhere
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-blue-300">
              <button onClick={() => handleNavigation('dashboard')} className="hover:text-white transition-colors duration-200">
                Accessibility
              </button>
              <span className="text-blue-700">|</span>
              <button onClick={() => handleNavigation('parent')} className="hover:text-white transition-colors duration-200">
                Help Center
              </button>
              <span className="text-blue-700">|</span>
              <button onClick={() => handleNavigation('dashboard')} className="hover:text-white transition-colors duration-200">
                Site Map
              </button>
            </div>
          </div>

          {/* Helpful Sites */}
          <div className="mt-4 pt-3 border-t border-blue-800">
            <p className="text-xs text-blue-400 text-center mb-2">Other helpful sites from our creator:</p>
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs">
              <a
                href="https://proconverthub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white transition-colors duration-200 underline"
              >
                ProConvertHub.com
              </a>
              <span className="text-blue-700 hidden sm:inline">|</span>
              <a
                href="https://siliconchase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white transition-colors duration-200 underline"
              >
                SiliconChase.com
              </a>
              <span className="text-blue-700 hidden sm:inline">|</span>
              <a
                href="https://radiantside.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-white transition-colors duration-200 underline"
              >
                RadiantSide.com
              </a>
            </div>
          </div>

          {/* Parent Note */}
          <div className="mt-3 text-center">
            <p className="text-xs text-blue-400">
              Parent supervision recommended • Educational platform for ages 4-12
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
