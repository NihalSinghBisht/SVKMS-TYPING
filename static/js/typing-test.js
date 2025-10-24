// Typing Test Logic with GSAP Animations

class TypingTest {
    constructor() {
        this.words = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isRunning = false;
        this.timeLeft = 60;
        this.startTime = null;
        this.correctChars = 0;
        this.totalChars = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.attemptNumber = 1;
        this.difficulty = 'medium';
        this.testDuration = 60;

        this.initElements();
        this.setupEventListeners();
        this.generateWords();
    }

    initElements() {
        this.typingInput = document.getElementById('typing-input');
        this.wordsDisplay = document.getElementById('words-display');
        this.wpmDisplay = document.getElementById('wpm-display');
        this.accuracyDisplay = document.getElementById('accuracy-display');
        this.timeDisplay = document.getElementById('time-display');
        this.attemptDisplay = document.getElementById('attempt-display');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.resultsModal = document.getElementById('results-modal');
        this.retryBtn = document.getElementById('retry-btn');
        this.closeResultsBtn = document.getElementById('close-results-btn');
        this.difficultySelect = document.getElementById('difficulty-select');
        this.timeSelect = document.getElementById('time-select');
        this.themeToggle = document.getElementById('theme-toggle');
        this.typingContainer = document.getElementById('typing-container');
        this.helpBtn = document.getElementById('help-btn');
        this.helpModal = document.getElementById('help-modal');
        this.closeHelpBtn = document.getElementById('close-help-btn');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.resetBtn.addEventListener('click', () => this.resetTest());
        this.retryBtn.addEventListener('click', () => this.retryTest());
        this.closeResultsBtn.addEventListener('click', () => this.closeResults());
        this.typingInput.addEventListener('input', (e) => this.handleInput(e));
        this.typingContainer.addEventListener('click', () => this.typingInput.focus());
        this.difficultySelect.addEventListener('change', (e) => this.changeDifficulty(e));
        this.timeSelect.addEventListener('change', (e) => this.changeTime(e));
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.helpBtn.addEventListener('click', () => this.showHelp());
        this.closeHelpBtn.addEventListener('click', () => this.closeHelp());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.ctrlKey) {
                e.preventDefault();
                this.startTest();
            }
            if (e.code === 'KeyR' && e.ctrlKey) {
                e.preventDefault();
                this.resetTest();
            }
        });
    }

    showHelp() {
        gsap.from(this.helpModal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'back.out'
        });
        this.helpModal.classList.remove('hidden');
    }

    closeHelp() {
        gsap.to(this.helpModal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'back.in',
            onComplete: () => {
                this.helpModal.classList.add('hidden');
            }
        });
    }

    generateWords() {
        const wordLists = {
            easy: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'dad', 'mom', 'run', 'sit', 'cat', 'dog', 'big', 'red', 'hot', 'fun'],
            medium: ['about', 'after', 'again', 'before', 'being', 'could', 'every', 'first', 'found', 'great', 'group', 'house', 'large', 'little', 'might', 'never', 'other', 'place', 'right', 'small', 'sound', 'still', 'their', 'there', 'these', 'thing', 'think', 'three', 'under', 'water', 'where', 'which', 'while', 'world', 'would', 'write', 'years', 'young', 'above', 'below', 'between'],
            hard: ['absolutely', 'achievement', 'acknowledge', 'acquaintance', 'administration', 'adolescent', 'advantageous', 'advertisement', 'affectionate', 'agriculture', 'alternative', 'ambassador', 'ambiguous', 'amendment', 'analysis', 'ancestor', 'ancient', 'anniversary', 'announcement', 'anonymous', 'anticipation', 'anxiety', 'apologize', 'apostrophe', 'apparatus', 'apparently', 'appearance', 'appreciate', 'appropriate', 'approximately', 'architecture', 'argument', 'arrangement', 'arrival', 'arrogance', 'article', 'artificial', 'assassination', 'assessment', 'assignment', 'assistance', 'association', 'assumption', 'assurance', 'astonishment']
        };

        const wordCount = {
            easy: 50,
            medium: 100,
            hard: 150
        };

        const selectedWords = wordLists[this.difficulty];
        this.words = [];
        for (let i = 0; i < wordCount[this.difficulty]; i++) {
            this.words.push(selectedWords[Math.floor(Math.random() * selectedWords.length)]);
        }

        this.displayWords();
    }

    displayWords() {
        // Show only 10 words at a time
        const visibleWords = this.words.slice(this.currentWordIndex, this.currentWordIndex + 10);
        this.wordsDisplay.innerHTML = visibleWords.map((word, idx) =>
            `<span class="word ${idx === 0 ? 'current' : 'future'}" data-index="${this.currentWordIndex + idx}">${word}</span>`
        ).join(' ');
        
        // Reset word styles
        const words = this.wordsDisplay.querySelectorAll('.word');
        words.forEach(word => {
            word.style.color = '';
        });
    }

    startTest() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startTime = Date.now();
        this.timeLeft = this.testDuration;
        this.typingInput.value = '';
        this.typingInput.focus();

        // Animate start button
        gsap.to(this.startBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Animate typing container
        gsap.to(this.typingContainer, {
            borderColor: '#3b82f6',
            duration: 0.3
        });

        this.startTimer();
        this.updateStats();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timeDisplay.textContent = this.timeLeft;

            // Animate time display when low
            if (this.timeLeft <= 10) {
                gsap.to(this.timeDisplay, {
                    scale: 1.2,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }

            if (this.timeLeft <= 0) {
                this.endTest();
            }
        }, 1000);
    }

    handleInput(e) {
        if (!this.isRunning) return;

        const input = e.target.value;
        const typedWords = input.split(' ');
        
        // Only advance to next word when the current word is completed with a space
        let completedWords = 0;
        if (input.endsWith(' ') && typedWords.length > 1) {
            // Count fully completed words (excluding the trailing empty string from split)
            completedWords = typedWords.length - 1;
        } else {
            // Count words that are fully typed but not yet confirmed with space
            completedWords = Math.max(0, typedWords.length - 1);
        }

        // Scroll display when we complete a word
        if (completedWords > this.currentWordIndex) {
            this.currentWordIndex = Math.min(completedWords, this.words.length - 10);
            this.displayWords();
        }

        const words = this.wordsDisplay.querySelectorAll('.word');
        let correctCount = 0;

        // Update word highlighting
        words.forEach((word, idx) => {
            word.classList.remove('current', 'correct', 'incorrect');
            const actualIndex = this.currentWordIndex + idx;

            if (idx < completedWords) {
                // Completed words
                const typedWord = typedWords[idx];
                if (typedWord === this.words[actualIndex]) {
                    word.classList.add('correct');
                    correctCount++;
                } else {
                    word.classList.add('incorrect');
                }
            } else if (idx === completedWords && !input.endsWith(' ')) {
                // Current word being typed (only if not ending with space)
                word.classList.add('current');
                
                // Check partial match for current word
                if (typedWords.length > 0 && completedWords < typedWords.length) {
                    const currentTyped = typedWords[completedWords] || '';
                    const currentWord = this.words[actualIndex];
                    if (currentTyped !== '' && currentWord.startsWith(currentTyped)) {
                        word.style.color = '#93c5fd'; // Light blue for partial match
                    } else if (currentTyped !== '') {
                        word.style.color = '#fca5a5'; // Light red for incorrect
                    }
                }
            } else {
                // Future words
                word.classList.add('future');
            }
        });

        this.correctChars = correctCount * 5; // Approximate: 5 chars per word
        this.totalChars = completedWords * 5;
        this.updateStats();
    }

    updateStats() {
        if (!this.isRunning) return;

        const elapsedSeconds = (Date.now() - this.startTime) / 1000;
        const elapsedMinutes = elapsedSeconds / 60;

        // Calculate WPM (words per 5 characters)
        this.wpm = Math.round((this.correctChars / 5) / elapsedMinutes) || 0;

        // Calculate accuracy
        this.accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;

        // Update displays with animation
        gsap.to(this.wpmDisplay, {
            textContent: this.wpm,
            duration: 0.3,
            snap: { textContent: 1 }
        });

        gsap.to(this.accuracyDisplay, {
            textContent: this.accuracy + '%',
            duration: 0.3
        });
    }

    endTest() {
        this.isRunning = false;
        clearInterval(this.timerInterval);

        // Animate end
        gsap.to(this.typingContainer, {
            borderColor: '#10b981',
            duration: 0.3
        });

        this.showResults();
        this.submitResults();
    }

    showResults() {
        document.getElementById('result-wpm').textContent = this.wpm;
        document.getElementById('result-accuracy').textContent = this.accuracy + '%';
        document.getElementById('result-chars').textContent = this.correctChars;

        // Animate results modal
        gsap.from(this.resultsModal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: 'back.out'
        });

        this.resultsModal.classList.remove('hidden');
    }

    closeResults() {
        gsap.to(this.resultsModal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'back.in',
            onComplete: () => {
                this.resultsModal.classList.add('hidden');
            }
        });
    }

    resetTest() {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.timeLeft = this.testDuration;
        this.correctChars = 0;
        this.totalChars = 0;
        this.wpm = 0;
        this.accuracy = 100;

        this.typingInput.value = '';
        this.wpmDisplay.textContent = '0';
        this.accuracyDisplay.textContent = '100%';
        this.timeDisplay.textContent = this.testDuration;
        this.generateWords();
        this.displayWords();

        gsap.to(this.typingContainer, {
            borderColor: '#475569',
            duration: 0.3
        });
    }

    retryTest() {
        this.closeResults();
        this.resetTest();
        this.attemptNumber++;
        this.attemptDisplay.textContent = `${this.attemptNumber}/3`;
    }

    changeDifficulty(e) {
        this.difficulty = e.target.value;
        this.resetTest();
    }

    changeTime(e) {
        this.testDuration = parseInt(e.target.value);
        this.timeLeft = this.testDuration;
        this.timeDisplay.textContent = this.testDuration;
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        this.themeToggle.textContent = document.body.classList.contains('light-theme') ? '☀️ Light Theme' : '🌙 Dark Theme';
    }

    playSound(type) {
        // Create sound effects using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        if (type === 'correct') {
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (type === 'error') {
            oscillator.frequency.value = 300;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } else if (type === 'complete') {
            // Success sound - ascending notes
            const notes = [523.25, 659.25, 783.99];
            notes.forEach((freq, idx) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.1, audioContext.currentTime + idx * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + idx * 0.1 + 0.1);
                osc.start(audioContext.currentTime + idx * 0.1);
                osc.stop(audioContext.currentTime + idx * 0.1 + 0.1);
            });
        }
    }

    submitResults() {
        fetch('/submit_test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wpm: this.wpm,
                accuracy: this.accuracy
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.playSound('complete');
                showNotification('Test result saved!', 'success');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error saving result', 'error');
        });
    }
}

// Initialize typing test when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const typingTest = new TypingTest();
});

