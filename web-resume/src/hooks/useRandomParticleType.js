import { useMemo } from 'react'

const seededRandom = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const getInitialParticleType = () => {
  const randomSeed = Date.now()
  const randomIndex = Math.floor(seededRandom(randomSeed) * PARTICLE_TYPES.length)
  return PARTICLE_TYPES[randomIndex]
}

export const PARTICLE_TYPES = [
  'galaxy',
  'wave',
  'smoke',
  'network',
  'tornado',
  'meteor'
]

export function useRandomParticleType() {
  const particleType = useMemo(() => getInitialParticleType(), [])

  return particleType
}
