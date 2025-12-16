import { useState } from 'react';
import { Home, Palette } from 'lucide-react';
import { playSound } from '../../utils/sounds';
import Confetti from '../Confetti';
import Mascot from '../Mascot';

interface ColoringGameProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

interface Cell {
  id: number;
  color: string;
}

export default function ColoringGame({ onComplete, onExit }: ColoringGameProps) {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [cells, setCells] = useState<Cell[]>(
    Array.from({ length: 100 }, (_, i) => ({ id: i, color: '#FFFFFF' }))
  );
  const [coloredCount, setColoredCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCellClick = (cellId: number) => {
    playSound.pop();
    setCells(prevCells =>
      prevCells.map(cell =>
        cell.id === cellId ? { ...cell, color: selectedColor } : cell
      )
    );

    if (cells[cellId].color === '#FFFFFF') {
      const newCount = coloredCount + 1;
      setColoredCount(newCount);

      if (newCount === 100 && !completed) {
        setCompleted(true);
        setShowConfetti(true);
        playSound.celebration();
        setTimeout(() => onComplete(100), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-100 to-pink-100">
      <Confetti active={showConfetti} />

      <Mascot
        message={completed ? "Beautiful artwork!" : "Click to color each square!"}
        emotion={completed ? "celebrating" : "happy"}
        position="top-left"
      />

      <div className="max-w-5xl mx-auto pt-4">
        <div className="flex justify-between items-center mb-8 mt-2">
          <h1 className="text-5xl font-bold text-purple-600 ml-80">Color & Click</h1>
          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-gray-700">
                {coloredCount}/100
              </span>
            </div>
            <button
              onClick={onExit}
              className="bg-gray-200 hover:bg-gray-300 p-4 rounded-full transition-all"
            >
              <Home className="w-8 h-8 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-700">Pick a Color:</h2>
          </div>

          <div className="flex gap-3 flex-wrap mb-8">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  playSound.click();
                }}
                className={`w-16 h-16 rounded-xl transition-all transform hover:scale-110 ${
                  selectedColor === color
                    ? 'ring-4 ring-offset-2 ring-purple-500 scale-110'
                    : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="grid grid-cols-10 gap-2 bg-gray-100 p-4 rounded-2xl">
            {cells.map(cell => (
              <button
                key={cell.id}
                onClick={() => handleCellClick(cell.id)}
                className="aspect-square rounded-lg border-2 border-gray-300 transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: cell.color }}
              />
            ))}
          </div>
        </div>

        {completed && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl p-8 shadow-xl inline-block">
              <h2 className="text-5xl font-bold text-white mb-2">Masterpiece!</h2>
              <p className="text-2xl text-white">You colored all 100 squares!</p>
            </div>
          </div>
        )}

        {!completed && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <p className="text-2xl text-gray-700 text-center">
              Click on the white squares to fill them with your chosen color! 🎨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
