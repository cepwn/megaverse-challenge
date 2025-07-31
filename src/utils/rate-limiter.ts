export class RateLimiter {
    private lastCallTime: number = 0;
    private minDelay: number;

    constructor(minDelay: number) {
        this.minDelay = minDelay;
    }

    async throttle(): Promise<void> {
        const now = Date.now();
        const timeSinceLastCall = now - this.lastCallTime;

        if (timeSinceLastCall < this.minDelay) {
            await new Promise(resolve => setTimeout(resolve, this.minDelay - timeSinceLastCall));
        }

        this.lastCallTime = Date.now();
    }
}