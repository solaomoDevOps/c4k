import { useState, useEffect } from 'react';
import { Sparkles, Hand, Monitor, Laptop, User, LogIn, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import MobileWarning from './MobileWarning';
import AuthModal from './AuthModal';
import { detectOS, validateComputerType, getOSDisplayName, type OSType } from '../utils/osDetection';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  type StepType = 'intro' | 'choice' | 'name' | 'age' | 'computer' | 'hand' | 'career';
  const [step, setStep] = useState<StepType>('intro');
  const [stepHistory, setStepHistory] = useState<StepType[]>(['intro']);
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [computerType, setComputerType] = useState<'mac' | 'pc'>('pc');
  const [handPreference, setHandPreference] = useState<'left' | 'right'>('right');
  const [careerRole, setCareerRole] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [guestMode, setGuestMode] = useState(false);
  const [detectedOS, setDetectedOS] = useState<OSType>('unknown');
  const [osValidationMessage, setOsValidationMessage] = useState('');
  const [showOSWarning, setShowOSWarning] = useState(false);
  const { createChild, currentChild, user } = useApp();

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
    const os = detectOS();
    setDetectedOS(os);
  }, []);

  useEffect(() => {
    if (user && !guestMode && !currentChild) {
      const timer = setTimeout(() => {
        setStep('name');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, guestMode, currentChild]);

  useEffect(() => {
    if (currentChild && user && !guestMode) {
      onComplete();
    }
  }, [currentChild, user, guestMode, onComplete]);

  const navigateToStep = (newStep: StepType) => {
    setStep(newStep);
    setStepHistory([...stepHistory, newStep]);
  };

  const handleStart = () => {
    navigateToStep('choice');
  };

  const handleGuestMode = () => {
    setGuestMode(true);
    navigateToStep('name');
  };

  const handleShowAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = async () => {
    setShowAuthModal(false);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      navigateToStep('age');
    }
  };

  const handleAgeSubmit = () => {
    navigateToStep('computer');
  };

  const handleComputerSubmit = () => {
    const validation = validateComputerType(computerType, detectedOS);

    if (!validation.isValid) {
      setOsValidationMessage(validation.message || 'Please select the correct computer type.');
      setShowOSWarning(true);
    } else {
      setShowOSWarning(false);
      setOsValidationMessage('');
      navigateToStep('hand');
    }
  };


  const handleHandSubmit = () => {
    navigateToStep('career');
  };

  const handleComplete = async () => {
    if (name.trim() && careerRole) {
      try {
        localStorage.setItem('isGuest', guestMode ? 'true' : 'false');
        await createChild(name.trim(), handPreference, computerType, guestMode, careerRole, ageGroup);
        onComplete();
      } catch (error) {
        console.error('Error creating child:', error);
        alert('There was an error creating your profile. Please try again.');
      }
    }
  };

  const handleBackToHome = () => {
    setStep('intro');
    setStepHistory(['intro']);
    setName('');
    setAgeGroup('5-7');
    setComputerType('pc');
    setHandPreference('right');
    setCareerRole('');
    setGuestMode(false);
  };

  const handleBack = () => {
    if (stepHistory.length <= 1) {
      handleBackToHome();
    } else {
      const newHistory = [...stepHistory];
      newHistory.pop();
      const previousStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setStep(previousStep);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      <div className="max-w-2xl w-full">
        {step === 'intro' && (
          <div className="text-center animate-fade-in">
            <div className="mb-8 flex justify-center">
              <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-8 shadow-2xl animate-bounce">
                <Sparkles className="w-24 h-24 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              computer4kids
            </h1>

            <p className="text-2xl md:text-3xl text-gray-700 mb-12 font-semibold px-4">
              Fun and interactive computer learning for kids!
            </p>

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200 animate-pulse"
            >
              Let's Start!
            </button>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-4 text-gray-600">
              <a
                href="/about-us.html"
                target="_blank"
                className="hover:text-blue-600 font-semibold transition-colors"
              >
                About Us
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/privacy-policy.html"
                target="_blank"
                className="hover:text-blue-600 font-semibold transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400">|</span>
              <a
                href="/terms-of-use.html"
                target="_blank"
                className="hover:text-blue-600 font-semibold transition-colors"
              >
                Terms of Use
              </a>
            </div>

            {isMobile && (
              <div className="mt-8">
                <MobileWarning allowRegistration={true} />
              </div>
            )}
          </div>
        )}

        {step === 'choice' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-blue-600">Choose Your Path</h2>
            <p className="text-2xl text-gray-600 mb-12">
              Would you like to try it out or create an account?
            </p>

            <div className="space-y-4 mb-8">
              <button
                onClick={handleGuestMode}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-4"
              >
                <User className="w-10 h-10" />
                Try as Guest
              </button>
              <p className="text-sm text-gray-500 -mt-2">
                Test the site without signing up. Progress won't be saved.
              </p>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 font-bold">OR</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleShowAuth('signup')}
                className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-4"
              >
                <Sparkles className="w-10 h-10" />
                Create Account
              </button>
              <p className="text-sm text-gray-500 -mt-2">
                Save your progress and access from any device!
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handleShowAuth('signin')}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xl flex items-center gap-2 mx-auto"
              >
                <LogIn className="w-5 h-5" />
                Already have an account? Sign In
              </button>
            </div>
          </div>
        )}

        {step === 'name' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>
            <div className="mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full p-6 inline-block mb-4">
                <Sparkles className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-4 text-blue-600">
              {guestMode ? "Let's Get Started!" : "Let's Setup Your Profile"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {guestMode ? "Tell us a bit about yourself!" : "Tell us a bit about yourself to get started!"}
            </p>

            <label className="block text-2xl font-semibold text-gray-700 mb-3 text-left">What's your name?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              placeholder="Type your name here"
              className="w-full text-3xl p-6 border-4 border-blue-300 rounded-2xl mb-8 text-center focus:border-blue-500 focus:outline-none"
              autoFocus
            />

            <button
              onClick={handleNameSubmit}
              disabled={!name.trim()}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 disabled:from-gray-300 disabled:to-gray-400 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {step === 'age' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>
            <h2 className="text-5xl font-bold mb-8 text-blue-600">
              What grade are you in?
            </h2>

            <p className="text-2xl text-gray-600 mb-12">
              This helps us customize the learning experience for you!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={() => setAgeGroup('5-7')}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 min-h-[240px] ${
                  ageGroup === '5-7'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className="text-6xl mb-4">🌟</span>
                <span className="text-2xl font-bold text-gray-700 leading-tight text-center px-2">Kindergarten - 1st Grade</span>
                <span className="text-lg text-gray-500 mt-3">Ages 5-7</span>
              </button>

              <button
                onClick={() => setAgeGroup('8-10')}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 min-h-[240px] ${
                  ageGroup === '8-10'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className="text-6xl mb-4">⭐</span>
                <span className="text-2xl font-bold text-gray-700 leading-tight text-center px-2">2nd - 4th Grade</span>
                <span className="text-lg text-gray-500 mt-3">Ages 8-10</span>
              </button>

              <button
                onClick={() => setAgeGroup('11-13')}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 min-h-[240px] ${
                  ageGroup === '11-13'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span className="text-6xl mb-4">💫</span>
                <span className="text-2xl font-bold text-gray-700 leading-tight text-center px-2">5th - 8th Grade</span>
                <span className="text-lg text-gray-500 mt-3">Ages 11-13</span>
              </button>
            </div>

            <button
              onClick={handleAgeSubmit}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}

        {step === 'computer' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>
            <h2 className="text-5xl font-bold mb-8 text-blue-600">
              What type of computer do you have?
            </h2>

            <p className="text-2xl text-gray-600 mb-12">
              This helps us show you the right keyboard keys!
            </p>

            <div className="flex gap-8 justify-center mb-12">
              <button
                onClick={() => setComputerType('pc')}
                className={`flex flex-col items-center p-8 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 ${
                  computerType === 'pc'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Monitor className="w-32 h-32 mb-4 text-blue-500" />
                <span className="text-3xl font-bold text-gray-700">Windows PC</span>
                <span className="text-xl text-gray-500 mt-2">Windows, Linux, Chromebook</span>
              </button>

              <button
                onClick={() => setComputerType('mac')}
                className={`flex flex-col items-center p-8 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 ${
                  computerType === 'mac'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Laptop className="w-32 h-32 mb-4 text-blue-500" />
                <span className="text-3xl font-bold text-gray-700">Mac</span>
                <span className="text-xl text-gray-500 mt-2">MacBook, iMac</span>
              </button>
            </div>

            <div className="mb-6 text-center">
              <p className="text-lg text-gray-500">
                We detected you're using: <span className="font-bold text-blue-600">{getOSDisplayName(detectedOS)}</span>
              </p>
            </div>

            <button
              onClick={handleComputerSubmit}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}

        {showOSWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-orange-100 rounded-full p-4 mb-4">
                  <AlertTriangle className="w-16 h-16 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 text-center">Computer Type Mismatch</h2>
              </div>

              <div className="bg-orange-50 border-2 border-orange-400 rounded-2xl p-4 mb-6">
                <p className="text-lg text-gray-700 text-center">{osValidationMessage}</p>
              </div>

              <p className="text-gray-600 text-center mb-6">
                It's important to select the correct computer type so we can show you the right keyboard keys and shortcuts.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowOSWarning(false);
                    setOsValidationMessage('');
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                >
                  Go Back and Choose Correct Type
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'hand' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>
            <h2 className="text-5xl font-bold mb-8 text-blue-600">
              Which hand do you use?
            </h2>

            <p className="text-2xl text-gray-600 mb-12">
              This helps us show you the right way to use the mouse!
            </p>

            <div className="flex gap-8 justify-center mb-12">
              <button
                onClick={() => setHandPreference('left')}
                className={`flex flex-col items-center p-8 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 ${
                  handPreference === 'left'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Hand className="w-32 h-32 mb-4 text-blue-500 transform scale-x-[-1]" />
                <span className="text-3xl font-bold text-gray-700">Left Hand</span>
              </button>

              <button
                onClick={() => setHandPreference('right')}
                className={`flex flex-col items-center p-8 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 ${
                  handPreference === 'right'
                    ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Hand className="w-32 h-32 mb-4 text-blue-500" />
                <span className="text-3xl font-bold text-gray-700">Right Hand</span>
              </button>
            </div>

            <button
              onClick={handleHandSubmit}
              className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}

        {step === 'career' && (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-fade-in relative">
            <button
              onClick={handleBack}
              className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>
            <h2 className="text-5xl font-bold mb-8 text-blue-600">
              What do you want to be when you grow up?
            </h2>

            <p className="text-2xl text-gray-600 mb-12">
              Choose your dream career!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { id: 'doctor', emoji: '👨‍⚕️', name: 'Doctor' },
                { id: 'engineer', emoji: '👷', name: 'Engineer' },
                { id: 'astronaut', emoji: '👨‍🚀', name: 'Astronaut' },
                { id: 'pilot', emoji: '👨‍✈️', name: 'Pilot' },
                { id: 'teacher', emoji: '👨‍🏫', name: 'Teacher' },
                { id: 'scientist', emoji: '👨‍🔬', name: 'Scientist' },
                { id: 'artist', emoji: '👨‍🎨', name: 'Artist' },
                { id: 'chef', emoji: '👨‍🍳', name: 'Chef' },
                { id: 'athlete', emoji: '⚽', name: 'Athlete' }
              ].map(career => (
                <button
                  key={career.id}
                  onClick={() => setCareerRole(career.id)}
                  className={`flex flex-col items-center p-6 rounded-3xl border-4 transform hover:scale-105 transition-all duration-200 ${
                    careerRole === career.id
                      ? 'border-green-500 bg-green-50 shadow-xl scale-105'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-6xl mb-3">{career.emoji}</div>
                  <span className="text-2xl font-bold text-gray-700">{career.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleComplete}
              disabled={!careerRole}
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 text-white text-3xl font-bold py-5 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 disabled:cursor-not-allowed"
            >
              Start Learning!
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
