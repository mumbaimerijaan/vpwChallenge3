window.QuizApp = window.QuizApp || {};

window.QuizApp.UI = {
    renderQuestion: function() {
        const state = window.QuizApp.State;
        const q = window.QuizApp.Data.getCurrentQuestion();
        const total = window.QuizApp.Data.getTotalQuestions();
        
        // Reset UI State
        $('.card').removeClass('flipped unselected revealed correct incorrect');
        $('.result-details').addClass('hidden');
        $('#center-result').addClass('hidden');
        $('#vs-badge').removeClass('hidden');
        $('#btn-next').addClass('hidden');
        $('#lock-text').removeClass('hidden');
        $('.confirm-action').removeClass('hidden');
        
        // Reset status icons
        $('#status-icon-a').removeClass('corr inc').addClass('sel').text('A');
        $('#status-icon-b').removeClass('corr inc').addClass('sel').text('B');
        $('#status-text-a, #status-text-b').text('You selected');
        
        // Update Header
        $('#progress-text').text(`Q${state.currentIndex + 1} of ${total}`);
        const progressPercent = ((state.currentIndex) / total) * 100;
        $('#progress-bar').css('width', `${progressPercent}%`);
        $('#progress-container').attr('aria-valuenow', Math.round(progressPercent));
        $('#score-val').text(state.score);
        $('#score-total').text(total);
        
        // Render Text
        $('#question-text').text(q.question).attr('tabindex', '-1').focus();
        $('#question-subtitle').text(q.subtitle || '');
        
        // Card A
        $('#title-a, #back-title-a').text(q.optionA.title);
        $('#sub-a, #back-sub-a').text(q.optionA.subtitle);
        $('#img-a').attr('src', window.ASSETS.imageBase + q.optionA.image).attr('alt', q.optionA.title + ': ' + q.optionA.description);
        $('#co2-a').text(q.optionA.co2);
        $('#desc-a').text(q.optionA.description);
        
        // Card B
        $('#title-b, #back-title-b').text(q.optionB.title);
        $('#sub-b, #back-sub-b').text(q.optionB.subtitle);
        $('#img-b').attr('src', window.ASSETS.imageBase + q.optionB.image).attr('alt', q.optionB.title + ': ' + q.optionB.description);
        $('#co2-b').text(q.optionB.co2);
        $('#desc-b').text(q.optionB.description);

        // Accessibility attributes and announcements
        $('#scene-a').attr('aria-label', `Option A: ${q.optionA.title}`).attr('aria-pressed', 'false');
        $('#scene-b').attr('aria-label', `Option B: ${q.optionB.title}`).attr('aria-pressed', 'false');
        
        // Announce question to screen readers
        const announcer = document.getElementById('quiz-announcer');
        if (announcer) {
            announcer.textContent = `Question ${state.currentIndex + 1} of ${total}: ${q.question}. ${q.subtitle || ''}`;
        }
        
        this.renderClouds('cloud-a', q.optionA.co2);
        this.renderClouds('cloud-b', q.optionB.co2);

        this.attachEvents();
    },

    renderClouds: function(elementId, co2Str) {
        const container = $(`#${elementId}`);
        container.empty();
        let numClouds = 3;
        if(co2Str.includes('saved')) numClouds = 1;
        else if(parseFloat(co2Str) > 2) numClouds = 6;
        else if(parseFloat(co2Str) < 1) numClouds = 2;
        
        for(let i=0; i<numClouds; i++) {
            container.append('<span></span>');
        }
    },

    attachEvents: function() {
        // Remove old handlers to prevent duplicates
        $('.card-scene').off('click');
        $('.btn-confirm').off('click');
        $('#btn-next').off('click');
        $('#btn-restart').off('click');
        
        $('.card-scene').on('click', function() {
            if ($('.card.revealed').length > 0) return; // Prevent clicks after confirmation
            const opt = $(this).data('option');
            if (window.QuizApp.State.selectedOption === opt) return; // Already selected
            window.QuizApp.UI.selectOption(opt);
        });

        // Keyboard support for cards
        $('.card-scene').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            }
        });
        
        $('.btn-confirm').on('click', function(e) {
            e.stopPropagation(); // prevent card click
            window.QuizApp.UI.confirmSelection();
        });
        
        $('#btn-next').on('click', function() {
            const nextQ = window.QuizApp.Data.nextQuestion();
            if (nextQ) {
                window.QuizApp.UI.renderQuestion();
            } else {
                window.QuizApp.UI.showSummary();
            }
        });

        $('#btn-restart').on('click', function() {
            window.QuizApp.Data.reset();
            $('#summary-container').addClass('hidden');
            $('#question-container').removeClass('hidden');
            $('#cards-container').removeClass('hidden');
            $('.top-bar').removeClass('hidden');
            $('.footer-actions').removeClass('hidden');
            window.QuizApp.UI.renderQuestion();
        });
    },
    
    selectOption: function(opt) {
        window.QuizApp.State.selectedOption = opt;
        
        const cardA = $('#scene-a .card');
        const cardB = $('#scene-b .card');
        
        cardA.removeClass('flipped unselected');
        cardB.removeClass('flipped unselected');
        
        if (opt === 'A') {
            cardA.addClass('flipped');
            $('#scene-a').attr('aria-pressed', 'true');
            $('#scene-b').attr('aria-pressed', 'false');
        } else {
            cardB.addClass('flipped');
            $('#scene-b').attr('aria-pressed', 'true');
            $('#scene-a').attr('aria-pressed', 'false');
        }
    },
    
    confirmSelection: function() {
        const opt = window.QuizApp.State.selectedOption;
        const q = window.QuizApp.Data.getCurrentQuestion();
        const isCorrect = window.QuizApp.Data.checkAnswer(opt);
        
        // Flip both cards to back
        const cardA = $('#scene-a .card');
        const cardB = $('#scene-b .card');
        
        cardA.removeClass('unselected').addClass('flipped revealed');
        cardB.removeClass('unselected').addClass('flipped revealed');
        
        $('.confirm-action').addClass('hidden'); // Hide confirm buttons
        $('.result-details').removeClass('hidden'); // Show details
        
        if (q.correct === 'A') {
            cardA.addClass('correct');
            cardB.addClass('incorrect');
            $('#status-icon-a').removeClass('sel inc').addClass('corr').text('✓');
            $('#status-icon-b').removeClass('sel corr').addClass('inc').text('✕');
            $('#status-text-a').text('Correct');
            $('#status-text-b').text('Incorrect');
        } else {
            cardA.addClass('incorrect');
            cardB.addClass('correct');
            $('#status-icon-a').removeClass('sel corr').addClass('inc').text('✕');
            $('#status-icon-b').removeClass('sel inc').addClass('corr').text('✓');
            $('#status-text-a').text('Incorrect');
            $('#status-text-b').text('Correct');
        }
        
        // Show center result panel
        $('#vs-badge').addClass('hidden');
        $('#center-result').removeClass('hidden');
        $('#center-heading').text(isCorrect ? 'Correct!' : 'Not Quite!');
        $('#center-icon').text(isCorrect ? '🌟' : '🍃');
        $('#center-fact').text(q.fact);

        // Announce outcome
        const announcer = document.getElementById('quiz-announcer');
        if (announcer) {
            announcer.textContent = `${isCorrect ? 'Correct!' : 'Not Quite!'} ${q.fact}`;
        }
        
        // Show next button
        $('#lock-text').addClass('hidden');
        $('#btn-next').removeClass('hidden');
        
        // Update header score immediately
        const total = window.QuizApp.Data.getTotalQuestions();
        $('#score-val').text(window.QuizApp.State.score);
        const progressPercent = ((window.QuizApp.State.currentIndex + 1) / total) * 100;
        $('#progress-bar').css('width', `${progressPercent}%`);
        $('#progress-container').attr('aria-valuenow', Math.round(progressPercent));
    },

    showSummary: function() {
        $('#question-container').addClass('hidden');
        $('#cards-container').addClass('hidden');
        $('.top-bar').addClass('hidden');
        $('.footer-actions').addClass('hidden');
        
        $('#summary-container').removeClass('hidden');
        $('.summary-title').attr('tabindex', '-1').focus();
        
        const score = window.QuizApp.State.score;
        const total = window.QuizApp.Data.getTotalQuestions();
        const percent = Math.round((score / total) * 100);
        
        $('#final-percentage').text(`${percent}%`);

        // Announce final score
        const announcer = document.getElementById('quiz-announcer');
        if (announcer) {
            announcer.textContent = `Challenge Complete! Your Carbon Awareness Score is ${percent} percent.`;
        }
    }
};
