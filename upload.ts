import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = formidable()
    const [fields, files] = await form.parse(req)
    
    // Handle file upload to your storage service (e.g., S3, Firebase Storage)
    // Return the file URL and ID
    
    res.status(200).json({
      url: 'file-url-here',
      id: uuidv4()
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ message: 'Upload failed' })
  }
} 