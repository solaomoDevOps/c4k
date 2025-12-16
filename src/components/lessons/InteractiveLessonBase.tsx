import { ReactNode, useEffect } from 'react';
import { ArrowLeft, Star, Trophy } from 'lucide-react';
import { useVoiceInstruction } from '../../hooks/useVoiceInstruction';
import VoiceButton from '../VoiceButton';
import Mascot from '../Mascot';

interface InteractiveLessonBaseProps {
  title: string;
  instructions: string;
  voiceIntro?: string;
  children: ReactNode;
  onBack: () => void;
  handleBack?: () => void;
  onComplete?: () => void;
  showMascot?: boolean;
  mascotMessage?: string;
  progress?: number;
}

export default function InteractiveLessonBase({
  title,
  instructions,
  voiceIntro,
  children,
  onBack,
  handleBack,
  onComplete,
  showMascot = true,
  mascotMessage,
  progress = 0,
}: InteractiveLessonBaseProps) {
  useVoiceInstruction(voiceIntro || instructions, { delay: 1000 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <VoiceButton
            onClick={handleBack || onBack}
            voiceText="Go back to lessons"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full shadow-lg font-bold text-xl transition-all duration-200 transform hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </VoiceButton>

          {progress > 0 && (
            <div className="flex-1 mx-8">
              <div className="bg-white rounded-full h-6 shadow-inner overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${progress}%` }}
                >
                  {progress >= 15 && (
                    <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
              <span className="font-bold text-gray-700">0</span>
            </div>
          </div>
        </div>

        {/* Title and Instructions */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <h1 className="text-5xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            {title}
          </h1>
          <p className="text-2xl text-center text-gray-700 font-semibold">
            {instructions}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl min-h-[500px] relative">
          {showMascot && (
            <div className="absolute top-4 right-4 z-10">
              <Mascot message={mascotMessage} size="small" />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
