import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const seededRandom = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function ParticleSystem({ count = 800 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      const r4 = seededRandom(i + count * 3)
      const r5 = seededRandom(i + count * 4)
      
      positions[i * 3] = (r1 - 0.5) * 20
      positions[i * 3 + 1] = (r2 - 0.5) * 20
      positions[i * 3 + 2] = (r3 - 0.5) * 20

      colors[i * 3] = r4 * 0.5 + 0.5
      colors[i * 3 + 1] = r5 * 0.3 + 0.7
      colors[i * 3 + 2] = 1
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}
