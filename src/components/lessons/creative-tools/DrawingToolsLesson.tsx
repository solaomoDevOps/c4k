import { useState, useRef, useEffect } from 'react';
import { Brush, Eraser, Square, Circle, Palette, Trash2, CheckCircle } from 'lucide-react';
import InteractiveLessonBase from '../InteractiveLessonBase';
import VoiceButton from '../../VoiceButton';
import Confetti from '../../Confetti';

interface DrawingToolsLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

type Tool = 'brush' | 'eraser' | 'square' | 'circle';

export default function DrawingToolsLesson({ onBack, onComplete }: DrawingToolsLessonProps) {
  const [step, setStep] = useState<'intro' | 'draw' | 'complete'>('intro');
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [currentColor, setCurrentColor] = useState('#3B82F6');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Green', value: '#10B981' },
    { name: 'Yellow', value: '#F59E0B' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Brown', value: '#92400E' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && step === 'draw') {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'brush') {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (currentTool === 'eraser') {
      ctx.clearRect(x - 15, y - 15, 30, 30);
    }
  };

  const drawShape = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = currentColor;

    if (currentTool === 'square') {
      ctx.fillRect(x - 40, y - 40, 80, 80);
    } else if (currentTool === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    setHasDrawn(true);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
    }
  };

  const handleFinish = () => {
    setShowConfetti(true);
    setStep('complete');
    setTimeout(onComplete, 3000);
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <InteractiveLessonBase
        title="Drawing Tools"
        instructions="Let's create art with digital tools!"
        voiceIntro="Time to be creative! Let's explore drawing tools."
        onBack={onBack}
        progress={step === 'complete' ? 100 : 50}
        showMascot={true}
        mascotMessage={step === 'draw' ? 'Create something amazing!' : ''}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {step === 'intro' && (
            <>
              <div className="text-center mb-8">
                <Palette className="w-32 h-32 text-pink-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Digital Art Tools</h2>
                <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Learn to use brushes, colors, shapes, and erasers to create beautiful artwork!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 text-center">
                  <Brush className="w-16 h-16 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-blue-800">Brush</h3>
                  <p className="text-gray-700">Draw freehand</p>
                </div>
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 text-center">
                  <Eraser className="w-16 h-16 text-pink-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-pink-800">Eraser</h3>
                  <p className="text-gray-700">Fix mistakes</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
                  <Square className="w-16 h-16 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-800">Shapes</h3>
                  <p className="text-gray-700">Add squares</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
                  <Circle className="w-16 h-16 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-yellow-800">Circles</h3>
                  <p className="text-gray-700">Draw circles</p>
                </div>
              </div>

              <VoiceButton
                onClick={() => setStep('draw')}
                voiceText="Start drawing"
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
              >
                Start Drawing!
              </VoiceButton>
            </>
          )}

          {step === 'draw' && (
            <>
              <div className="flex gap-4 flex-wrap justify-center mb-4">
                {/* Tools */}
                <VoiceButton
                  onClick={() => setCurrentTool('brush')}
                  voiceText="Select brush tool"
                  className={`${
                    currentTool === 'brush' ? 'bg-blue-500' : 'bg-white'
                  } border-4 border-blue-500 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all`}
                >
                  <Brush className={`w-8 h-8 ${currentTool === 'brush' ? 'text-white' : 'text-blue-500'}`} />
                </VoiceButton>

                <VoiceButton
                  onClick={() => setCurrentTool('eraser')}
                  voiceText="Select eraser tool"
                  className={`${
                    currentTool === 'eraser' ? 'bg-pink-500' : 'bg-white'
                  } border-4 border-pink-500 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all`}
                >
                  <Eraser className={`w-8 h-8 ${currentTool === 'eraser' ? 'text-white' : 'text-pink-500'}`} />
                </VoiceButton>

                <VoiceButton
                  onClick={() => setCurrentTool('square')}
                  voiceText="Select square tool"
                  className={`${
                    currentTool === 'square' ? 'bg-green-500' : 'bg-white'
                  } border-4 border-green-500 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all`}
                >
                  <Square className={`w-8 h-8 ${currentTool === 'square' ? 'text-white' : 'text-green-500'}`} />
                </VoiceButton>

                <VoiceButton
                  onClick={() => setCurrentTool('circle')}
                  voiceText="Select circle tool"
                  className={`${
                    currentTool === 'circle' ? 'bg-yellow-500' : 'bg-white'
                  } border-4 border-yellow-500 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all`}
                >
                  <Circle className={`w-8 h-8 ${currentTool === 'circle' ? 'text-white' : 'text-yellow-500'}`} />
                </VoiceButton>

                <VoiceButton
                  onClick={clearCanvas}
                  voiceText="Clear canvas"
                  className="bg-red-500 border-4 border-red-600 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all"
                >
                  <Trash2 className="w-8 h-8 text-white" />
                </VoiceButton>
              </div>

              {/* Colors */}
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                {colors.map((color) => (
                  <VoiceButton
                    key={color.value}
                    onClick={() => setCurrentColor(color.value)}
                    voiceText={`Select ${color.name}`}
                    className={`w-12 h-12 rounded-full shadow-lg transform hover:scale-110 transition-all ${
                      currentColor === color.value ? 'ring-4 ring-gray-800 scale-125' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>

              {/* Canvas */}
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="border-8 border-gray-300 rounded-2xl shadow-2xl cursor-crosshair bg-white"
                onMouseDown={currentTool === 'brush' || currentTool === 'eraser' ? startDrawing : undefined}
                onMouseMove={currentTool === 'brush' || currentTool === 'eraser' ? draw : undefined}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onClick={currentTool === 'square' || currentTool === 'circle' ? drawShape : undefined}
              />

              {hasDrawn && (
                <VoiceButton
                  onClick={handleFinish}
                  voiceText="Finish drawing"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                >
                  Finish!
                </VoiceButton>
              )}
            </>
          )}

          {step === 'complete' && (
            <div className="text-center animate-fade-in">
              <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-6" />
              <h2 className="text-5xl font-bold text-blue-600 mb-4">Beautiful Artwork!</h2>
              <p className="text-3xl text-gray-700">
                You're a digital artist now!
              </p>
            </div>
          )}
        </div>
      </InteractiveLessonBase>
    </>
  );
}
