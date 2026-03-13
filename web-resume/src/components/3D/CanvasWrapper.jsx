import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'

export function CanvasWrapper({ children }) {
  const { isMobile, isLowEnd } = useDevicePerformance()
  
  const dpr = isMobile ? [1, 1.5] : [1, 2]
  const enableShadows = !isMobile && !isLowEnd

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: '#0a0a0a', width: '100%', height: '100%' }}
      gl={{ 
        antialias: !isLowEnd, 
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      dpr={dpr}
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow={enableShadows}
      />
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        enableDamping={!isLowEnd}
        dampingFactor={0.05}
      />
      {children}
    </Canvas>
  )
}
