// Personality Test Data
const questions = [
    {
        text: "When facing a challenging problem, how do you prefer to approach it?",
        leftLabel: "Dive in immediately and figure it out as I go",
        rightLabel: "Plan thoroughly before taking action",
        dimension: "spontaneous"
    },
    {
        text: "In social situations, you tend to:",
        leftLabel: "Seek out new people and conversations",
        rightLabel: "Stick with familiar faces and deeper talks",
        dimension: "social"
    },
    {
        text: "When making decisions, you rely more on:",
        leftLabel: "Logic and objective analysis",
        rightLabel: "Intuition and personal values",
        dimension: "thinking"
    },
    {
        text: "Your ideal weekend would involve:",
        leftLabel: "Exciting adventures and new experiences",
        rightLabel: "Peaceful relaxation and familiar comforts",
        dimension: "adventure"
    },
    {
        text: "In group projects, you naturally:",
        leftLabel: "Take charge and organize the team",
        rightLabel: "Support others and contribute behind the scenes",
        dimension: "leadership"
    },
    {
        text: "When learning something new, you prefer to:",
        leftLabel: "Focus on practical applications",
        rightLabel: "Understand the underlying theory first",
        dimension: "learning"
    },
    {
        text: "Your communication style is typically:",
        leftLabel: "Direct and to the point",
        rightLabel: "Diplomatic and considerate",
        dimension: "communication"
    },
    {
        text: "When stressed, you tend to:",
        leftLabel: "Talk it out with others",
        rightLabel: "Process internally and reflect alone",
        dimension: "stress"
    },
    {
        text: "You're more motivated by:",
        leftLabel: "Competition and achievement",
        rightLabel: "Collaboration and harmony",
        dimension: "motivation"
    },
    {
        text: "Your workspace is usually:",
        leftLabel: "Organized and systematic",
        rightLabel: "Creative and flexible",
        dimension: "organization"
    },
    {
        text: "When giving feedback, you:",
        leftLabel: "Focus on what needs improvement",
        rightLabel: "Emphasize strengths and positive aspects",
        dimension: "feedback"
    },
    {
        text: "You prefer to work:",
        leftLabel: "In fast-paced, dynamic environments",
        rightLabel: "In stable, predictable settings",
        dimension: "pace"
    },
    {
        text: "When facing conflict, you typically:",
        leftLabel: "Address it head-on immediately",
        rightLabel: "Take time to consider all perspectives",
        dimension: "conflict"
    },
    {
        text: "Your decision-making process is:",
        leftLabel: "Quick and decisive",
        rightLabel: "Careful and deliberate",
        dimension: "decisions"
    },
    {
        text: "You find energy from:",
        leftLabel: "Being around people and activity",
        rightLabel: "Quiet time and solitude",
        dimension: "energy"
    },
    {
        text: "When explaining ideas, you prefer to:",
        leftLabel: "Use concrete examples and facts",
        rightLabel: "Paint the big picture and vision",
        dimension: "explanation"
    },
    {
        text: "Your approach to rules is:",
        leftLabel: "Follow them as helpful guidelines",
        rightLabel: "View them as important structure",
        dimension: "rules"
    },
    {
        text: "In conversations, you tend to:",
        leftLabel: "Share thoughts as they come to mind",
        rightLabel: "Think carefully before speaking",
        dimension: "conversation"
    },
    {
        text: "You're most comfortable when:",
        leftLabel: "Exploring new possibilities",
        rightLabel: "Working with proven methods",
        dimension: "comfort"
    },
    {
        text: "Your ideal team role would be:",
        leftLabel: "The innovator bringing fresh ideas",
        rightLabel: "The stabilizer ensuring quality execution",
        dimension: "role"
    }
];

