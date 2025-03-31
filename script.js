document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    const questions = [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"], answer: "Harper Lee" },
        { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
    ];

    function loadQuiz() {
        quizContainer.innerHTML = "";
        const progress = JSON.parse(sessionStorage.getItem("progress")) || {};

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

            q.options.forEach(option => {
                const label = document.createElement("label");
                const input = document.createElement("input");
                input.type = "radio";
                input.name = `question${index}`;
                input.value = option;
                if (progress[index] === option) input.checked = true;

                input.addEventListener("change", () => {
                    progress[index] = option;
                    sessionStorage.setItem("progress", JSON.stringify(progress));
                });

                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement("br"));
            });
            quizContainer.appendChild(questionDiv);
        });
    }

    function calculateScore() {
        let score = 0;
        const progress = JSON.parse(sessionStorage.getItem("progress")) || {};
        
        questions.forEach((q, index) => {
            if (progress[index] === q.answer) {
                score++;
            }
        });

        scoreDisplay.textContent = `Your score is ${score} out of 5.`;
        localStorage.setItem("score", score);
    }

    function loadScore() {
        const savedScore = localStorage.getItem("score");
        if (savedScore !== null) {
            scoreDisplay.textContent = `Your last score was ${savedScore} out of 5.`;
        }
    }

    submitButton.addEventListener("click", calculateScore);
    loadQuiz();
    loadScore();
});
