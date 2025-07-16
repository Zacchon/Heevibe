import { Vector2 } from './Vector2.js';

export class Bee {
    constructor(x, y, hive) {
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
        this.hive = hive;
        this.state = 'exploring'; // 'exploring', 'foraging', 'returning', 'dancing'
        this.target = null;
        this.nectar = 0;
        this.maxNectar = 3;
        this.speed = 1 + Math.random() * 0.5;
        this.energy = 100;
        this.danceTimer = 0;
        this.flowerMemory = null;
        this.id = Math.random().toString(36).substr(2, 9);
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.stateTimer = 0;
        this.color = this.getColorForState();
    }

    getColorForState() {
        switch (this.state) {
            case 'exploring': return '#FFD700';
            case 'foraging': return '#FFA500';
            case 'returning': return '#FF6B35';
            case 'dancing': return '#FF1493';
            default: return '#FFD700';
        }
    }

    update(deltaTime, flowers, simulator, canvas) {
        this.stateTimer += deltaTime;
        this.color = this.getColorForState();

        switch (this.state) {
            case 'exploring':
                this.explore(flowers, canvas);
                break;
            case 'foraging':
                this.forage(flowers, simulator);
                break;
            case 'returning':
                this.returnToHive(canvas);
                break;
            case 'dancing':
                this.dance();
                break;
        }

        this.move(deltaTime, canvas);
        this.energy = Math.max(0, this.energy - deltaTime * 0.1);
    }

    explore(flowers, canvas) {
        // Look for flowers
        const nearbyFlowers = flowers.filter(f =>
            f.nectar > 0 && this.position.distance(f.position) < 100
        );

        if (nearbyFlowers.length > 0) {
            this.target = nearbyFlowers[0];
            this.state = 'foraging';
            return;
        }

        // Wander behavior
        this.wanderAngle += (Math.random() - 0.5) * 0.3;
        const wanderDirection = new Vector2(
            Math.cos(this.wanderAngle),
            Math.sin(this.wanderAngle)
        );

        this.velocity = wanderDirection.multiply(this.speed);

        // Avoid edges
        const margin = 50;
        if (this.position.x < margin) this.velocity.x = Math.abs(this.velocity.x);
        if (this.position.x > canvas.width - margin) this.velocity.x = -Math.abs(this.velocity.x);
        if (this.position.y < margin) this.velocity.y = Math.abs(this.velocity.y);
        if (this.position.y > canvas.height - margin) this.velocity.y = -Math.abs(this.velocity.y);
    }

    forage(flowers, simulator) {
        if (!this.target || this.target.nectar <= 0) {
            this.state = 'exploring';
            this.target = null;
            return;
        }

        const distance = this.position.distance(this.target.position);

        if (distance < 15) {
            // Collect nectar
            const collected = Math.min(this.target.nectar, this.maxNectar - this.nectar);
            this.nectar += collected;
            this.target.nectar -= collected;
            this.flowerMemory = {
                position: this.target.position,
                quality: this.target.nectar
            };

            if (this.nectar >= this.maxNectar) {
                this.state = 'returning';
                this.target = null;
                simulator.nectarCollected += this.nectar;
            }
        } else {
            // Move toward flower
            const direction = this.target.position.subtract(this.position).normalize();
            this.velocity = direction.multiply(this.speed);
        }
    }

    returnToHive(canvas) {
        const distance = this.position.distance(this.hive.position);

        if (distance < 30) {
            this.nectar = 0;
            if (this.flowerMemory && this.flowerMemory.quality > 2) {
                this.state = 'dancing';
                this.danceTimer = 2000; // Dance for 2 seconds
            } else {
                this.state = 'exploring';
            }
        } else {
            const direction = this.hive.position.subtract(this.position).normalize();
            this.velocity = direction.multiply(this.speed * 1.2);
        }
    }

    dance() {
        this.danceTimer -= 16; // Assuming ~60fps

        if (this.danceTimer <= 0) {
            this.state = 'exploring';
            this.flowerMemory = null;
        } else {
            // Dance movement (figure-8 pattern)
            const dancePhase = (2000 - this.danceTimer) / 200;
            this.position.x = this.hive.position.x + Math.sin(dancePhase) * 20;
            this.position.y = this.hive.position.y + Math.cos(dancePhase * 2) * 10;
        }
    }

    move(deltaTime, canvas) {
        this.position = this.position.add(this.velocity.multiply(deltaTime));

        // Keep within bounds
        this.position.x = Math.max(10, Math.min(canvas.width - 10, this.position.x));
        this.position.y = Math.max(10, Math.min(canvas.height - 10, this.position.y));
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // Bee body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Stripes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        for (let i = -3; i <= 3; i += 2) {
            ctx.beginPath();
            ctx.moveTo(i, -3);
            ctx.lineTo(i, 3);
            ctx.stroke();
        }

        // Wings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(-2, -2, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-2, 2, 4, 2, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Nectar indicator
        if (this.nectar > 0) {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 0, 2 + this.nectar, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
} 