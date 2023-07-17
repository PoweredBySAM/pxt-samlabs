export class CustomEventGenerator {
    private static instance: CustomEventGenerator;


    private constructor() {}

    static getInstance(): CustomEventGenerator {
        if (!CustomEventGenerator.instance) {
            CustomEventGenerator.instance = new CustomEventGenerator();
        }
        return CustomEventGenerator.instance;
    }

    dispatchEvent(eventName: string, detail: any): void {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    receiveEvent(eventName: any, callback: (detail: any) => void) {
        window.addEventListener(eventName, (event: CustomEvent) => {
            callback(event);
        });
    }

    unregisterEvent(eventName: any,callback: (detail: any) => void) {
            window.removeEventListener(eventName, callback);   
    }

}


