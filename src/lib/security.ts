import crypto from 'crypto'

const sign = (key: string, data: any): string => {
	return `sha1=${crypto.createHmac('sha1', key).update(data).digest('hex')}`
}

export const verifySignature = (secret: string, signature: string, data: any): boolean => {
	const sig = Buffer.from(signature)
	const signed = Buffer.from(sign(secret, data))

	if (sig.length !== signed.length) {
		return false
	}

	return crypto.timingSafeEqual(sig, signed)
}
