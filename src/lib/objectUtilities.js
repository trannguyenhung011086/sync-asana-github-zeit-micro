export const matchOnKeys = (mapA, mapB) => {
    let valuesMatch = true

    for (const key in mapA) {
        if (mapA[key] != mapB[key]) {
            valuesMatch = false;
            break
        }
    }

    return valuesMatch
}