// Custom Personality Types
const personalityTypes = {
    "Dynamic Pioneer": {
        icon: "🚀",
        tagline: "The Bold Innovator",
        description: "You're a natural trailblazer who thrives on change and innovation. You approach life with enthusiasm and aren't afraid to take risks to achieve your goals. Your spontaneous nature and leadership qualities make you excellent at inspiring others and driving progress.",
        strengths: [
            "Natural leadership and vision",
            "Adaptable and resilient",
            "Excellent at motivating others",
            "Quick decision-making abilities",
            "Innovative problem-solving"
        ],
        traits: {
            "Spontaneity": 85,
            "Social Energy": 80,
            "Leadership": 90,
            "Adventure": 85,
            "Innovation": 88
        }
    },
    "Thoughtful Strategist": {
        icon: "🧠",
        tagline: "The Wise Planner",
        description: "You excel at seeing the big picture and creating comprehensive plans. Your analytical mind and careful consideration of all angles make you invaluable in complex situations. You prefer depth over breadth and quality over quantity in all aspects of life.",
        strengths: [
            "Strategic thinking and planning",
            "Deep analytical abilities",
            "Excellent attention to detail",
            "Strong problem-solving skills",
            "Reliable and consistent execution"
        ],
        traits: {
            "Planning": 90,
            "Analysis": 85,
            "Depth": 88,
            "Stability": 82,
            "Precision": 87
        }
    },
    "Empathetic Connector": {
        icon: "🤝",
        tagline: "The Heart-Centered Leader",
        description: "You have a natural gift for understanding and connecting with others. Your empathetic nature and strong communication skills make you excellent at building relationships and creating harmony. You lead through inspiration and genuine care for others.",
        strengths: [
            "Exceptional emotional intelligence",
            "Strong relationship-building skills",
            "Natural conflict resolution abilities",
            "Inspiring and motivating presence",
            "Deep understanding of human nature"
        ],
        traits: {
            "Empathy": 92,
            "Communication": 88,
            "Harmony": 85,
            "Intuition": 83,
            "Collaboration": 90
        }
    },
    "Balanced Harmonizer": {
        icon: "⚖️",
        tagline: "The Steady Diplomat",
        description: "You bring stability and balance to every situation. Your ability to see multiple perspectives and find middle ground makes you an excellent mediator and team player. You value both innovation and tradition, creating sustainable solutions.",
        strengths: [
            "Excellent mediation and diplomacy",
            "Balanced perspective on issues",
            "Strong collaborative abilities",
            "Adaptable to different situations",
            "Creates inclusive environments"
        ],
        traits: {
            "Balance": 20,
            "Diplomacy": 85,
            "Adaptability": 82,
            "Stability": 80,
            "Inclusivity": 88
        }
    },
    "Creative Visionary": {
        icon: "🎨",
        tagline: "The Imaginative Innovator",
        description: "You see possibilities where others see obstacles. Your creative mind and intuitive approach to problem-solving make you excellent at generating innovative solutions. You thrive in environments that allow for creative expression and exploration.",
        strengths: [
            "Exceptional creativity and imagination",
            "Innovative problem-solving approach",
            "Strong intuitive abilities",
            "Excellent at seeing patterns and connections",
            "Natural artistic and aesthetic sense"
        ],
        traits: {
            "Creativity": 95,
            "Innovation": 90,
            "Intuition": 88,
            "Flexibility": 85,
            "Vision": 92
        }
    },
    "Analytical Optimizer": {
        icon: "📊",
        tagline: "The Systematic Perfectionist",
        description: "You excel at breaking down complex problems and finding efficient solutions. Your logical approach and attention to detail ensure high-quality outcomes. You thrive on continuous improvement and optimization in all areas of life.",
        strengths: [
            "Superior analytical and logical thinking",
            "Excellent attention to detail",
            "Strong systematic approach",
            "Continuous improvement mindset",
            "High standards and quality focus"
        ],
        traits: {
            "Logic": 92,
            "Precision": 90,
            "Efficiency": 88,
            "Quality": 85,
            "Optimization": 93
        }
    }
};

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
