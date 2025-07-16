import { Vector2 } from './Vector2.js';

export class Flower {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.nectar = 5 + Math.random() * 10;
        this.maxNectar = this.nectar;
        this.regenRate = 0.1;
        this.color = this.getColorForNectar();
        this.size = 8 + Math.random() * 4;
        this.petalCount = 5 + Math.floor(Math.random() * 3);
    }

    getColorForNectar() {
        const intensity = this.nectar / this.maxNectar;
        const r = Math.floor(255 * intensity);
        const g = Math.floor(100 + 155 * intensity);
        const b = Math.floor(150 + 105 * intensity);
        return `rgb(${r}, ${g}, ${b})`;
    }

    update(deltaTime) {
        if (this.nectar < this.maxNectar) {
            this.nectar = Math.min(this.maxNectar, this.nectar + this.regenRate * deltaTime);
        }
        this.color = this.getColorForNectar();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Stem
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, this.size);
        ctx.lineTo(0, this.size + 20);
        ctx.stroke();

        // Petals
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.petalCount; i++) {
            const angle = (i / this.petalCount) * Math.PI * 2;
            const petalX = Math.cos(angle) * this.size;
            const petalY = Math.sin(angle) * this.size;

            ctx.beginPath();
            ctx.ellipse(petalX, petalY, this.size * 0.6, this.size * 0.3, angle, 0, Math.PI * 2);
            ctx.fill();
        }

        // Center
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
} 