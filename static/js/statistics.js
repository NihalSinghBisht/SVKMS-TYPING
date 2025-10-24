// Statistics Tracking Module

class StatisticsTracker {
    constructor() {
        this.stats = this.loadStats();
    }

    loadStats() {
        const saved = localStorage.getItem('typingStats');
        return saved ? JSON.parse(saved) : {
            totalTests: 0,
            totalTime: 0,
            bestWPM: 0,
            averageWPM: 0,
            bestAccuracy: 0,
            averageAccuracy: 0,
            tests: []
        };
    }

    saveStats() {
        localStorage.setItem('typingStats', JSON.stringify(this.stats));
    }

    addTest(wpm, accuracy, duration) {
        const test = {
            wpm,
            accuracy,
            duration,
            timestamp: new Date().toISOString()
        };

        this.stats.tests.push(test);
        this.stats.totalTests++;
        this.stats.totalTime += duration;

        // Update best WPM
        if (wpm > this.stats.bestWPM) {
            this.stats.bestWPM = wpm;
        }

        // Update best accuracy
        if (accuracy > this.stats.bestAccuracy) {
            this.stats.bestAccuracy = accuracy;
        }

        // Calculate averages
        this.stats.averageWPM = Math.round(
            this.stats.tests.reduce((sum, t) => sum + t.wpm, 0) / this.stats.tests.length
        );

        this.stats.averageAccuracy = Math.round(
            this.stats.tests.reduce((sum, t) => sum + t.accuracy, 0) / this.stats.tests.length
        );

        this.saveStats();
        return test;
    }

    getStats() {
        return this.stats;
    }

    getRecentTests(count = 10) {
        return this.stats.tests.slice(-count).reverse();
    }

    getProgressTrend(days = 7) {
        const now = new Date();
        const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

        return this.stats.tests.filter(test => {
            const testDate = new Date(test.timestamp);
            return testDate >= pastDate;
        });
    }

    clearStats() {
        this.stats = {
            totalTests: 0,
            totalTime: 0,
            bestWPM: 0,
            averageWPM: 0,
            bestAccuracy: 0,
            averageAccuracy: 0,
            tests: []
        };
        this.saveStats();
    }

    getAchievements() {
        const achievements = [];

        if (this.stats.bestWPM >= 50) achievements.push({ name: 'Speed Demon', icon: '⚡', description: 'Reached 50 WPM' });
        if (this.stats.bestWPM >= 100) achievements.push({ name: 'Lightning Fast', icon: '🔥', description: 'Reached 100 WPM' });
        if (this.stats.bestAccuracy === 100) achievements.push({ name: 'Perfect', icon: '✨', description: 'Achieved 100% accuracy' });
        if (this.stats.totalTests >= 10) achievements.push({ name: 'Dedicated', icon: '💪', description: 'Completed 10 tests' });
        if (this.stats.totalTests >= 50) achievements.push({ name: 'Master Typist', icon: '👑', description: 'Completed 50 tests' });
        if (this.stats.averageWPM >= 75) achievements.push({ name: 'Consistent', icon: '🎯', description: 'Average WPM above 75' });

        return achievements;
    }

    exportStats() {
        return JSON.stringify(this.stats, null, 2);
    }

    importStats(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            this.stats = imported;
            this.saveStats();
            return true;
        } catch (e) {
            console.error('Failed to import stats:', e);
            return false;
        }
    }
}

// Create global instance
const statisticsTracker = new StatisticsTracker();

// Export for use in other modules
window.statisticsTracker = statisticsTracker;

