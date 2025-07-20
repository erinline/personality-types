// Test State
let currentQuestion = 0;
let answers = [];
let scores = {
    depth: 0,
    breadth: 0,
    interacting: 0,
    doing: 0,
    light: 0,
    serious: 0
};

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const testScreen = document.getElementById('test-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-test');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const retakeBtn = document.getElementById('retake-btn');
const shareBtn = document.getElementById('share-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionText = document.getElementById('question-text');
const leftLabel = document.getElementById('left-label');
const rightLabel = document.getElementById('right-label');
const answerScale = document.getElementById('answer-scale');

// Event Listeners
startBtn.addEventListener('click', startTest);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
retakeBtn.addEventListener('click', resetTest);
shareBtn.addEventListener('click', shareResults);

// Initialize
function startTest() {
    welcomeScreen.classList.remove('active');
    testScreen.classList.add('active');
    showQuestion();
}

const overlay = document.querySelector('.slider-reveal-overlay');

function updateRevealOverlay(value) {
  const percent = ((5 - value) / 4) * 100;
  overlay.style.width = `${percent}%`;
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.text;
    leftLabel.textContent = question.leftLabel;
    rightLabel.textContent = question.rightLabel;
    
    // Set slider value if answer exists
    if (answers[currentQuestion] !== undefined) {
        answerScale.value = answers[currentQuestion];
    } else {
        answerScale.value = 3; // Default to neutral
    }
    updateRevealOverlay(answerScale.value);
    
    // Update progress
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Update button states
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Finish' : 'Next';
}

function previousQuestion() {
    if (currentQuestion > 0) {
        // Save current answer
        answers[currentQuestion] = parseInt(answerScale.value);
        currentQuestion--;
        showQuestion();
    }
}

function nextQuestion() {
    // Save current answer
    answers[currentQuestion] = parseInt(answerScale.value);
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        // Test complete
        calculateResults();
        const rankedTypes = determinePersonalityType();
        displayPersonalityResult(rankedTypes[0].type);
        showResults();
    }
}

function calculateResults() {
    // Reset scores
    const traitNames = ['doing', 'interacting', 'light', 'serious', 'depth', 'breadth'];
    traitNames.forEach(trait => scores[trait] = 0);

    answers.forEach((answer, index) => {
        const [leftTrait, rightTrait] = questions[index].dimension.split('.');

        const score = answer - 3; // Convert to range -2 to 2

        if (score < 0) {
            scores[leftTrait] += Math.abs(score);
        } else if (score > 0) {
            scores[rightTrait] += score;
        }
        // No score change if neutral
    });
}

function determinePersonalityType() {
    const ranked = Object.entries(personalityTypes).map(([typeName, typeData]) => {
        let score = 0;

        typeData.traits.forEach(trait => {
            score += scores[trait] || 0;
        });

        return { type: typeName, score };
    });

    ranked.sort((a, b) => b.score - a.score); // highest match first
    return ranked;
}

function displayPersonalityResult(typeName) {
    const type = personalityTypes[typeName];
    
    // Update result display
    document.getElementById('personality-icon').textContent = type.icon;
    document.getElementById('personality-type').textContent = typeName;
    document.getElementById('personality-tagline').textContent = type.tagline;
    document.getElementById('personality-description').textContent = type.description;
    
    // Display trait bars
    const traitBars = document.getElementById('trait-bars');
    traitBars.innerHTML = '';
    
    type.traits.forEach(trait => {
        const score = scores[trait] || 0;
        const traitBar = document.createElement('div');
        traitBar.className = 'trait-bar';
        traitBar.innerHTML = `
            <span class="trait-name">${trait}</span>
            <div class="trait-progress">
                <div class="trait-reveal-overlay" style="width: ${100 - (score * questions.length)}%;"></div>
            </div>
            <span class="trait-score">${score}</span>
        `;
        traitBars.appendChild(traitBar);
    });
    
    // Display strengths
    const strengthsList = document.getElementById('strengths-list');
    strengthsList.innerHTML = '';
    
    type.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });

    // Display trait chart
    const ctx = document.getElementById('trait-chart').getContext('2d');

    // Destroy old chart if it exists
    if (window.traitChart) window.traitChart.destroy();

    const traitLabels = Object.keys(scores);
    const traitValues = traitLabels.map(trait => scores[trait]);

    window.traitChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: traitLabels,
        datasets: [{
            label: 'Your Trait Profile',
            data: traitValues,
            fill: true,
            backgroundColor: 'rgba(26, 188, 156, 0.3)',
            borderColor: '#1abc9c',
            borderWidth: 2,
            pointBackgroundColor: '#1abc9c',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#1abc9c'
        }]
    },
    options: {
        responsive: true,
        animation: {
        duration: 800,
        easing: 'easeOutQuart'
        },
        plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#333',
            titleFont: { weight: 'bold' },
            callbacks: {
                label: ctx => `${ctx.label}: ${ctx.formattedValue}`
            }
        }
        },
        scales: {
        r: {
            beginAtZero: true,
            suggestedMax: 5, // or 10 if unnormalized
            angleLines: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.08)'
            },
            pointLabels: {
                font: { size: 14, weight: '500' },
                color: '#eee'
            },
            ticks: {
                stepSize: 1,
                backdropColor: 'transparent',
                color: '#ccc'
            }
        }
        }
    }
    });

    // Show full ranking of all personality types
    const rankedTypes = determinePersonalityType();
    const typeRanking = document.getElementById('type-ranking');
    typeRanking.innerHTML = '';

    const maxScore = Math.max(...rankedTypes.map(t => t.score)) || 1; // avoid /0
    rankedTypes.forEach(({ type, score }) => {
        const percent = Math.round((score / maxScore) * 100);
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${type}</span>
            <span>${percent}%</span>
        `;
        typeRanking.appendChild(li);
    });

}

function showResults() {
    testScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Animate trait bars
    setTimeout(() => {
        const traitFills = document.querySelectorAll('.trait-fill');
        traitFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 500);
}

function resetTest() {
    currentQuestion = 0;
    answers = [];
    Object.keys(scores).forEach(key => scores[key] = 0);
    
    resultsScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
}

function shareResults() {
    const personalityType = document.getElementById('personality-type').textContent;
    const tagline = document.getElementById('personality-tagline').textContent;
    
    const shareText = `I just discovered I'm a ${personalityType} - ${tagline}! Take the Personality Compass test to discover your type.`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Personality Compass Result',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Results copied to clipboard!');
        }).catch(() => {
            alert('Unable to share. Please copy the URL manually.');
        });
    }
}

// Add smooth transitions for slider
answerScale.addEventListener('input', function () {
    updateRevealOverlay(this.value);
});
