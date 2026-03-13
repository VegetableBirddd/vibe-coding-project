import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export function RotatingBox() {
  const meshRef = useRef()

  useEffect(() => {
    const mesh = meshRef.current
    return () => {
      if (mesh) {
        mesh.geometry?.dispose()
        mesh.material?.dispose()
      }
    }
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}
