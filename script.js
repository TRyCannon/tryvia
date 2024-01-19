let triviaQuestions = [
    { question: "What is the chemical symbol for gold?", answer: "Answer: Gold's chemical symbol is Au." },
    { question: "What is the capital city of Japan?", answer: "Answer: The capital city of Japan is Tokyo." },
    { question: "Who was the first President of the United States?", answer: "Answer: The first President of the United States was George Washington." },
    { question: "Who wrote the novel 1984?", answer: "Answer: 1984 was written by George Orwell." },
    { question: "Which country hosted the 2016 Summer Olympics?", answer: "Answer: The 2016 Summer Olympics were hosted by Brazil." },
    { question: "Who composed the famous symphony No. 5 in C minor?", answer: "Answer: Ludwig van Beethoven composed Symphony No. 5 in C minor." },
    { question: "Who painted the Mona Lisa?", answer: "Answer: The Mona Lisa was painted by Leonardo da Vinci." },
    { question: "What movie won the Academy Award for Best Picture in 2000?", answer: "Answer: Gladiator won the Academy Award for Best Picture in 2000." },
    { question: "Who is known as the inventor of the World Wide Web?", answer: "Answer: Tim Berners-Lee is known as the inventor of the World Wide Web." },
    { question: "What planet is known as the Red Planet?", answer: "Answer: Mars is known as the Red Planet." },
    { question: "What is the largest organ in the human body?", answer: "Answer: The skin is the largest organ in the human body." },
    { question: "What is the value of Pi up to two decimal places?", answer: "Answer: The value of Pi up to two decimal places is 3.14." },
    { question: "Which country is known for inventing pizza?", answer: "Answer: Italy is known for inventing pizza." },
    { question: "What is the fastest land animal in the world?", answer: "Answer: The cheetah is the fastest land animal in the world." },
    { question: "What is the most spoken language in the world?", answer: "Answer: The most spoken language in the world is Mandarin Chinese." },
    { question: "Which TV show featured characters named Ross, Rachel, and Joey?", answer: "Answer: Friends featured characters named Ross, Rachel, and Joey." },
    { question: "Who is considered the founder of modern haute couture?", answer: "Answer: Charles Frederick Worth is considered the founder of modern haute couture." },
    { question: "What board game involves buying and selling properties?", answer: "Answer: Monopoly is the board game that involves buying and selling properties." },
    { question: "Who was the first female Prime Minister of the United Kingdom?", answer: "Answer: The first female Prime Minister of the United Kingdom was Margaret Thatcher." },
    { question: "What is the tallest type of tree in the world?", answer: "Answer: The tallest type of tree in the world is the redwood, specifically, the species Sequoia sempervirens" },
];

function startTriviaGame() {
let currentQuestionIndex = Math.floor(Math.random() * triviaQuestions.length);
let isQuestionVisible = true;
let triviaContent = document.getElementById('trivia-content');
let timerDisplay = document.getElementById('timer');
let countdown;
let timer;

function showNext() {
clearInterval(timer);

// Function to update content
function updateContent() {
    triviaContent.innerHTML = isQuestionVisible 
        ? triviaQuestions[currentQuestionIndex].question 
        : triviaQuestions[currentQuestionIndex].answer;
}

// Function to start the countdown timer
function startCountdown() {
    let timeLeft = isQuestionVisible ? 10 : 5;
    timerDisplay.innerHTML = `Time left: ${timeLeft} seconds`;

    countdown = () => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerHTML = `Time left: ${timeLeft} seconds`;
        } else {
            clearInterval(timer);
            if (!isQuestionVisible) {
                // Update the question index only when moving to the next question
                currentQuestionIndex = (currentQuestionIndex + 1) % triviaQuestions.length;
            }
            isQuestionVisible = !isQuestionVisible;
            showNext();
        }
    };

    timer = setInterval(countdown, 1000);
}

// Fade out existing content
triviaContent.classList.add('fade-out');
triviaContent.classList.remove('fade-in');

setTimeout(() => {
    updateContent();

    // Fade in updated content and start the countdown
    triviaContent.classList.remove('fade-out');
    triviaContent.classList.add('fade-in');
    startCountdown();
}, 500);
}

showNext();
}

