import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Brain, Volume2, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTriviaTimer } from '@/hooks/use-trivia-timer';
import TriviaCard from '@/components/trivia-card';
import PreviousQuestions from '@/components/previous-questions';
import type { TriviaQuestion } from '@shared/schema';

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function TriviaPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [questionOrder, setQuestionOrder] = useState<TriviaQuestion[]>([]);

  const { data: questions, isLoading } = useQuery<TriviaQuestion[]>({
    queryKey: ['/api/trivia/questions'],
  });

  const {
    currentPhase,
    timeRemaining,
    progressPercentage,
    resetTimer
  } = useTriviaTimer({
    questionTime: 15,
    answerTime: 10,
    onPhaseChange: () => {},
    onTimeUp: () => {
      setCurrentQuestionIndex((prev) =>
        prev + 1 < questionOrder.length ? prev + 1 : prev
      );
    },
    isPaused
  });

  const togglePause = () => setIsPaused(!isPaused);
  const toggleSound = () => setSoundEnabled(!soundEnabled);

  useEffect(() => {
    if (questions) {
      const shuffled = shuffleArray([...questions]);
      setQuestionOrder(shuffled);
    }
  }, [questions]);

  if (isLoading || questionOrder.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading trivia questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questionOrder[currentQuestionIndex];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sunny-yellow rounded-full flex items-center justify-center">
                <Brain className="dark-gray" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-white">TRYVIA</h1>
            </div>

            {/* Phase Indicator */}
            <div className="flex items-center space-x-4 text-white">
              <div className="phase-indicator flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  currentPhase === 'question' ? 'bg-electric' : 'bg-bright-green'
                }`} />
                <span className={`font-bold text-base px-3 py-2 rounded-full ${
                  currentPhase === 'question'
                    ? 'bg-electric text-white'
                    : 'bg-bright-green text-white'
                }`}>
                  {currentPhase === 'question' ? 'Question Time!' : 'Answer Revealed'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-75">Time Remaining</div>
                <div className="font-bold text-lg">{timeRemaining}s</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <div
              className={`progress-bar h-2 rounded-full transition-all duration-100 ${
                currentPhase === 'question' ? 'bg-electric' : 'bg-bright-green'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Question */}
          <div className="lg:col-span-2">
            <TriviaCard
              question={currentQuestion}
              currentPhase={currentPhase}
              questionNumber={currentQuestionIndex + 1}
            />
          </div>

          {/* Previous Questions */}
          <div className="lg:col-span-1">
            <PreviousQuestions
              questions={questionOrder}
              currentQuestionIndex={currentQuestionIndex}
            />
          </div>
        </div>
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        {/* 
        <Button
          onClick={toggleSound}
          className="bg-white/90 backdrop-blur-md shadow-lg rounded-full w-12 h-12 p-0 text-dark-gray hover:bg-white"
        >
          <Volume2 size={20} />
        </Button>
        */}
        <Button
          onClick={togglePause}
          className="bg-sunny-yellow shadow-lg rounded-full w-12 h-12 p-0 text-dark-gray hover:bg-yellow-400"
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </Button>
      </div>
      <footer className="text-center text-sm text-white/70 py-6">
        © 2025 Tryvia. All rights reserved.
      </footer>
    </div>
  );
}
