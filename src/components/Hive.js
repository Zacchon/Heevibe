import { Vector2 } from './Vector2.js';

export class Hive {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.size = 40;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Hive body
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Entrance
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.arc(0, this.size * 0.5, 8, 0, Math.PI * 2);
        ctx.fill();

        // Texture lines
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        for (let i = -2; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.size * 0.8, i * 8);
            ctx.lineTo(this.size * 0.8, i * 8);
            ctx.stroke();
        }

        ctx.restore();
    }
} 