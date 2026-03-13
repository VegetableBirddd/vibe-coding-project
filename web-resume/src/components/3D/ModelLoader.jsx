import { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function ModelLoader({ url, fallback = null, onError, ...props }) {
  const { scene, error } = useGLTF(url)

  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  if (error || !scene) {
    return fallback
  }

  return <primitive object={scene.clone()} {...props} />
}

useGLTF.preload('/models/placeholder.glb')
