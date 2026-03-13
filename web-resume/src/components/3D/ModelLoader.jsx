import { useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function ModelLoader({ url, fallback = null, onError, ...props }) {
  const { scene, error } = useGLTF(url)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (scene) {
      setLoaded(true)
    }
  }, [scene])

  useEffect(() => {
    if (error && onError) {
      onError(error)
    }
  }, [error, onError])

  if (error) {
    return fallback
  }

  if (!loaded) {
    return fallback
  }

  return <primitive object={scene.clone()} {...props} />
}

useGLTF.preload('/models/placeholder.glb')
