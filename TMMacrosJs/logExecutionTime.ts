import {Log} from "./TMLogger";

export function logExecutionTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const startTime = process.hrtime();

        const result = originalMethod.apply(this, args);

        const endTime = process.hrtime(startTime);
        const executionTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2);
        Log.d(`${propertyKey} executionTime:${executionTime}ms`);

        return result;
    };

    return descriptor;
}