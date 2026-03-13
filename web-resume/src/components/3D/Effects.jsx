import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useDevicePerformance } from '../../hooks/useDevicePerformance'

export function Effects() {
  const { isMobile, isLowEnd } = useDevicePerformance()

  if (isMobile || isLowEnd) {
    return null
  }

  return (
    <EffectComposer>
      <Bloom 
        intensity={0.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette 
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration 
        offset={[0.0005, 0.0005]}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
