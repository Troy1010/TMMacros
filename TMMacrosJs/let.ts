declare global {
    interface Object {
        letZ<T, R>(this: T, block: (value: T) => R): R;
    }
}

Object.prototype.letZ = function <T, R>(this: T, block: (value: T) => R): R {
    return block(this);
};

export {}; // Ensure an empty export to make it a module file