function changeContent(section) {
    const contentDiv = document.getElementById('content');
    contentDiv.classList.add('fade-transition', 'hidden');
    contentDiv.style.opacity = 0;

        setTimeout(() => {
            switch (section) {
                case 'home':
                    contentDiv.innerHTML = '<h2>Front End Developer</h2><p>I am currently working as a front end IT specialist. My primary responsibilies include supporting our developers by reviewing and testing code which primarily includes HTML, CSS, JavaScript and PHP. Additionally, I work alongside other teams including marketing and product management to tackle front end development needs, communicate additional needs to our developers, and through cross-departmental efforts create a better experience for users.</p>';
                    contentDiv.innerHTML += '<div class="text-left"><p>Toledo, Ohio | trycannon@gmail.com | <a href="https://www.linkedin.com/in/trycannon/" target="_blank">LinkedIn</a></p></div>';
                    break;
                case 'info':
                    contentDiv.innerHTML = '<h2>Info</h2><p>I am a Front-End Web Developer based in Toledo, Ohio, with a Bachelor\'s degree in Digital Marketing from Southern New Hampshire University. My work experience includes roles as a Front End IT Specialist at SD Bullion and as a Junior Developer at WaudWare. My skill set encompasses front-end website content management using HTML, CSS, and JavaScript, software development in FoxPro, site optimization, and a proficiency in Adobe Creative Suite. I strive to demonstrate a collaborative approach in my projects, ensuring code clarity, working with cross-functional teams, and staying updated on industry trends.</p>';
                    contentDiv.innerHTML += '<div class="text-left"><a href="./assets/resume.pdf" class="resume-button btn btn-primary" target="_blank">Resume</a></div>';
                    break;
                case 'projects':
                    contentDiv.innerHTML = `
                        <h2>Projects/Contributions</h2>
                        <div class="card-container">
                            <div class="card-wrapper">
                                <div class="card mb-3 bg-dark text-white" style="width: 100%;">
                                    <img src="./assets/sdbullion.png" class="card-img-top" alt="SD Bullion Home Page">
                                    <div class="card-body">
                                        <h5 class="card-title">SD Bullion</h5>
                                        <p class="card-text">Platform: Adobe Commerce</br>Languages Used:</br>
                                            <ul>
                                                <li>HTML</li>
                                                <li>CSS</li>
                                                <li>JavaScript</li>
                                                <li>PHP</li>
                                            </ul>
                                            My Contribution: QA, content management and page building, aided developers and other teams in fixing bugs and adding content and feaures to the site.
                                        </p>
                                        <a href="https://sdbullion.com/" class="btn btn-secondary" target="_blank">Visit Site</a>
                                    </div>
                                </div>
                            </div>
                            <div class="card-wrapper">
                                <div class="card mb-3 bg-dark text-white" style="width: 100%;">
                                    <img src="./assets/buchuvida.png" class="card-img-top" alt="BuchuVida Home Page">
                                    <div class="card-body">
                                        <h5 class="card-title">BuchuVida</h5>
                                        <p class="card-text">Platform: Squarespace</br>Languages Used:</br>
                                            <ul>
                                                <li>HTML</li>
                                                <li>CSS</li>
                                            </ul>
                                            My Contribution: Primarily a marketing role, created banners and page layouts, developed content, managed storefront, and aided in creating site styling.
                                        </p>
                                        <a href="https://buchuvida.com/" class="btn btn-secondary" target="_blank">Visit Site</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="trivia-container">
                        <div id="trivia-content"></div>
                        <div id="timer"></div>
                        <div class="disclaimer"><p>*This is a passion project that is currently under development. In the future I intend to add a variety of interactive features and eventually have this be its own trivia site.</p></div>
                        </div>
                    `;
                    startTriviaGame();
                    break;
                case 'contact':
                    contentDiv.innerHTML = `
                        <h2>Contact</h2>
                        <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSccrckH1hbkLkfDo8duUTwziE4lllNyGcB8YRTVcy9xheN1mQ/formResponse" method="POST">
                            <div class="mb-3">
                                <label for="entry.36853193" class="form-label">Name</label>
                                <input type="text" class="form-control" name="entry.36853193" id="entry.36853193" placeholder="Your Name">
                            </div>
                            <div class="mb-3">
                                <label for="entry.2017912987" class="form-label">Email</label>
                                <input type="email" class="form-control" name="entry.2017912987" id="entry.2017912987" placeholder="Your Email">
                            </div>
                            <div class="mb-3">
                                <label for="entry.1739195872" class="form-label">Message</label>
                                <textarea class="form-control" name="entry.1739195872" id="entry.1739195872" rows="4" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" class="resume-button">Submit</button>
                        </form>
                    `;
                    break;
                default:
                    break;
            }
            contentDiv.classList.remove('hidden');
            contentDiv.classList.add('visible');
            contentDiv.style.opacity = 1;
        }, 500);
    }
  