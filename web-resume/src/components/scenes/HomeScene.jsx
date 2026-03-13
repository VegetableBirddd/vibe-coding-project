import { CanvasWrapper } from '../3D/CanvasWrapper'
import { Avatar } from '../3D/Avatar'
import { ParticleSystem } from '../3D/ParticleSystem'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'

export function HomeScene() {
  const { isMobile, isLowEnd } = useDevicePerformance()
  const particleCount = isMobile ? 400 : isLowEnd ? 500 : 800

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 z-0">
        <CanvasWrapper>
          <ParticleSystem count={particleCount} />
          <Avatar />
        </CanvasWrapper>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-300">
            Creative Developer & 3D Enthusiast
          </p>
        </div>
      </div>
    </div>
  )
}
