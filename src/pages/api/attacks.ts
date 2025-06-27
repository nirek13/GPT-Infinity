// pages/api/attack.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { homoglyphAttack } from '@/lib/attacks/homoglyph'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text, attacks } = req.body

  let output = text
  if (attacks?.includes('homoglyph')) {
    output = homoglyphAttack(output)
  }

  res.status(200).json({
    original: text,
    transformed: output,
    appliedAttacks: attacks,
  })
}
