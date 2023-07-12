export class NotImplementedError extends Error {
    constructor(message?: string) {
        super(message || 'Not implemented');
        this.name = 'NotImplementedError';
    }
}

export function TODO(msg: any | null = null): never {
    throw new NotImplementedError(msg?.toString())
}


