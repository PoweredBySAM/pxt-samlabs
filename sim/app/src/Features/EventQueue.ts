import SamSimState from './SamSimState';
class StorageQueue {
    private static instance: StorageQueue;
    private queue: Array<string>;
    private queueKey: string;
    samDevicesState: SamSimState;

    private constructor(queueKey: string, public SamDevicesState: typeof SamSimState ) {
        this.queueKey = queueKey; 
        this.queue = this.loadQueue() || []; 
        this.samDevicesState = new SamDevicesState();
    }

    public static getInstance(queueKey: string): StorageQueue {
        if (!StorageQueue.instance) {
            StorageQueue.instance = new StorageQueue(queueKey, SamSimState);
        }
        return StorageQueue.instance;
    }

    private loadQueue(): Array<string> | null {
        const queueString = localStorage.getItem(this.queueKey);
        if (!queueString) {
            localStorage.setItem(this.queueKey, JSON.stringify([]));
            return [];
        }
        return JSON.parse(queueString);
    }

    private saveQueue(): void {
        const queueString = JSON.stringify(this.queue);
        localStorage.setItem(this.queueKey,JSON.stringify( queueString));
    }

    public addToQueue(item: string): void {
        this.queue.push(item);
        this.saveQueue();
    }

    public removeFromQueue(item: string): void {
        const index = this.queue.indexOf(item);
        if (index !== -1) {
            this.queue.splice(index, 1);
            this.saveQueue();
        }
    }

    public isInQueue(findKey:{[key:string]:any}): boolean {
        const {key, value} = findKey || {};
        return !!this.queue.find((item)=>item[key] === value)
    }

    public  processQueue() {
        while(this.queue.length > 0) {
            const item = this.queue.shift();
            this.samDevicesState.processEventQueue(item)
            this.saveQueue();
        }
    }

}

const queue = StorageQueue.getInstance('SamSimulatorQueue');
export default queue;


