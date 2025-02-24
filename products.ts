import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma' // Assuming you're using Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const search = req.query.search as string

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        category: true,
      },
      take: 8, // Limit results
    })

    res.status(200).json(products)
  } catch (error) {
    console.error('Products fetch error:', error)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
} 