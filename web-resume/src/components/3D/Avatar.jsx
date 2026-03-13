import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import * as THREE from 'three'

export function Avatar() {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
      const target = hovered ? 1.2 : 1
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.1))
    }
  })

  return (
    <group 
      ref={groupRef}
      position={[0, 0, 0]}
    >
      <mesh 
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  )
}
