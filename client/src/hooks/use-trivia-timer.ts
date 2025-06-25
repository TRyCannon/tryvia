import { useState, useEffect, useRef } from 'react';

interface UseTriviaTimerProps {
  questionTime: number;
  answerTime: number;
  onPhaseChange: (phase: 'question' | 'answer') => void;
  onTimeUp: () => void;
  isPaused: boolean;
}

export function useTriviaTimer({
  questionTime,
  answerTime,
  onPhaseChange,
  onTimeUp,
  isPaused
}: UseTriviaTimerProps) {
  const [currentPhase, setCurrentPhase] = useState<'question' | 'answer'>('question');
  const [timeRemaining, setTimeRemaining] = useState(questionTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const maxTime = currentPhase === 'question' ? questionTime : answerTime;
  const progressPercentage = (timeRemaining / maxTime) * 100;

  const resetTimer = (phase: 'question' | 'answer' = 'question') => {
    setCurrentPhase(phase);
    setTimeRemaining(phase === 'question' ? questionTime : answerTime);
    onPhaseChange(phase);
  };

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (currentPhase === 'question') {
            setCurrentPhase('answer');
            onPhaseChange('answer');
            return answerTime;
          } else {
            onTimeUp();
            setCurrentPhase('question');
            onPhaseChange('question');
            return questionTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentPhase, questionTime, answerTime, onPhaseChange, onTimeUp, isPaused]);

  return {
    currentPhase,
    timeRemaining,
    progressPercentage,
    resetTimer
  };
}
