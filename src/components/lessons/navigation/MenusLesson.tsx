import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ChefHat } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface MenusLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function MenusLesson({ onBack, onComplete }: MenusLessonProps) {
  const [step, setStep] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const menus = [
    { id: 'chop', label: '🔪 Chop', items: ['Chop Carrots', 'Chop Onions', 'Chop Peppers'] },
    { id: 'stir', label: '🥄 Stir', items: ['Stir Slowly', 'Stir Fast', 'Stir Gently'] },
    { id: 'fry', label: '🍳 Fry', items: ['Fry Light', 'Fry Medium', 'Fry Crispy'] },
  ];

  const handleMenuClick = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  const handleActionSelect = (action: string) => {
    if (!selectedActions.includes(action)) {
      const newActions = [...selectedActions, action];
      setSelectedActions(newActions);
      setOpenMenu(null);

      if (newActions.length === 3 && step === 1) {
        setShowConfetti(true);
        setTimeout(() => setStep(2), 1000);
      }
    }
  };

  const instructions = [
    "Menus are like treasure chests. Click them to see what tools are inside!",
    "Cook your dish! Click each menu (Chop, Stir, Fry) and choose one action from each.",
    "Delicious! You've mastered using menus like a chef!"
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-teal-100 to-cyan-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Using Menus</h1>
          <p className="text-2xl text-white opacity-90">Click to discover menu options!</p>
        </div>

        {/* Cooking Game */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <ChefHat className="w-20 h-20 text-orange-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Cook With Menus!</h2>
            <p className="text-2xl text-gray-600">
              Selected: {selectedActions.length} / 3 actions
            </p>
          </div>

          {/* Menu Bar */}
          <div className="bg-gray-100 rounded-2xl p-4 mb-8">
            <div className="flex gap-4 justify-center">
              {menus.map((menu) => (
                <div key={menu.id} className="relative">
                  <button
                    onClick={() => step >= 1 && handleMenuClick(menu.id)}
                    disabled={selectedActions.some(action => menu.items.includes(action))}
                    className={`text-2xl font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 ${
                      selectedActions.some(action => menu.items.includes(action))
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-white text-gray-800 hover:bg-gray-50 shadow-lg'
                    }`}
                  >
                    {menu.label}
                  </button>

                  {/* Dropdown Menu */}
                  {openMenu === menu.id && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-4 border-teal-400 z-10 min-w-full">
                      {menu.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleActionSelect(item)}
                          className="block w-full text-left px-6 py-4 text-xl hover:bg-teal-50 first:rounded-t-xl last:rounded-b-xl transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Actions Display */}
          {selectedActions.length > 0 && (
            <div className="bg-green-50 border-4 border-green-400 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Your Recipe:</h3>
              <ul className="space-y-2">
                {selectedActions.map((action, index) => (
                  <li key={index} className="flex items-center gap-3 text-xl text-green-700">
                    <CheckCircle2 className="w-6 h-6" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Continue/Complete Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (step < 1) {
                setStep(1);
              } else if (step === 2) {
                onComplete();
              }
            }}
            disabled={step === 1 && selectedActions.length < 3}
            className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Cooking' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Select All Actions!'}
          </button>
        </div>
      </div>
    </div>
  );
}
