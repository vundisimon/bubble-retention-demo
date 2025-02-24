// app/api/createTemplate.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createTemplate } from '@/utils/klaviyo/templates'; // Import your util function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    // Extract data from the request body
    const { name, html } = req.body;

    // Call the createTemplate utility function
    const response = await createTemplate({
      name,
      html,
    });

    // Return the Klaviyo response to the client
    res.status(201).json(response);
  } catch (error: any) {
    console.error('Error creating template:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message,
    });
  }
}
