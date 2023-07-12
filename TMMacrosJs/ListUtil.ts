// @ts-ignore
import ffi from 'ffi-napi';

export default class ListUtil {
    static hasDuplicate(list: any[]) {
        const set = new Set();
        for (const item of list) {
            if (set.has(item)) {
                return true; // Found a duplicate
            }
            set.add(item);
        }
        return false; // No duplicates found
    }
}
