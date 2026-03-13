import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const seededRandom = (seed) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function ParticleGalaxy({ count = 600 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      const r4 = seededRandom(i + count * 3)
      
      const angle = r1 * Math.PI * 4
      const radius = r2 * 8 + 1
      const height = (r3 - 0.5) * 3
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius

      const colorMix = r4
      colors[i * 3] = 0.2 + colorMix * 0.5
      colors[i * 3 + 1] = 0.3 + colorMix * 0.3
      colors[i * 3 + 2] = 0.8 + colorMix * 0.2

      sizes[i] = r1 * 0.08 + 0.02
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

function ParticleWave({ count = 800 }) {
  const pointsRef = useRef()

  const { particles, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const original = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      
      positions[i * 3] = (r1 - 0.5) * 15
      positions[i * 3 + 1] = (r2 - 0.5) * 15
      positions[i * 3 + 2] = (r3 - 0.5) * 10

      original[i * 3] = positions[i * 3]
      original[i * 3 + 1] = positions[i * 3 + 1]
      original[i * 3 + 2] = positions[i * 3 + 2]

      const dist = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2)
      const colorMix = Math.min(dist / 8, 1)
      colors[i * 3] = 0.2 + colorMix * 0.8
      colors[i * 3 + 1] = 0.9 - colorMix * 0.3
      colors[i * 3 + 2] = 1 - colorMix * 0.5
    }

    return { particles: { positions, colors }, originalPositions: original }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        
        const wave = Math.sin(ox * 0.5 + time * 2) * 0.5
        positions[i * 3] = ox + wave * 0.3
        positions[i * 3 + 1] = oy + Math.sin(oy * 0.5 + time * 1.5) * 0.3
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

function ParticleSmoke({ count = 600 }) {
  const pointsRef = useRef()

  const { particles, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const original = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      
      positions[i * 3] = (r1 - 0.5) * 12
      positions[i * 3 + 1] = (r2 - 0.5) * 12
      positions[i * 3 + 2] = (r3 - 0.5) * 8

      original[i * 3] = positions[i * 3]
      original[i * 3 + 1] = positions[i * 3 + 1]
      original[i * 3 + 2] = positions[i * 3 + 2]

      const brightness = r1 * 0.3 + 0.4
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness
    }

    return { particles: { positions, colors }, originalPositions: original }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3]
        const oy = originalPositions[i * 3 + 1]
        const oz = originalPositions[i * 3 + 2]
        
        const noise = Math.sin(ox * 0.3 + time * 0.5) * Math.cos(oy * 0.3 + time * 0.3)
        positions[i * 3] = ox + noise * 1.5
        positions[i * 3 + 1] = oy + Math.sin(time * 0.2) * 2
        positions[i * 3 + 2] = oz + noise * 1
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function ParticleNetwork({ count = 150 }) {
  const pointsRef = useRef()
  const linesRef = useRef()

  const { particles, linePositions } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const linePositions = []

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      
      positions[i * 3] = (r1 - 0.5) * 16
      positions[i * 3 + 1] = (r2 - 0.5) * 12
      positions[i * 3 + 2] = (r3 - 0.5) * 8

      colors[i * 3] = 0.2
      colors[i * 3 + 1] = 0.9
      colors[i * 3 + 2] = 0.9
    }

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const x1 = positions[i * 3], y1 = positions[i * 3 + 1], z1 = positions[i * 3 + 2]
        const x2 = positions[j * 3], y2 = positions[j * 3 + 1], z2 = positions[j * 3 + 2]
        const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2)
        if (dist < 3) {
          linePositions.push(x1, y1, z1, x2, y2, z2)
        }
      }
    }

    return { particles: { positions, colors }, linePositions: new Float32Array(linePositions) }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </lineSegments>
    </>
  )
}

function ParticleTornado({ count = 500 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      
      const height = r1
      const angle = r2 * Math.PI * 2
      const radius = (1 - height) * 2 + r3 * 0.5

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height * 10 - 5
      positions[i * 3 + 2] = Math.sin(angle) * radius

      const colorMix = height
      colors[i * 3] = 1 - colorMix * 0.5
      colors[i * 3 + 1] = 0.4 - colorMix * 0.3
      colors[i * 3 + 2] = 0.1

      velocities[i] = r1 * 0.02 + 0.01
    }

    return { positions, colors, velocities }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < count; i++) {
        const y = positions[i * 3 + 1]
        const angle = Math.atan2(positions[i * 3 + 2], positions[i * 3])
        const radius = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 2] ** 2)
        
        const newAngle = angle + particles.velocities[i] * 3
        positions[i * 3] = Math.cos(newAngle) * radius
        positions[i * 3 + 2] = Math.sin(newAngle) * radius
        
        let newY = y + Math.sin(time * 2 + i) * 0.01
        if (newY > 5) newY = -5
        positions[i * 3 + 1] = newY
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

function ParticleMeteor({ count = 300 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = []

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + count)
      const r3 = seededRandom(i + count * 2)
      const r4 = seededRandom(i + count * 3)
      const r5 = seededRandom(i + count * 4)
      const r6 = seededRandom(i + count * 5)
      
      positions[i * 3] = (r1 - 0.5) * 20
      positions[i * 3 + 1] = r2 * 15 - 5
      positions[i * 3 + 2] = (r3 - 0.5) * 10 - 5

      colors[i * 3] = 1
      colors[i * 3 + 1] = 1
      colors[i * 3 + 2] = 1

      velocities.push({
        x: (r4 - 0.5) * 0.02,
        y: -r5 * 0.08 - 0.02,
        z: (r6 - 0.5) * 0.01
      })
    }

    return { positions, colors, velocities }
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] += particles.velocities[i].x
        positions[i * 3 + 1] += particles.velocities[i].y
        positions[i * 3 + 2] += particles.velocities[i].z

        if (positions[i * 3 + 1] < -8) {
          positions[i * 3 + 1] = 8 + seededRandom(i + state.clock.elapsedTime * 10) * 4
          positions[i * 3] = (seededRandom(i + state.clock.elapsedTime) - 0.5) * 20
          positions[i * 3 + 2] = (seededRandom(i + count + state.clock.elapsedTime) - 0.5) * 10 - 5
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

export function ParticleSystems({ type, count = 600 }) {
  const props = { count }

  switch (type) {
    case 'galaxy':
      return <ParticleGalaxy {...props} />
    case 'wave':
      return <ParticleWave {...props} />
    case 'smoke':
      return <ParticleSmoke {...props} />
    case 'network':
      return <ParticleNetwork {...props} />
    case 'tornado':
      return <ParticleTornado {...props} />
    case 'meteor':
      return <ParticleMeteor {...props} />
    default:
      return <ParticleGalaxy {...props} />
  }
}
