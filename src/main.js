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
    const toggleAdvancedBtn = document.getElementById('toggleAdvanced');
    const advancedPanel = document.getElementById('advancedPanel');

    // Advanced controls
    const nectarRegenSlider = document.getElementById('nectarRegenSlider');
    const nectarRegenValue = document.getElementById('nectarRegenValue');
    const beeSpeedSlider = document.getElementById('beeSpeedSlider');
    const beeSpeedValue = document.getElementById('beeSpeedValue');
    const maxNectarSlider = document.getElementById('maxNectarSlider');
    const maxNectarValue = document.getElementById('maxNectarValue');
    const danceDurationSlider = document.getElementById('danceDurationSlider');
    const danceDurationValue = document.getElementById('danceDurationValue');
    const detectionRangeSlider = document.getElementById('detectionRangeSlider');
    const detectionRangeValue = document.getElementById('detectionRangeValue');
    const energyDecaySlider = document.getElementById('energyDecaySlider');
    const energyDecayValue = document.getElementById('energyDecayValue');

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

    // Toggle advanced panel
    toggleAdvancedBtn.addEventListener('click', () => {
        const isHidden = advancedPanel.style.display === 'none';
        advancedPanel.style.display = isHidden ? 'block' : 'none';
        toggleAdvancedBtn.textContent = isHidden ? '⚙️ Hide Advanced' : '⚙️ Advanced';
    });

    // Advanced controls event listeners
    nectarRegenSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        nectarRegenValue.textContent = value.toFixed(2);
        simulator.setNectarRegenRate(value);
    });

    beeSpeedSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        beeSpeedValue.textContent = value.toFixed(2);
        simulator.setBeeSpeedMultiplier(value);
    });

    maxNectarSlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        maxNectarValue.textContent = value.toFixed(1);
        simulator.setMaxNectarPerFlower(value);
    });

    danceDurationSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        danceDurationValue.textContent = value;
        simulator.setDanceDuration(value);
    });

    detectionRangeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        detectionRangeValue.textContent = value;
        simulator.setDetectionRange(value);
    });

    energyDecaySlider.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        energyDecayValue.textContent = value.toFixed(2);
        simulator.setEnergyDecayRate(value);
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