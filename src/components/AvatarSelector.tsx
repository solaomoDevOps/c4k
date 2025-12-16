import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { playSound } from '../utils/sounds';

interface AvatarSelectorProps {
  onClose: () => void;
}

export default function AvatarSelector({ onClose }: AvatarSelectorProps) {
  const { currentChild, setCurrentChild } = useApp();
  const [selectedAvatar, setSelectedAvatar] = useState(currentChild?.selected_avatar || 'robot');

  const avatars = [
    { id: 'robot', emoji: '🤖', name: 'Robot' },
    { id: 'bear', emoji: '🐻', name: 'Bear' },
    { id: 'cat', emoji: '🐱', name: 'Cat' },
    { id: 'dog', emoji: '🐶', name: 'Dog' },
    { id: 'lion', emoji: '🦁', name: 'Lion' },
    { id: 'unicorn', emoji: '🦄', name: 'Unicorn' },
    { id: 'dragon', emoji: '🐉', name: 'Dragon' },
    { id: 'astronaut', emoji: '👨‍🚀', name: 'Astronaut' },
    { id: 'ninja', emoji: '🥷', name: 'Ninja' },
    { id: 'pirate', emoji: '🏴‍☠️', name: 'Pirate' },
    { id: 'alien', emoji: '👽', name: 'Alien' },
    { id: 'superhero', emoji: '🦸', name: 'Superhero' }
  ];

  const handleSave = async () => {
    if (!currentChild) return;

    const updatedChild = { ...currentChild, selected_avatar: selectedAvatar };
    setCurrentChild(updatedChild);

    playSound.success();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-8 max-w-3xl w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Choose Your Avatar</h2>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {avatars.map(avatar => (
            <button
              key={avatar.id}
              onClick={() => {
                setSelectedAvatar(avatar.id);
                playSound.click();
              }}
              className={`flex flex-col items-center p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                selectedAvatar === avatar.id
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="text-6xl mb-2">{avatar.emoji}</div>
              <div className="text-lg font-bold text-gray-700">{avatar.name}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-2xl font-bold py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
        >
          Save Avatar
        </button>
      </div>
    </div>
  );
}
