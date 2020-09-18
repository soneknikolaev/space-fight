const fps = 33;

export class Timer {
  running = false;

  subscribers: Array<() => void> = [];

  lastTick: number;

  loopId: null | number = null;

  constructor() {
    this.lastTick = performance.now();

    this.loop = this.loop.bind(this);
  }

  loop() {
    const nowTime = performance.now();

    if (!this.running) return;

    if (this.loopId && nowTime - this.lastTick >= fps) {
      this.lastTick = performance.now();
      this.subscribers.forEach((cb) => cb());
    }

    this.loopId = requestAnimationFrame(this.loop);
  }

  start() {
    if (!this.loopId) {
      this.running = true;
      this.loop();
    }
  }

  stop() {
    if (this.loopId) {
      this.running = false;
      cancelAnimationFrame(this.loopId);
      this.loopId = null;
    }
  }

  subscribe(callback: () => void) {
    if (this.subscribers.indexOf(callback) === -1) this.subscribers.push(callback);
  }

  unsubscribe(callback: () => void) {
    this.subscribers = this.subscribers.filter((s) => s !== callback);
  }
}
