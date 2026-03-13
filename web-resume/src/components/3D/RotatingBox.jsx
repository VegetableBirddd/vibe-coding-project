import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export function RotatingBox() {
  const meshRef = useRef()

  useEffect(() => {
    return () => {
      if (meshRef.current) {
        meshRef.current.geometry?.dispose()
        meshRef.current.material?.dispose()
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
