import { useState } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface DragDropMasteryLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Shape {
  id: number;
  emoji: string;
  color: string;
  matched: boolean;
}

interface StackItem {
  id: number;
  emoji: string;
  height: number;
  order: number;
  placed: boolean;
}

interface SortItem {
  id: number;
  name: string;
  emoji: string;
  category: string;
  sorted: boolean;
}

export default function DragDropMasteryLesson({ onBack, onComplete }: DragDropMasteryLessonProps) {
  const [step, setStep] = useState(0);
  const [challengeStep, setChallengeStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Challenge 1: Shape Matching
  const [shapes, setShapes] = useState<Shape[]>([
    { id: 1, emoji: '🔵', color: 'bg-blue-400', matched: false },
    { id: 2, emoji: '🟡', color: 'bg-yellow-400', matched: false },
    { id: 3, emoji: '🔴', color: 'bg-red-400', matched: false },
    { id: 4, emoji: '🟩', color: 'bg-green-400', matched: false },
  ]);
  const [draggedShape, setDraggedShape] = useState<number | null>(null);
  const [shapesMatched, setShapesMatched] = useState(0);

  // Challenge 2: Stacking
  const [stackItems, setStackItems] = useState<StackItem[]>([
    { id: 1, emoji: '📦', height: 1, order: 0, placed: false },
    { id: 2, emoji: '📚', height: 2, order: 1, placed: false },
    { id: 3, emoji: '🎁', height: 3, order: 2, placed: false },
    { id: 4, emoji: '🪣', height: 4, order: 3, placed: false },
    { id: 5, emoji: '🗑️', height: 5, order: 4, placed: false },
  ]);
  const [stackedItems, setStackedItems] = useState<number[]>([]);

  // Challenge 3: Sorting
  const [sortItems, setSortItems] = useState<SortItem[]>([
    { id: 1, name: 'Apple', emoji: '🍎', category: 'fruit', sorted: false },
    { id: 2, name: 'Banana', emoji: '🍌', category: 'fruit', sorted: false },
    { id: 3, name: 'Carrot', emoji: '🥕', category: 'vegetable', sorted: false },
    { id: 4, name: 'Broccoli', emoji: '🥦', category: 'vegetable', sorted: false },
    { id: 5, name: 'Cheese', emoji: '🧀', category: 'dairy', sorted: false },
    { id: 6, name: 'Milk', emoji: '🥛', category: 'dairy', sorted: false },
  ]);
  const [fruitItems, setFruitItems] = useState<number[]>([]);
  const [vegItems, setVegItems] = useState<number[]>([]);
  const [dairyItems, setDairyItems] = useState<number[]>([]);

  const instructions = [
    "Advanced drag and drop has 3 challenges! Let's master them all.",
    "Complete the challenges: Match shapes, stack items, and sort into categories!",
    "Outstanding! You're a drag and drop master!"
  ];

  // Shape matching handlers
  const handleShapeDragStart = (id: number) => {
    setDraggedShape(id);
  };

  const handleShapeDrop = (id: number) => {
    if (draggedShape === id) {
      setShapes(prev => prev.map(s =>
        s.id === id ? { ...s, matched: true } : s
      ));
      setShapesMatched(prev => prev + 1);
    }
    setDraggedShape(null);
  };

  // Stack handlers
  const handleStackDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('itemId', id.toString());
  };

  const handleStackDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    const item = stackItems.find(s => s.id === itemId);

    if (item && !item.placed) {
      setStackItems(prev => prev.map(s =>
        s.id === itemId ? { ...s, placed: true } : s
      ));
      setStackedItems([...stackedItems, itemId]);

      if (stackedItems.length + 1 === 5) {
        setChallengeStep(2);
      }
    }
  };

  // Sort handlers
  const handleSortDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('sortId', id.toString());
  };

  const handleFruitDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('sortId'));
    const item = sortItems.find(s => s.id === itemId);

    if (item && item.category === 'fruit' && !item.sorted) {
      setSortItems(prev => prev.map(s =>
        s.id === itemId ? { ...s, sorted: true } : s
      ));
      setFruitItems([...fruitItems, itemId]);
    }
  };

  const handleVegDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('sortId'));
    const item = sortItems.find(s => s.id === itemId);

    if (item && item.category === 'vegetable' && !item.sorted) {
      setSortItems(prev => prev.map(s =>
        s.id === itemId ? { ...s, sorted: true } : s
      ));
      setVegItems([...vegItems, itemId]);
    }
  };

  const handleDairyDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('sortId'));
    const item = sortItems.find(s => s.id === itemId);

    if (item && item.category === 'dairy' && !item.sorted) {
      setSortItems(prev => prev.map(s =>
        s.id === itemId ? { ...s, sorted: true } : s
      ));
      setDairyItems([...dairyItems, itemId]);

      if (fruitItems.length + vegItems.length + dairyItems.length + 1 === 6) {
        setShowConfetti(true);
        setTimeout(() => setStep(2), 1500);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-yellow-100 to-amber-100">
      {showConfetti && <Confetti />}

      <Mascot
        message={instructions[step]}
        emotion={step === 2 ? "excited" : "happy"}
        position="top-left"
      />

      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 bg-white hover:bg-gray-100 px-6 py-3 rounded-2xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-xl font-bold">Back</span>
        </button>

        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Advanced Drag & Drop</h1>
          <p className="text-2xl text-white opacity-90">Master 3 challenging drag and drop games!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Zap className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Advanced Challenges</h2>
                <p className="text-2xl text-gray-700">
                  You already know basic drag and drop. Now let's learn advanced techniques!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-blue-400">
                <div className="text-6xl mb-3">🟡</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Shape Matching</h3>
                <p className="text-gray-700">Match shapes together</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <div className="text-6xl mb-3">📚</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Stacking</h3>
                <p className="text-gray-700">Stack items in order</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-purple-400">
                <div className="text-6xl mb-3">🍎</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Sorting</h3>
                <p className="text-gray-700">Sort items by category</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Start Challenges! 🎮
            </button>
          </div>
        )}

        {/* Step 1: Challenges */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            {/* Challenge 1: Shape Matching */}
            {challengeStep === 0 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">Challenge 1: Shape Matching</h2>
                  <p className="text-2xl text-gray-600">Matched: {shapesMatched} / 4</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Shapes to drag */}
                  <div className="bg-blue-50 rounded-2xl p-8 border-4 border-blue-400">
                    <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Drag from here</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {shapes.map(shape => (
                        !shape.matched && (
                          <div
                            key={shape.id}
                            draggable
                            onDragStart={() => handleShapeDragStart(shape.id)}
                            className="text-6xl cursor-move hover:scale-110 transition-transform text-center p-4 bg-white rounded-xl shadow-lg"
                          >
                            {shape.emoji}
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Drop zones */}
                  <div className="bg-purple-50 rounded-2xl p-8 border-4 border-purple-400">
                    <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Drop here</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {shapes.map(shape => (
                        <div
                          key={shape.id}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleShapeDrop(shape.id)}
                          className={`h-24 rounded-xl flex items-center justify-center text-5xl border-4 transition-all ${
                            shape.matched
                              ? `${shape.color} text-white`
                              : 'bg-white border-dashed border-gray-400'
                          }`}
                        >
                          {shape.matched && shape.emoji}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {shapesMatched === 4 && (
                  <button
                    onClick={() => setChallengeStep(1)}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                  >
                    Next Challenge →
                  </button>
                )}
              </>
            )}

            {/* Challenge 2: Stacking */}
            {challengeStep === 1 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">Challenge 2: Stacking</h2>
                  <p className="text-2xl text-gray-600">Items stacked: {stackedItems.length} / 5</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Items to stack */}
                  <div className="bg-green-50 rounded-2xl p-8 border-4 border-green-400">
                    <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">Drag items</h3>
                    <div className="space-y-3">
                      {stackItems.map(item => (
                        !item.placed && (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleStackDragStart(e, item.id)}
                            className="text-5xl cursor-move hover:scale-110 transition-transform p-4 bg-white rounded-xl shadow-lg"
                          >
                            {item.emoji}
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Stack zone */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleStackDrop}
                    className="bg-orange-50 rounded-2xl p-8 border-4 border-orange-400 min-h-96 flex flex-col-reverse items-center justify-start overflow-hidden"
                  >
                    <h3 className="text-3xl font-bold text-center mb-6 text-gray-800 w-full">Stack here</h3>
                    <div className="flex flex-col-reverse gap-0">
                      {stackedItems.map((itemId, idx) => {
                        const item = stackItems.find(s => s.id === itemId);
                        return (
                          <div
                            key={itemId}
                            className="text-5xl p-2 bg-white rounded-lg shadow-lg"
                            style={{ width: `${120 - idx * 10}px` }}
                          >
                            {item?.emoji}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {stackedItems.length === 5 && (
                  <button
                    onClick={() => setChallengeStep(2)}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                  >
                    Final Challenge →
                  </button>
                )}
              </>
            )}

            {/* Challenge 3: Sorting */}
            {challengeStep === 2 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">Challenge 3: Sorting</h2>
                  <p className="text-2xl text-gray-600">Sorted: {fruitItems.length + vegItems.length + dairyItems.length} / 6</p>
                </div>

                <div className="mb-8">
                  {/* Items to sort */}
                  <div className="bg-pink-50 rounded-2xl p-6 mb-8 border-4 border-pink-400">
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Unsorted Items</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {sortItems.map(item => (
                        !item.sorted && (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleSortDragStart(e, item.id)}
                            className="text-4xl cursor-move hover:scale-110 transition-transform p-4 bg-white rounded-xl shadow-lg text-center"
                          >
                            {item.emoji}
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Sort zones */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Fruits */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleFruitDrop}
                      className="bg-red-100 rounded-2xl p-6 border-4 border-red-400 min-h-40"
                    >
                      <h4 className="text-2xl font-bold text-center mb-4 text-red-800">🍎 Fruits</h4>
                      <div className="space-y-2">
                        {fruitItems.map(itemId => {
                          const item = sortItems.find(s => s.id === itemId);
                          return (
                            <div key={itemId} className="text-3xl p-3 bg-white rounded-lg shadow text-center">
                              {item?.emoji}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vegetables */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleVegDrop}
                      className="bg-green-100 rounded-2xl p-6 border-4 border-green-400 min-h-40"
                    >
                      <h4 className="text-2xl font-bold text-center mb-4 text-green-800">🥕 Vegetables</h4>
                      <div className="space-y-2">
                        {vegItems.map(itemId => {
                          const item = sortItems.find(s => s.id === itemId);
                          return (
                            <div key={itemId} className="text-3xl p-3 bg-white rounded-lg shadow text-center">
                              {item?.emoji}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Dairy */}
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDairyDrop}
                      className="bg-yellow-100 rounded-2xl p-6 border-4 border-yellow-400 min-h-40"
                    >
                      <h4 className="text-2xl font-bold text-center mb-4 text-yellow-800">🧀 Dairy</h4>
                      <div className="space-y-2">
                        {dairyItems.map(itemId => {
                          const item = sortItems.find(s => s.id === itemId);
                          return (
                            <div key={itemId} className="text-3xl p-3 bg-white rounded-lg shadow text-center">
                              {item?.emoji}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-green-600 mb-4">Drag & Drop Master!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You've completed all 3 advanced challenges!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <div className="text-left space-y-4">
                <p className="text-2xl text-green-800">✓ Shape Matching - Match pairs together</p>
                <p className="text-2xl text-green-800">✓ Stacking - Create towers correctly</p>
                <p className="text-2xl text-green-800">✓ Sorting - Organize by categories</p>
              </div>
              <p className="text-xl text-green-700 mt-6 font-bold">You're truly advanced at drag and drop!</p>
            </div>

            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Complete Lesson ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
