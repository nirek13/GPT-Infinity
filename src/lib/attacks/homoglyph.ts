// lib/attacks/homoglyph.ts

const HOMOGLYPH_MAP: Record<string, string> = {
  a: 'а', e: 'е', i: 'і', o: 'о', c: 'с', p: 'р', y: 'у', x: 'х',
}

export function homoglyphAttack(text: string, ratio = 0.3): string {
  return text.split('').map(char => {
    const lower = char.toLowerCase()
    if (HOMOGLYPH_MAP[lower] && Math.random() < ratio) {
      const glyph = HOMOGLYPH_MAP[lower]
      return char === char.toUpperCase() ? glyph.toUpperCase() : glyph
    }
    return char
  }).join('')
}
