import { BeeSimulator } from './components/BeeSimulator.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const simulator = new BeeSimulator(canvas);

    // Controls
    const playPauseBtn = document.getElementById('playPause');
    const addFlowersBtn = document.getElementById('addFlowers');
    const addBeesBtn = document.getElementById('addBees');
    const resetBtn = document.getElementById('reset');
    const speedSlider = document.getElementById('speedSlider');

    playPauseBtn.addEventListener('click', () => {
        simulator.setRunning(!simulator.isRunning);
        playPauseBtn.textContent = simulator.isRunning ? '⏸️ Pause' : '▶️ Play';
    });

    addFlowersBtn.addEventListener('click', () => {
        for (let i = 0; i < 3; i++) simulator.addFlower();
    });

    addBeesBtn.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) simulator.addBee();
    });

    resetBtn.addEventListener('click', () => {
        simulator.reset();
    });

    speedSlider.addEventListener('input', (e) => {
        simulator.setSpeed(parseFloat(e.target.value));
    });

    // Click to add flowers
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        simulator.addFlower(x, y);
    });

    // Stats update
    const beeCount = document.getElementById('beeCount');
    const flowerCount = document.getElementById('flowerCount');
    const nectarCount = document.getElementById('nectarCount');
    const foragerCount = document.getElementById('foragerCount');
    simulator.setStatsCallback(stats => {
        beeCount.textContent = stats.beeCount;
        flowerCount.textContent = stats.flowerCount;
        nectarCount.textContent = stats.nectarCount;
        foragerCount.textContent = stats.foragerCount;
    });

    // Start animation
    simulator.animate();
}); 