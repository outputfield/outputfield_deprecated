import { Magic } from 'magic-sdk'

export const magicClient = new Magic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '',
  { testMode: process.env.STAGING === '1' }
)