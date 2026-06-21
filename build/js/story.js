window.StoryApp = {
    data: null,
    currentStepIndex: 0,
    selections: {},
    baseImpact: 0.5,

    HistoryManager: {
        STORAGE_KEY: 'carbonStoryHistory',
        
        saveAssessment: function(totalImpact, breakdown) {
            const history = this.getHistory();
            const assessment = {
                id: Date.now(),
                date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
                score: parseFloat(totalImpact.toFixed(1)),
                breakdown: breakdown
            };
            history.push(assessment);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
            return history;
        },
        
        getHistory: function() {
            try {
                return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
            } catch (e) {
                return [];
            }
        }
    },

    init: async function() {
        try {
            const res = await fetch('./data/carbon-story.json');
            const json = await res.json();
            this.data = json.sections;
            this.renderStep();
            this.attachGlobalEvents();
        } catch (e) {
            console.error("Failed to load story data", e);
        }
    },

    renderProgressNodes: function() {
        let html = '';
        const nodeIcons = ['🚗', '🏠', '🍽️', '🛍️', '👤'];
        
        this.data.forEach((sec, i) => {
            const isActive = i === this.currentStepIndex;
            const isFilled = i < this.currentStepIndex;
            
            html += `
                <div class="node-wrap ${isActive ? 'active' : ''} ${isFilled ? 'filled' : ''}">
                    <div class="node-circle">
                        ${isFilled ? '✓' : (nodeIcons[i] || '•')}
                    </div>
                    <div class="node-label">${sec.title}</div>
                    ${i < this.data.length - 1 ? `<div class="node-line ${isFilled ? 'filled' : ''}"></div>` : ''}
                </div>
            `;
        });
        $('#progress-nodes').html(html);
    },

    renderStep: function() {
        if (this.currentStepIndex >= this.data.length) {
            this.showResults();
            return;
        }

        const section = this.data[this.currentStepIndex];
        
        $('#step-val').text(this.currentStepIndex + 1);
        $('#step-total').text(this.data.length);
        $('#hero-bg').css('background-image', `url('${window.ASSETS.imageBase + section.heroImage}')`);
        
        $('#sec-title').text(section.title.toUpperCase());
        $('#sec-question').text(section.question).attr('tabindex', '-1').focus();
        $('#sec-desc').text(section.description);
        
        this.renderProgressNodes();

        let cardsHtml = '';
        section.options.forEach((opt, index) => {
            const isSelected = (this.selections[section.id] || []).includes(opt.id);
            const row = this.currentStepIndex;
            const col = index;
            
            // Calculate absolute index 1 to 30
            const absoluteIndex = (row * 6) + col + 1;
            const paddedIndex = absoluteIndex.toString().padStart(2, '0');
            const imagePath = window.ASSETS.imageBase + `icons/${paddedIndex}.png`;
            
            const emissionClass = opt.emissionLevel || 'low';
            const emissionIcon = emissionClass === 'high' ? '☁️' : '🍃';
            
            cardsHtml += `
                <button class="opt-card ${isSelected ? 'selected' : ''}" data-id="${opt.id}" aria-pressed="${isSelected ? 'true' : 'false'}">
                    <div class="card-img-box" aria-hidden="true">
                        <img class="card-img" src="${imagePath}" alt="">
                        <div class="check-circle">✓</div>
                    </div>
                    <div class="card-body">
                        <div class="card-title">${opt.label}</div>
                        <div class="emission-pill ${emissionClass}">
                            <span class="icon" aria-hidden="true">${emissionIcon}</span> ${opt.emissionLabel}
                        </div>
                    </div>
                </button>
            `;
        });
        
        $('#options-grid').html(cardsHtml);
        
        $('#story-container').removeClass('hidden');
        $('#results-container').addClass('hidden');
        $('#footer-actions').removeClass('hidden');

        this.updateFooterCount();

        // Attach Card Events
        $('.opt-card').off('click').on('click', function() {
            $(this).toggleClass('selected');
            const isSel = $(this).hasClass('selected');
            $(this).attr('aria-pressed', isSel ? 'true' : 'false');
            
            const optId = $(this).data('id');
            const secId = section.id;
            
            if (!window.StoryApp.selections[secId]) {
                window.StoryApp.selections[secId] = [];
            }
            
            if (isSel) {
                window.StoryApp.selections[secId].push(optId);
            } else {
                window.StoryApp.selections[secId] = window.StoryApp.selections[secId].filter(id => id !== optId);
            }
            
            window.StoryApp.updateFooterCount();
        });

        // Keyboard Support for Cards
        $('.opt-card').off('keydown').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).click();
            }
        });

        // Announce current step
        const announcer = document.getElementById('story-announcer');
        if (announcer) {
            announcer.textContent = `Step ${this.currentStepIndex + 1} of ${this.data.length}: ${section.title}. ${section.question}`;
        }
    },

    updateFooterCount: function() {
        const secId = this.data[this.currentStepIndex].id;
        const count = (this.selections[secId] || []).length;
        $('#selection-count').text(`${count} option${count === 1 ? '' : 's'}`);
        
        if (this.currentStepIndex === this.data.length - 1) {
            $('#btn-next').html('See My Action Plan &rarr;');
        } else {
            const nextSec = this.data[this.currentStepIndex + 1];
            $('#btn-next').html(`Next: ${nextSec.title} &rarr;`);
        }
    },

    attachGlobalEvents: function() {
        $('#btn-next').on('click', () => {
            this.currentStepIndex++;
            this.renderStep();
            window.scrollTo(0, 0);
        });

        // Add handler for results action plan button
        $('#btn-action-plan').on('click', () => {
            window.parent.postMessage({ type: 'navigate', target: 'build/future.html' }, '*');
        });

        // Modals
        $('#btn-info-impact').on('click', () => {
            $('#modal-impact').removeClass('hidden');
        });
        $('.view-all-recs').on('click', (e) => {
            e.preventDefault();
            $('#modal-recs').removeClass('hidden');
        });
        $('.modal-close, .modal-overlay').on('click', function(e) {
            if (e.target === this) {
                $(this).closest('.modal-overlay').addClass('hidden');
            }
        });
    },

    showResults: function() {
        // Apply result specific styles
        $('#hero-bg').css('background-image', `url("${window.ASSETS.images.heroResult}")`).css('background-color', 'var(--bg-color)');
        $('#footer-icon').attr('src', window.ASSETS.imageBase + 'icons/05.png');
        $('.gradient-overlay').hide();
        $('#app-main').addClass('results-mode');
        
        // Update headers
        $('#main-subtitle').text("Here's the impact of your everyday choices.");
        $('#step-container').hide();
        
        $('#story-container').addClass('hidden');
        $('#footer-actions').addClass('hidden');
        
        let totalImpact = this.baseImpact;
        let categoryBreakdown = {};
        let recommendations = [];

        this.data.forEach(sec => {
            categoryBreakdown[sec.title] = 0;
            const selectedIds = this.selections[sec.id] || [];
            sec.options.forEach(opt => {
                if (selectedIds.includes(opt.id)) {
                    totalImpact += opt.impactValue;
                    categoryBreakdown[sec.title] += Math.max(0, opt.impactValue);
                    recommendations.push({ label: opt.label, text: opt.recommendationText });
                }
            });
            if (categoryBreakdown[sec.title] < 0) categoryBreakdown[sec.title] = 0.1;
            if (categoryBreakdown[sec.title] === 0) categoryBreakdown[sec.title] = 0.05; 
        });

        totalImpact = Math.max(0.1, totalImpact);

        $('#final-score').text(totalImpact.toFixed(1));
        const avg = 4.7; // Update global average to 4.7 as per design 
        if (totalImpact <= avg) {
            $('#comparison-stat').text(`Better than 68% of people`);
            $('#compare-hl').text('lower than the global average').css('color', 'var(--success)');
            $('#meter-fill').css('width', `${(totalImpact/10)*100}%`).css('background', 'var(--success)');
            
            $('#center-msg-title').html(`<span class="footprint" style="color: var(--success)">👣</span> Low Impact`);
            $('#center-msg-desc').text(`Great job! You're making a positive difference.`);
        } else {
            $('#comparison-stat').text(`Room for improvement`);
            $('#compare-hl').text('higher than the global average').css('color', 'var(--warning)');
            $('#meter-fill').css('width', `${Math.min(100, (totalImpact/10)*100)}%`).css('background', 'var(--warning)');
            
            $('#center-msg-title').html(`<span class="footprint" style="color: var(--warning)">👣</span> High Impact`);
            $('#center-msg-desc').text(`Room for improvement. Every small step helps!`);
        }
        $('.meter-marker').css('left', `${(avg/10)*100}%`);

        let totalBreakdown = Object.values(categoryBreakdown).reduce((a,b)=>a+b, 0) || 1;
        const colors = ['#8070FF', '#28C76F', '#FF9F43', '#FF70A6', '#4A90E2'];
        const catIcons = ['🚗', '🏠', '🍽️', '🛍️', '💬'];
        
        let catHtml = '';
        Object.keys(categoryBreakdown).forEach((cat, index) => {
            const val = categoryBreakdown[cat];
            const pct = Math.round((val / totalBreakdown) * 100);
            const color = colors[index % colors.length];
            const icon = catIcons[index % catIcons.length];
            
            // Determine cloud tag
            let emissionClass = 'low';
            let emissionLabel = 'Low';
            if (pct > 25) {
                emissionClass = 'high';
                emissionLabel = 'High';
            } else if (pct > 15) {
                emissionClass = 'med';
                emissionLabel = 'Medium';
            }
            
            catHtml += `
                <div class="cat-list-item">
                    <div class="cat-left">
                        <div class="cat-icon-box" style="background: ${color}20; color: ${color};">${icon}</div>
                        <div class="cat-title-col">
                            <h4>${cat}</h4>
                        </div>
                    </div>
                    <div class="cat-center">
                        <div class="cat-pct" style="color: ${color}">${pct}%</div>
                        <div class="cat-val">${val.toFixed(2)} t CO₂e</div>
                    </div>
                    <div class="cat-right">
                        <div class="emission-pill ${emissionClass}">
                            <span class="icon">☁️</span> ${emissionLabel}
                        </div>
                    </div>
                </div>
            `;
        });
        $('#category-cards').html(catHtml);

        let legendHtml = '';
        let conicStops = [];
        let currentPercent = 0;
        
        Object.keys(categoryBreakdown).forEach((cat, index) => {
            const val = categoryBreakdown[cat];
            const pct = (val / totalBreakdown) * 100;
            const color = colors[index % colors.length];
            conicStops.push(`${color} ${currentPercent}% ${currentPercent + pct}%`);
            currentPercent += pct;
            legendHtml += `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${color}"></div>
                    <span>${cat} <span style="float:right; font-weight:700;">${Math.round(pct)}%</span></span>
                </div>
            `;
        });
        
        $('#donut-chart').css('background', `conic-gradient(${conicStops.join(', ')})`);
        $('#donut-legend').html(legendHtml);

        let recHtml = '';
        // Mock horizontal recs with hardcoded text matching design since we might not have them in JSON exactly
        const designRecs = [
            { icon: '🚆', color: '#8070FF', title: 'Use public transport', text: '2-3 days a week', saving: '↓ 0.35 t CO₂e/year' },
            { icon: '💡', color: '#FF9F43', title: 'Switch to LED lights', text: 'at home', saving: '↓ 0.12 t CO₂e/year' },
            { icon: '🍃', color: '#28C76F', title: 'Eat more plant', text: 'based meals', saving: '↓ 0.28 t CO₂e/year' }
        ];

        designRecs.forEach(rec => {
            recHtml += `
                <div class="rec-item-horiz">
                    <div class="rec-icon-horiz" style="background: ${rec.color}20; color: ${rec.color}">${rec.icon}</div>
                    <div class="rec-horiz-content">
                        <strong>${rec.title}</strong>
                        <p>${rec.text}</p>
                        <div class="rec-saving" style="color: ${rec.color}">${rec.saving}</div>
                    </div>
                </div>
            `;
        });
        $('#recs-list').html(recHtml);

        // --- Save and Render History ---
        const history = this.HistoryManager.saveAssessment(totalImpact, categoryBreakdown);
        this.renderHistoryDashboard(history);

        $('#results-container').removeClass('hidden');
        $('#center-msg-title').attr('tabindex', '-1').focus();
        window.scrollTo(0, 0);

        // Announce Results
        const announcer = document.getElementById('story-announcer');
        if (announcer) {
            announcer.textContent = `Results generated. Your total annual emissions are ${totalImpact.toFixed(1)} tonnes. Impact is ${totalImpact <= avg ? 'Low' : 'High'}.`;
        }
    },

    renderHistoryDashboard: function(history) {
        if (!history || history.length === 0) return;

        const current = history[history.length - 1];
        const previous = history.length > 1 ? history[history.length - 2] : null;

        // 1. Insights & Comparison
        if (previous) {
            const diff = current.score - previous.score;
            const pct = Math.round(Math.abs(diff / previous.score) * 100);
            
            if (diff < 0) {
                $('#history-comparison-text').html(`Great! You reduced your footprint by <span class="trend-down">${pct}%</span> (<span class="trend-down">${diff.toFixed(1)} t</span>)`);
            } else if (diff > 0) {
                $('#history-comparison-text').html(`Your footprint increased by <span class="trend-up">${pct}%</span> (<span class="trend-up">+${diff.toFixed(1)} t</span>)`);
            } else {
                $('#history-comparison-text').html(`Your footprint remained the same.`);
            }

            // Generate Insights
            let insightsHtml = '';
            let improvedCat = null;
            let worsenedCat = null;
            let maxImp = 0;
            let maxWorse = 0;

            Object.keys(current.breakdown).forEach(cat => {
                const curVal = current.breakdown[cat];
                const prevVal = previous.breakdown[cat] || curVal;
                const catDiff = curVal - prevVal;
                
                if (catDiff < maxImp) { maxImp = catDiff; improvedCat = cat; }
                if (catDiff > maxWorse) { maxWorse = catDiff; worsenedCat = cat; }
            });

            if (improvedCat) {
                insightsHtml += `<div class="insight-item"><span aria-hidden="true">🌟</span> <div>Your <strong>${improvedCat}</strong> choices improved significantly.</div></div>`;
            }
            if (worsenedCat) {
                insightsHtml += `<div class="insight-item"><span aria-hidden="true">⚠️</span> <div>Your <strong>${worsenedCat}</strong> emissions increased compared to last time.</div></div>`;
            }
            if (history.length >= 3) {
                const prev2 = history[history.length - 3];
                if (current.score < previous.score && previous.score < prev2.score) {
                    insightsHtml += `<div class="insight-item"><span aria-hidden="true">🔥</span> <div>You're on a streak! 3 consecutive assessments with reductions.</div></div>`;
                }
            }

            $('#history-insights-list').html(insightsHtml);
        } else {
            $('#history-comparison-text').text('Complete another assessment to track progress!');
            $('#history-insights-list').html(`<div class="insight-item"><span aria-hidden="true">🌱</span> <div>This is your baseline. Try changing a few habits next time!</div></div>`);
        }

        // 2. Badges
        let badgesHtml = '';
        if (history.length >= 1) badgesHtml += `<div class="badge">🌱 First Assessment</div>`;
        if (previous && current.score < previous.score) badgesHtml += `<div class="badge">📉 Carbon Reducer</div>`;
        if (current.score < 4.7) badgesHtml += `<div class="badge">🌍 Green Champion</div>`;
        if (history.length >= 3 && history[history.length-1].score < history[history.length-2].score && history[history.length-2].score < history[history.length-3].score) {
            badgesHtml += `<div class="badge">🔥 3-Streak Improvement</div>`;
        }
        $('#achievements-list').html(badgesHtml);

        // 3. Timeline Cards
        let timelineHtml = '';
        const displayHistory = [...history].reverse(); // newest first
        displayHistory.forEach((item, index) => {
            const isCurrent = index === 0;
            let trendHtml = '';
            if (index < displayHistory.length - 1) { // Compare with older
                const older = displayHistory[index + 1];
                const itemDiff = item.score - older.score;
                if (itemDiff < 0) trendHtml = `<div class="timeline-trend trend-down">↓ ${Math.abs(itemDiff).toFixed(1)}</div>`;
                else if (itemDiff > 0) trendHtml = `<div class="timeline-trend trend-up">↑ ${itemDiff.toFixed(1)}</div>`;
                else trendHtml = `<div class="timeline-trend trend-neutral">- 0.0</div>`;
            }
            timelineHtml += `
                <div class="timeline-card ${isCurrent ? 'current' : ''}">
                    <span class="timeline-date">${item.date} ${isCurrent ? '(Now)' : ''}</span>
                    <div class="timeline-score">${item.score}</div>
                    ${trendHtml}
                </div>
            `;
        });
        $('#timeline-cards').html(timelineHtml);

        // 4. SVG Chart
        if (history.length > 1) {
            this.renderSVGChart(history);
        } else {
            $('#trend-chart-container').html('<div style="color: var(--text-light); font-size: 0.9rem;">Chart will appear after your next assessment.</div>');
        }

        // 5. Export Binding
        $('#btn-print').off('click').on('click', () => window.print());
        $('#btn-export-txt').off('click').on('click', () => {
            let text = "CarbonStory - Progress Summary\n\n";
            history.forEach((h, i) => {
                text += `Assessment ${i+1} (${h.date}): ${h.score} tonnes CO2e\n`;
            });
            const blob = new Blob([text], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'CarbonStory-History.txt';
            a.click();
        });
    },

    renderSVGChart: function(history) {
        const w = 400;
        const h = 150;
        const padX = 20;
        const padY = 20;
        
        // Take up to last 10 points
        const points = history.slice(-10);
        
        const maxScore = Math.max(...points.map(p => p.score), 5);
        const minScore = 0;
        
        let svg = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">`;
        
        // Y Axis Grid
        svg += `<line x1="${padX}" y1="${padY}" x2="${w-padX}" y2="${padY}" stroke="rgba(0,0,0,0.1)" stroke-dasharray="4"/>`;
        svg += `<line x1="${padX}" y1="${h-padY}" x2="${w-padX}" y2="${h-padY}" stroke="rgba(0,0,0,0.1)"/>`;
        
        // Line
        let pathD = "";
        const stepX = (w - 2*padX) / Math.max(1, (points.length - 1));
        
        points.forEach((p, i) => {
            const x = padX + i * stepX;
            // map score to Y: top is maxScore, bottom is minScore
            const y = h - padY - ((p.score - minScore) / (maxScore - minScore)) * (h - 2*padY);
            if (i === 0) pathD += `M ${x} ${y} `;
            else pathD += `L ${x} ${y} `;
        });
        
        svg += `<path d="${pathD}" fill="none" stroke="#8070FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
        
        // Dots
        points.forEach((p, i) => {
            const x = padX + i * stepX;
            const y = h - padY - ((p.score - minScore) / (maxScore - minScore)) * (h - 2*padY);
            svg += `<circle cx="${x}" cy="${y}" r="5" fill="#8070FF" stroke="#fff" stroke-width="2"><title>${p.date}: ${p.score}</title></circle>`;
        });
        
        svg += `</svg>`;
        $('#trend-chart-container').html(svg);
    }
};

$(document).ready(() => {
    window.StoryApp.init();
});
