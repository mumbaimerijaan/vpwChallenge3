window.QuizApp = window.QuizApp || {};

window.QuizApp.State = {
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedOption: null
};

window.QuizApp.Data = {
    /**
     * Fetches questions from JSON, shuffles them, and caches assets.
     * @returns {Promise<boolean>} Resolves to true if successful, false otherwise.
     */
    loadQuestions: async function() {
        try {
            const response = await fetch('./data/questions.json');
            const data = await response.json();
            
            let questions = data.questions;
            const config = data.config || {
                numberOfQuestions: questions.length,
                randomiseQuestions: false,
                randomiseOptions: false
            };

            if (config.randomiseQuestions) {
                // Fisher-Yates shuffle
                for (let i = questions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [questions[i], questions[j]] = [questions[j], questions[i]];
                }
            }
            
            if (config.numberOfQuestions && config.numberOfQuestions < questions.length) {
                questions = questions.slice(0, config.numberOfQuestions);
            }

            if (config.randomiseOptions) {
                questions.forEach(q => {
                    if (Math.random() > 0.5) {
                        const temp = q.optionA;
                        q.optionA = q.optionB;
                        q.optionB = temp;
                        q.correct = (q.correct === 'A') ? 'B' : 'A';
                    }
                });
            }

            window.QuizApp.State.questions = questions;
            window.QuizApp.State.config = config;
            
            // Send message to SW to cache images
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                const imageUrls = [];
                questions.forEach(q => {
                    if (q.optionA.image) imageUrls.push(q.optionA.image);
                    if (q.optionB.image) imageUrls.push(q.optionB.image);
                });
                navigator.serviceWorker.controller.postMessage({
                    type: 'CACHE_IMAGES',
                    urls: imageUrls
                });
            }
            
            return true;
        } catch (error) {
            console.error('Error loading questions:', error);
            return false;
        }
    },
    
    /**
     * Returns the currently active question object.
     * @returns {Object} The current question.
     */
    getCurrentQuestion: function() {
        return window.QuizApp.State.questions[window.QuizApp.State.currentIndex];
    },
    
    /**
     * Gets the total number of questions in the current quiz set.
     * @returns {number} Length of questions array.
     */
    getTotalQuestions: function() {
        return window.QuizApp.State.questions.length;
    },
    
    /**
     * Validates the selected answer against the correct answer.
     * @param {string} selected - The user's selection (e.g., 'A' or 'B').
     * @returns {boolean} True if correct.
     */
    checkAnswer: function(selected) {
        const q = this.getCurrentQuestion();
        const isCorrect = (selected === q.correct);
        if (isCorrect) {
            window.QuizApp.State.score++;
        }
        return isCorrect;
    },
    
    /**
     * Advances the internal index to the next question.
     * @returns {Object} The next question object.
     */
    nextQuestion: function() {
        window.QuizApp.State.currentIndex++;
        window.QuizApp.State.selectedOption = null;
        return this.getCurrentQuestion();
    },
    
    /**
     * Resets the entire quiz state for a fresh start.
     */
    reset: function() {
        window.QuizApp.State.currentIndex = 0;
        window.QuizApp.State.score = 0;
        window.QuizApp.State.selectedOption = null;
    }
};

window.QuizApp.init = async function() {
    const success = await window.QuizApp.Data.loadQuestions();
    if (success) {
        window.QuizApp.UI.renderQuestion();
    } else {
        $('#question-text').text('Failed to load quiz data. Please check connection.');
    }
};
