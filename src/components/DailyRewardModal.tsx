import { useState, useEffect } from 'react';
import { Gift, Flame } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { playSound } from '../utils/sounds';
import Confetti from './Confetti';

export default function DailyRewardModal() {
  const { currentChild, checkDailyReward, claimDailyReward } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const checkReward = async () => {
      // Only show rewards for registered users, not guests
      const isGuest = localStorage.getItem('isGuest') === 'true';
      if (currentChild && !isGuest) {
        const available = await checkDailyReward();
        setShowModal(available);
      }
    };

    checkReward();
  }, [currentChild, checkDailyReward]);

  const handleClaim = async () => {
    await claimDailyReward();
    setClaimed(true);
    setShowConfetti(true);
    playSound.celebration();
  };

  const handleClose = () => {
    setShowModal(false);
    setShowConfetti(false);
    setClaimed(false);
  };

  if (!showModal || !currentChild) return null;

  return (
    <>
      <Confetti active={showConfetti} />
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <div
          className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-12 max-w-lg w-full shadow-2xl text-center animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {!claimed ? (
            <>
              <div className="mb-6 animate-bounce">
                <Gift className="w-32 h-32 mx-auto text-yellow-600" />
              </div>

              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                Welcome Back, {currentChild.career_role ? `${currentChild.career_role.charAt(0).toUpperCase() + currentChild.career_role.slice(1)} ` : ''}{currentChild.name}!
              </h2>

              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Flame className="w-10 h-10 text-orange-500" />
                  <span className="text-3xl font-bold text-gray-700">
                    {currentChild.current_streak || 0} Day Streak!
                  </span>
                </div>
                <p className="text-xl text-gray-600">
                  Come back tomorrow to keep it going!
                </p>
              </div>

              <button
                onClick={handleClaim}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
              >
                Claim +10 XP
              </button>
            </>
          ) : (
            <>
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                You Got It!
              </h2>
              <p className="text-3xl text-gray-600 mb-6">
                +10 XP Added!
              </p>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
