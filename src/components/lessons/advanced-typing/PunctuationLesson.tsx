import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Confetti from '../../Confetti';
import Mascot from '../../Mascot';

interface PunctuationLessonProps {
  onBack: () => void;
  onComplete: () => void;
}

export default function PunctuationLesson({ onBack, onComplete }: PunctuationLessonProps) {
  const [step, setStep] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean }>({ show: false, correct: false });

  const sentences = [
    { text: 'Hello friend', correct: '.', options: ['.', '?', '!'] },
    { text: 'Are you happy', correct: '?', options: ['.', '?', '!'] },
    { text: 'Wow that is amazing', correct: '!', options: ['.', '?', '!'] },
    { text: 'I love learning', correct: '.', options: ['.', '?', '!'] },
    { text: 'Where are you going', correct: '?', options: ['.', '?', '!'] },
    { text: 'This is so fun', correct: '!', options: ['.', '?', '!'] }
  ];

  const handleAnswer = (punctuation: string) => {
    const current = sentences[currentSentence];
    if (punctuation === current.correct) {
      const newCorrect = correctAnswers + 1;
      setCorrectAnswers(newCorrect);
      setFeedback({ show: true, correct: true });

      setTimeout(() => {
        setFeedback({ show: false, correct: false });
        if (currentSentence < sentences.length - 1) {
          setCurrentSentence(currentSentence + 1);
        } else if (step === 1) {
          setShowConfetti(true);
          setTimeout(() => setStep(2), 1000);
        }
      }, 1000);
    } else {
      setFeedback({ show: true, correct: false });
      setTimeout(() => {
        setFeedback({ show: false, correct: false });
      }, 1500);
    }
  };

  const instructions = [
    "Punctuation helps sentences sound right! Periods (.), question marks (?), and exclamation marks (!) show how to read.",
    "Complete the sentences! Pick the correct punctuation mark for each sentence.",
    "Perfect punctuation! You make sentences complete!"
  ];

  const getPunctuationName = (mark: string) => {
    if (mark === '.') return 'Period';
    if (mark === '?') return 'Question Mark';
    if (mark === '!') return 'Exclamation Mark';
    return mark;
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-emerald-100 to-green-100">
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

        <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-bold text-white mb-2">Punctuation Practice</h1>
          <p className="text-2xl text-white opacity-90">Complete the sentences!</p>
        </div>

        {step >= 1 && currentSentence < sentences.length && (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
            <p className="text-center text-2xl font-bold text-gray-600 mb-8">
              Question {currentSentence + 1} of {sentences.length}
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-4 border-blue-200">
              <p className="text-5xl font-bold text-gray-800 text-center">
                {sentences[currentSentence].text}
                <span className="text-red-500 ml-2">___</span>
              </p>
            </div>

            <div className="flex justify-center gap-6">
              {sentences[currentSentence].options.map((mark) => (
                <button
                  key={mark}
                  onClick={() => handleAnswer(mark)}
                  className="bg-gradient-to-br from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white rounded-2xl p-8 shadow-xl transform hover:scale-110 transition-all min-w-[150px]"
                >
                  <div className="text-7xl mb-2">{mark}</div>
                  <p className="text-xl font-bold">{getPunctuationName(mark)}</p>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              {feedback.show ? (
                <p className={`text-3xl font-bold ${feedback.correct ? 'text-green-600' : 'text-orange-600'} animate-fade-in`}>
                  {feedback.correct ? '✓ Great job! Correct!' : '😮 Ouch! Try again!'}
                </p>
              ) : (
                <p className="text-2xl font-bold text-green-600">
                  ✓ Correct: {correctAnswers}
                </p>
              )}
            </div>
          </div>
        )}

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
            disabled={step === 1 && currentSentence < sentences.length}
            className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white text-3xl font-bold py-6 px-16 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {step === 0 ? 'Start Practice' : step === 2 ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                Complete Lesson
              </>
            ) : 'Complete All Sentences!'}
          </button>
        </div>
      </div>
    </div>
  );
}
