import crypto from 'crypto'

const sign = (key, data) => {
	return `sha1=${crypto.createHmac('sha1', key).update(data).digest('hex')}`
}

export const verifySignature = (secret, signature, data) => {
	const sig = Buffer.from(signature)
	const signed = Buffer.from(sign(secret, data))

	if (sig.length !== signed.length) {
		return false
	}

	return crypto.timingSafeEqual(sig, signed)
}
