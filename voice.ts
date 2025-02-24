import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { text } = req.body
    
    // Save voice text to your database
    
    res.status(200).json({ message: 'Voice text added successfully' })
  } catch (error) {
    console.error('Voice add error:', error)
    res.status(500).json({ message: 'Failed to add voice text' })
  }
} 