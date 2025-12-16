import { useState, useEffect } from 'react';

interface DragDropGameProps {
  onComplete: (score: number) => void;
}

interface PuzzlePiece {
  id: number;
  emoji: string;
  color: string;
  placed: boolean;
}

export default function DragDropGame({ onComplete }: DragDropGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([
    { id: 1, emoji: '🍎', color: 'bg-red-200', placed: false },
    { id: 2, emoji: '🍌', color: 'bg-yellow-200', placed: false },
    { id: 3, emoji: '🍇', color: 'bg-purple-200', placed: false },
    { id: 4, emoji: '🍊', color: 'bg-orange-200', placed: false },
    { id: 5, emoji: '🍓', color: 'bg-pink-200', placed: false },
    { id: 6, emoji: '🥝', color: 'bg-green-200', placed: false }
  ]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const allPlaced = pieces.every(p => p.placed);
    if (allPlaced && !completed) {
      setCompleted(true);
      setTimeout(() => {
        onComplete(pieces.length * 20);
      }, 1500);
    }
  }, [pieces, completed, onComplete]);

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedId === targetId) {
      setPieces(prev => prev.map(p =>
        p.id === targetId ? { ...p, placed: true } : p
      ));
      setScore(prev => prev + 1);
    }
    setDraggedId(null);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-gray-700">
          Pieces Placed: <span className="text-purple-600">{score} / {pieces.length}</span>
        </div>
        {completed && (
          <div className="text-3xl font-bold text-green-600 animate-bounce">
            Perfect! 🎉
          </div>
        )}
      </div>

      <div className="mb-6 bg-purple-50 p-6 rounded-2xl">
        <p className="text-2xl text-center text-gray-700 mb-2">
          🖱️ Drag the fruits to their matching spots!
        </p>
        <p className="text-xl text-center text-gray-600">
          Click and hold, then move to the right place
        </p>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-700">
            Drag from here
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {pieces.map(piece => (
              !piece.placed && (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={() => handleDragStart(piece.id)}
                  className={`${piece.color} p-6 rounded-xl flex items-center justify-center text-6xl cursor-move hover:scale-110 transition-transform shadow-lg`}
                >
                  {piece.emoji}
                </div>
              )
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-center mb-6 text-gray-700">
            Drop here
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {pieces.map(piece => (
              <div
                key={piece.id}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(piece.id)}
                className={`${
                  piece.placed
                    ? `${piece.color} text-6xl`
                    : 'bg-white border-4 border-dashed border-gray-300'
                } p-6 rounded-xl flex items-center justify-center transition-all ${
                  draggedId === piece.id ? 'border-green-500 scale-105' : ''
                }`}
              >
                {piece.placed ? piece.emoji : (
                  <span className="text-4xl text-gray-300">?</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {completed && (
        <div className="mt-8 text-center">
          <div className="text-5xl mb-4 animate-bounce">🎊 🎉 🎊</div>
          <p className="text-3xl font-bold text-green-600">
            You're a drag and drop master!
          </p>
        </div>
      )}
    </div>
  );
}
