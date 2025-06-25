import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { TriviaQuestion } from '@shared/schema';

interface TriviaCardProps {
  question: TriviaQuestion;
  currentPhase: 'question' | 'answer';
  questionNumber: number;
}

export default function TriviaCard({ question, currentPhase, questionNumber }: TriviaCardProps) {
  const correctAnswerIndex = question.options.indexOf(question.correctAnswer);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="card-gradient rounded-3xl shadow-2xl p-8 animate-glow">
        <CardContent className="p-0">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="bg-purple text-white px-4 py-2 rounded-full font-semibold text-sm">
                {question.category}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold dark-gray leading-relaxed mb-4">
              {question.question}
            </h2>
            
            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`
                    p-4 rounded-xl cursor-pointer transition-all border-2
                    ${currentPhase === 'answer' && index === correctAnswerIndex
                      ? 'bg-bright-green text-white border-bright-green'
                      : currentPhase === 'answer'
                      ? 'bg-gray-50 opacity-50 border-transparent'
                      : 'bg-gray-50 border-transparent hover:border-electric'
                    }
                  `}
                  whileHover={currentPhase === 'question' ? { scale: 1.02 } : {}}
                >
                  <span className={`font-semibold ${
                    currentPhase === 'answer' && index === correctAnswerIndex
                      ? 'text-white'
                      : 'electric'
                  }`}>
                    {String.fromCharCode(65 + index)})
                  </span>
                  <span className={`ml-2 ${
                    currentPhase === 'answer' && index === correctAnswerIndex
                      ? 'text-white'
                      : 'dark-gray'
                  }`}>
                    {option}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Answer Section */}
          <AnimatePresence>
            {currentPhase === 'answer' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="bg-green-50 border-l-4 border-bright-green rounded-r-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="bright-green" size={24} />
                  <h3 className="text-xl font-bold bright-green">Correct Answer:</h3>
                </div>
                <p className="text-lg font-semibold dark-gray">
                  {String.fromCharCode(65 + correctAnswerIndex)}) {question.correctAnswer} - {question.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Fun Facts Section */}
      <AnimatePresence>
        {currentPhase === 'answer' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card-gradient rounded-3xl shadow-xl p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="sunny-yellow" size={24} />
                  <h3 className="text-xl font-bold dark-gray">Did You Know?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {question.funFact}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
