// Test State
let currentQuestion = 0;
let answers = [];
let scores = {
    spontaneous: 0,
    social: 0,
    thinking: 0,
    adventure: 0,
    leadership: 0,
    learning: 0,
    communication: 0,
    stress: 0,
    motivation: 0,
    organization: 0,
    feedback: 0,
    pace: 0,
    conflict: 0,
    decisions: 0,
    energy: 0,
    explanation: 0,
    rules: 0,
    conversation: 0,
    comfort: 0,
    role: 0
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
  const percent = ((7 - value) / 6) * 100;
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
        answerScale.value = 4; // Default to neutral
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
        showResults();
    }
}

function calculateResults() {
    // Reset scores
    Object.keys(scores).forEach(key => scores[key] = 0);
    
    // Calculate scores based on answers
    answers.forEach((answer, index) => {
        const question = questions[index];
        const dimension = question.dimension;
        
        // Convert 1-7 scale to -3 to +3 scale
        const score = answer - 4;
        scores[dimension] += score;
    });
    
    // Determine personality type based on scores
    const personalityType = determinePersonalityType();
    displayPersonalityResult(personalityType);
}

function determinePersonalityType() {
    // Calculate aggregate scores for major dimensions
    const spontaneityScore = (scores.spontaneous + scores.adventure + scores.pace + scores.comfort) / 4;
    const socialScore = (scores.social + scores.energy + scores.conversation + scores.communication) / 4;
    const thinkingScore = (scores.thinking + scores.learning + scores.explanation + scores.organization) / 4;
    const leadershipScore = (scores.leadership + scores.motivation + scores.conflict + scores.role) / 4;
    const creativityScore = (scores.feedback + scores.decisions + scores.rules + scores.stress) / 4;
    
    // Determine personality type based on dominant traits
    if (spontaneityScore > 1 && leadershipScore > 1) {
        return "Dynamic Pioneer";
    } else if (thinkingScore > 1 && socialScore < 0) {
        return "Analytical Optimizer";
    } else if (socialScore > 1 && creativityScore > 0) {
        return "Empathetic Connector";
    } else if (creativityScore > 1 && spontaneityScore > 0) {
        return "Creative Visionary";
    } else if (thinkingScore > 0 && spontaneityScore < 0) {
        return "Thoughtful Strategist";
    } else {
        return "Balanced Harmonizer";
    }
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
    
    Object.entries(type.traits).forEach(([trait, score]) => {
        const traitBar = document.createElement('div');
        traitBar.className = 'trait-bar';
        traitBar.innerHTML = `
            <span class="trait-name">${trait}</span>
            <div class="trait-progress">
                <div class="trait-reveal-overlay" style="width: ${100 - score}%;"></div>
            </div>
            <span class="trait-score">${score}%</span>
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
