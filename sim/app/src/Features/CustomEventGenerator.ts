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
}


