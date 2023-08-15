const triviaData = [
    {
      question: "What is the capital of France?",
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      answer: "Mars"
    },
    {
      question: "What is the world's longest river?",
      answer: "The Nile"
    },
    {
      question: "What is the chemical symbol for the element      gold?",
      answer: "Au"
    },
    // Add more trivia questions and answers here
  ];
  
  const triviaBox = document.getElementById("triviaBox");
  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");
  
  let remainingQuestions = [...triviaData];
  
  function showRandomTrivia() {
    if (remainingQuestions.length === 0) {
      // All questions have been shown, reset the questions
      remainingQuestions = [...triviaData];
    }
  
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const { question, answer } = remainingQuestions[randomIndex];
  
    questionElement.textContent = question;
    answerElement.textContent = answer;
    answerElement.style.display = "none";
  
    setTimeout(() => {
      answerElement.style.display = "block";
    }, 20000);
  
    setTimeout(() => {
      answerElement.style.display = "none";
      remainingQuestions.splice(randomIndex, 1); // Remove the shown question
      showRandomTrivia();
    }, 40000);
  }
  
  showRandomTrivia();