declare global {
    interface Object {
        also<T, R>(this: T, block: (value: T) => void): T;
    }
}

Object.prototype.also = function <T, R>(this: T, block: (value: T) => void): T {
    block(this)
    return this;
};

export {}; // Ensure an empty export to make it a module file
