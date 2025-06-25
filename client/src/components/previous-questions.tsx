import { CheckCircle, History } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { TriviaQuestion } from '@shared/schema';

interface PreviousQuestionsProps {
  questions: TriviaQuestion[];
  currentQuestionIndex: number;
}

const categoryColors = [
  'border-purple',
  'border-warm-orange',
  'border-electric',
  'border-bright-green',
];

export default function PreviousQuestions({ questions, currentQuestionIndex }: PreviousQuestionsProps) {
  const previousQuestions = questions
    .slice(Math.max(0, currentQuestionIndex - 2), currentQuestionIndex)
    .reverse();

  return (
    <Card className="card-gradient rounded-3xl shadow-xl p-6 sticky top-32">
      <CardContent className="p-0">
        <div className="flex items-center space-x-3 mb-6">
          <History className="purple" size={20} />
          <h3 className="text-xl font-bold dark-gray">Previous Questions</h3>
        </div>

        <div className="space-y-6">
          {previousQuestions.map((question, index) => {
            const questionNumber = currentQuestionIndex - previousQuestions.length + index + 1;
            const colorClass = categoryColors[index % categoryColors.length];
            
            return (
              <div key={question.id} className={`p-4 bg-gray-50 rounded-xl border-l-4 ${colorClass}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-gray-500">{question.category}</span>
                </div>
                <h4 className="font-semibold dark-gray text-sm mb-2 line-clamp-2">
                  {question.question}
                </h4>
                <div className="bg-green-100 p-2 rounded">
                  <p className="bright-green font-medium text-xs flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    {question.correctAnswer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>


      </CardContent>
    </Card>
  );
}
