import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'

function RotatingGeometry() {
  const meshRef = useRef()
  const ringRef = useRef()
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.7
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3
      ringRef.current.rotation.x += delta * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function LoadingScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <RotatingGeometry />
    </>
  )
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
        >
          <div className="w-64 mb-8">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <LoadingScene />
            </Canvas>
          </div>
          
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>
          
          <motion.p 
            className="text-cyan-400 font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading... {Math.round(Math.min(progress, 100))}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
