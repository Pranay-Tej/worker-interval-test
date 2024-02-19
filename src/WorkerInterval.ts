export class WorkerInterval {
  private worker: Worker | null = null;
  private blobUrl: string | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(callback: any, interval: number) {
    const blob = new Blob([`setInterval(() => postMessage(0), ${interval});`]);
    const workerScriptUrl = URL.createObjectURL(blob);
    this.worker = new Worker(workerScriptUrl);
    this.worker.onmessage = callback;
    this.blobUrl = workerScriptUrl;
  }

  clearInterval(): void {
    this.worker?.terminate();
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
      this.worker = null;
    }
  }
}
