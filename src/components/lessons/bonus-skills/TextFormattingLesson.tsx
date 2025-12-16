import { useState } from 'react';
import { Type, Bold, Highlighter, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';
import { ArrowLeft } from 'lucide-react';

interface TextFormattingLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

interface TextExample {
  id: string;
  original: string;
  type: string;
  instructions: string;
  bold: boolean;
  sizeClass: string;
  color: string;
  completed: boolean;
}

export default function TextFormattingLesson({ onBack, onComplete }: TextFormattingLessonProps) {
  const [step, setStep] = useState(0);
  const [selectedText, setSelectedText] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const [textExamples, setTextExamples] = useState<TextExample[]>([
    {
      id: 'heading',
      original: 'My Amazing Title',
      type: 'Heading',
      instructions: 'Make this text: BOLD and BIG',
      bold: false,
      sizeClass: 'text-3xl',
      color: 'text-gray-800',
      completed: false
    },
    {
      id: 'paragraph',
      original: 'This is an important paragraph that needs bold words.',
      type: 'Paragraph',
      instructions: 'Make this text: BOLD and normal size',
      bold: false,
      sizeClass: 'text-xl',
      color: 'text-gray-700',
      completed: false
    },
    {
      id: 'highlight',
      original: 'Find and highlight the special part!',
      type: 'Highlighted Text',
      instructions: 'Make this text: BOLD, COLORED (yellow/red), and highlight it',
      bold: false,
      sizeClass: 'text-xl',
      color: 'text-gray-800',
      completed: false
    }
  ]);

  const instructions = [
    "Text formatting changes how text looks! Let's learn bold, size, color, and highlighting.",
    "Format each text example using the toolbar buttons. Select text and apply styles!",
    "Perfect! You've mastered text formatting!"
  ];

  const applyBold = () => {
    const updated = [...textExamples];
    updated[selectedText].bold = !updated[selectedText].bold;
    setTextExamples(updated);
  };

  const increaseFontSize = () => {
    const updated = [...textExamples];
    const sizes = ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
    const currentIdx = sizes.indexOf(updated[selectedText].sizeClass);
    if (currentIdx < sizes.length - 1) {
      updated[selectedText].sizeClass = sizes[currentIdx + 1];
      setTextExamples(updated);
    }
  };

  const changeColor = (newColor: string) => {
    const updated = [...textExamples];
    updated[selectedText].color = newColor;
    setTextExamples(updated);
  };

  const markComplete = () => {
    const example = textExamples[selectedText];

    // Check if formatting requirements are met
    let isComplete = false;

    if (example.id === 'heading' && example.bold && example.sizeClass.includes('4xl')) {
      isComplete = true;
    } else if (example.id === 'paragraph' && example.bold && example.sizeClass === 'text-xl') {
      isComplete = true;
    } else if (example.id === 'highlight' && example.bold &&
               (example.color === 'text-yellow-600' || example.color === 'text-red-600')) {
      isComplete = true;
    }

    if (isComplete && !example.completed) {
      const updated = [...textExamples];
      updated[selectedText].completed = true;
      setTextExamples(updated);
      const newCount = completedCount + 1;
      setCompletedCount(newCount);

      if (newCount === 3) {
        setShowConfetti(true);
        setTimeout(() => setStep(2), 1500);
      }
    }
  };

  const colors = [
    { name: 'Black', value: 'text-gray-800' },
    { name: 'Blue', value: 'text-blue-600' },
    { name: 'Red', value: 'text-red-600' },
    { name: 'Green', value: 'text-green-600' },
    { name: 'Purple', value: 'text-purple-600' },
    { name: 'Orange', value: 'text-orange-600' },
    { name: 'Yellow', value: 'text-yellow-600' },
    { name: 'Pink', value: 'text-pink-600' },
  ];

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
          <h1 className="text-5xl font-bold text-white mb-2">Text Formatting</h1>
          <p className="text-2xl text-white opacity-90">Learn to make text look beautiful!</p>
        </div>

        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-6 mb-8">
              <Type className="w-24 h-24 text-yellow-500" />
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">What is Text Formatting?</h2>
                <p className="text-2xl text-gray-700">
                  You can change how text looks by making it bold, bigger, colorful, or highlighted!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-blue-400">
                <Bold className="w-12 h-12 text-blue-600 mb-3" />
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Bold</h3>
                <p className="text-gray-700">Make text <strong>stand out</strong></p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-green-400">
                <Type className="w-12 h-12 text-green-600 mb-3" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">Size</h3>
                <p className="text-gray-700">Make text bigger or smaller</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-purple-400">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">Color</h3>
                <p className="text-gray-700">Change text <span className="text-red-600">colors</span></p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-pink-400">
                <Highlighter className="w-12 h-12 text-pink-600 mb-3" />
                <h3 className="text-2xl font-bold text-pink-600 mb-2">Highlight</h3>
                <p className="text-gray-700">Draw attention to text</p>
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-3xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              Start Formatting! ✏️
            </button>
          </div>
        )}

        {/* Step 1: Game */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Format the Text</h2>
              <p className="text-2xl text-gray-600">Completed: {completedCount} / 3</p>
            </div>

            {/* Text Examples Selector */}
            <div className="flex gap-4 mb-8 justify-center">
              {textExamples.map((example, idx) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedText(idx)}
                  className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                    selectedText === idx
                      ? 'bg-yellow-500 text-white scale-110'
                      : example.completed
                      ? 'bg-green-400 text-white'
                      : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                  }`}
                >
                  {example.type}
                </button>
              ))}
            </div>

            {/* Current Text Example */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 mb-8 border-4 border-yellow-400">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {textExamples[selectedText].instructions}
              </h3>

              {/* Text Preview */}
              <div className={`p-8 bg-white rounded-xl border-4 border-gray-300 mb-6 min-h-24 flex items-center justify-center ${
                textExamples[selectedText].sizeClass
              } ${textExamples[selectedText].bold ? 'font-bold' : ''} ${textExamples[selectedText].color}`}>
                <span className={textExamples[selectedText].id === 'highlight' ? 'bg-yellow-300 px-2 py-1 rounded' : ''}>
                  {textExamples[selectedText].original}
                </span>
              </div>

              {/* Formatting Toolbar */}
              <div className="bg-gray-50 rounded-xl p-6 border-4 border-gray-300">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Formatting Toolbar:</h4>

                {/* Bold Button */}
                <div className="mb-6">
                  <button
                    onClick={applyBold}
                    className={`px-6 py-3 rounded-lg font-bold text-xl transition-all ${
                      textExamples[selectedText].bold
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <Bold className="w-6 h-6 inline mr-2" />
                    Bold
                  </button>
                  <span className={`ml-4 text-lg ${textExamples[selectedText].bold ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                    {textExamples[selectedText].bold ? '✓ Bold ON' : 'Not bold'}
                  </span>
                </div>

                {/* Size Button */}
                <div className="mb-6">
                  <button
                    onClick={increaseFontSize}
                    className="px-6 py-3 rounded-lg font-bold text-xl bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 transition-all"
                  >
                    <Type className="w-6 h-6 inline mr-2" />
                    Increase Size
                  </button>
                  <span className="ml-4 text-lg text-gray-700">
                    Current: {textExamples[selectedText].sizeClass.replace('text-', '')}
                  </span>
                </div>

                {/* Color Buttons */}
                <div className="mb-6">
                  <p className="text-lg font-bold text-gray-800 mb-3">Choose Color:</p>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => changeColor(color.value)}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${
                          textExamples[selectedText].color === color.value
                            ? 'ring-4 ring-gray-800 scale-110'
                            : 'hover:scale-105'
                        } ${color.value} text-white bg-gradient-to-r from-gray-800 to-gray-900`}
                      >
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlight Info */}
                {textExamples[selectedText].id === 'highlight' && (
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-yellow-800 font-bold">
                    💡 Tip: Yellow or red color works well for highlighting!
                  </div>
                )}
              </div>
            </div>

            {/* Mark Complete Button */}
            <button
              onClick={markComplete}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-8 h-8" />
              Format Complete!
            </button>
          </div>
        )}

        {/* Step 2: Completion */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="text-7xl mb-6 animate-bounce">🎊 🎉 🎊</div>
            <h2 className="text-5xl font-bold text-green-600 mb-4">Text Formatting Master!</h2>
            <p className="text-3xl text-gray-700 mb-8">
              You've formatted all 3 text examples perfectly!
            </p>
            <div className="bg-green-50 rounded-2xl p-6 mb-8 border-4 border-green-400">
              <div className="text-left space-y-4">
                <p className="text-2xl text-green-800"><strong>Bold</strong> - Make text stand out</p>
                <p className="text-2xl text-green-800">Size - Make text bigger or smaller</p>
                <p className="text-2xl text-green-800">Color - Change text colors (red, blue, etc.)</p>
                <p className="text-2xl text-green-800">Highlight - Draw attention to important parts</p>
              </div>
              <p className="text-xl text-green-700 mt-6 font-bold">Now you can make your documents beautiful!</p>
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
