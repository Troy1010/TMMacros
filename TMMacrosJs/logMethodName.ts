import {Log} from "./TMLogger";

export function logMethodName(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        Log.d(`${propertyKey}`);

        return originalMethod.apply(this, args);
    };

    return descriptor;
}