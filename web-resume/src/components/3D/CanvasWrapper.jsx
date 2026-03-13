import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function CanvasWrapper({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: '#0a0a0a', width: '100%', height: '100%' }}
      gl={{ 
        antialias: true, 
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      {children}
    </Canvas>
  )
}
