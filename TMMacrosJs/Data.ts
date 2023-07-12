

import {Log, logz} from "./TMLogger";

export class Data {
    toString(): string {
        // TODO: This is going to replace all newlines, which might not be ideal.
        return JSON.stringify(this, null, '  ').replace(/\n/g, '').replace(/"(\w+)":/g, '$1:');
    }

    // TODO: I wasn't sure how to override equals
    equals2(other: Data): boolean {
        Log.v(`this.toString():${this.toString()}`)
        Log.v(`other.toString():${other.toString()}`)
        return this.toString() == other.toString();
    }

    // TODO: Should replace copy, and hash as well.
}