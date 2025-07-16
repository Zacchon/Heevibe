import { Bee } from './Bee.js';
import { Flower } from './Flower.js';
import { Hive } from './Hive.js';

export class BeeSimulator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.bees = [];
        this.flowers = [];
        this.hive = new Hive(150, 300);
        this.isRunning = true;
        this.speed = 1;
        this.nectarCollected = 0;
        this.lastTime = 0;
        this.statsCallback = null;
        this.initializeSimulation();
    }

    initializeSimulation() {
        // Create initial bees
        for (let i = 0; i < 15; i++) {
            this.addBee();
        }
        // Create initial flowers
        for (let i = 0; i < 10; i++) {
            this.addFlower();
        }
    }

    addBee() {
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const x = this.hive.position.x + Math.cos(angle) * distance;
        const y = this.hive.position.y + Math.sin(angle) * distance;
        this.bees.push(new Bee(x, y, this.hive));
    }

    addFlower(x = null, y = null) {
        if (x === null || y === null) {
            x = 100 + Math.random() * (this.canvas.width - 200);
            y = 100 + Math.random() * (this.canvas.height - 200);
        }
        this.flowers.push(new Flower(x, y));
    }

    setStatsCallback(cb) {
        this.statsCallback = cb;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setRunning(isRunning) {
        this.isRunning = isRunning;
    }

    reset() {
        this.bees = [];
        this.flowers = [];
        this.nectarCollected = 0;
        this.initializeSimulation();
    }

    update(deltaTime) {
        if (!this.isRunning) return;
        const adjustedDeltaTime = deltaTime * this.speed;
        this.bees.forEach(bee => {
            bee.update(adjustedDeltaTime, this.flowers, this, this.canvas);
        });
        this.flowers.forEach(flower => {
            flower.update(adjustedDeltaTime);
        });
        if (this.statsCallback) this.statsCallback(this.getStats());
    }

    getStats() {
        return {
            beeCount: this.bees.length,
            flowerCount: this.flowers.length,
            nectarCount: Math.floor(this.nectarCollected),
            foragerCount: this.bees.filter(bee => bee.state === 'foraging' || bee.state === 'returning').length
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEnvironment();
        this.hive.draw(this.ctx);
        this.flowers.forEach(flower => flower.draw(this.ctx));
        this.bees.forEach(bee => bee.draw(this.ctx));
        this.drawDanceIndicators();
    }

    drawEnvironment() {
        this.ctx.fillStyle = '#90EE90';
        this.ctx.fillRect(0, this.canvas.height - 50, this.canvas.width, 50);
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height - 50);
    }

    drawDanceIndicators() {
        const dancingBees = this.bees.filter(bee => bee.state === 'dancing');
        dancingBees.forEach(bee => {
            if (bee.flowerMemory) {
                this.ctx.strokeStyle = 'rgba(255, 20, 147, 0.5)';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 5]);
                this.ctx.beginPath();
                this.ctx.moveTo(bee.position.x, bee.position.y);
                this.ctx.lineTo(bee.flowerMemory.position.x, bee.flowerMemory.position.y);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }
            this.ctx.strokeStyle = 'rgba(255, 20, 147, 0.8)';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(bee.position.x, bee.position.y, 25, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }

    animate(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.update(deltaTime);
        this.draw();
        requestAnimationFrame((time) => this.animate(time));
    }
} 