
export function when<T>(x : any | null, map: Record<any | null, T>) {
    return map[x] ?? map["else"]
}


