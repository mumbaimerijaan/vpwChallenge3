window.StoryApp = {
    data: null,
    currentStepIndex: 0,
    selections: {},
    baseImpact: 0.5,

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
        $('#sec-question').text(section.question);
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
                <div class="opt-card ${isSelected ? 'selected' : ''}" data-id="${opt.id}">
                    <div class="card-img-box">
                        <img class="card-img" src="${imagePath}" alt="${opt.label}">
                        <div class="check-circle">✓</div>
                    </div>
                    <div class="card-body">
                        <div class="card-title">${opt.label}</div>
                        <div class="emission-pill ${emissionClass}">
                            <span class="icon">${emissionIcon}</span> ${opt.emissionLabel}
                        </div>
                    </div>
                </div>
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
            const optId = $(this).data('id');
            const secId = section.id;
            
            if (!window.StoryApp.selections[secId]) {
                window.StoryApp.selections[secId] = [];
            }
            
            if ($(this).hasClass('selected')) {
                window.StoryApp.selections[secId].push(optId);
            } else {
                window.StoryApp.selections[secId] = window.StoryApp.selections[secId].filter(id => id !== optId);
            }
            
            window.StoryApp.updateFooterCount();
        });
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

        $('#results-container').removeClass('hidden');
        window.scrollTo(0, 0);
    }
};

$(document).ready(() => {
    window.StoryApp.init();
});
