import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { pathToRevalidate } = JSON.parse(req.body)
    await res.revalidate(pathToRevalidate)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    // return res.status(500).send('Error revalidating')
    console.log('/api failed to revalidate artist page')
    throw err
  }
}