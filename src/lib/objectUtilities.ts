export const matchOnKeys = (mapA: Object, mapB: Object): boolean => {
	let valuesMatch = true

	for (const key in mapA) {
		if (mapA[key] != mapB[key]) {
			valuesMatch = false
			break
		}
	}

	return valuesMatch
}
