import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, useCursor } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function RobotModel({ 
  position = [0, -1.5, 0], 
  scale = 0.8,
  autoRotate = true,
  hoverEffect = true
}) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useCursor(hovered)

  const { scene, animations } = useGLTF('/vibe-coding-project/models/robot.glb')
  
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene)
    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        if (child.name.toLowerCase().includes('head') || 
            child.name.toLowerCase().includes('visor') ||
            child.name.toLowerCase().includes('eye') ||
            child.material.color?.getHex() > 0x333333) {
          child.userData.isEye = true
          child.userData.originalEmissive = child.material.emissive?.clone() || new THREE.Color(0x000000)
        }
        child.material.emissive = new THREE.Color(0x111111)
        child.material.emissiveIntensity = 0.6
      }
    })
    return cloned
  }, [scene])
  
  useEffect(() => {
    if (clone) {
      clone.traverse((child) => {
        if (child.isMesh && child.userData.isEye) {
          if (hovered) {
            child.material.emissive = new THREE.Color(0x00ffff)
            child.material.emissiveIntensity = 2
          } else {
            child.material.emissive = child.userData.originalEmissive || new THREE.Color(0x000000)
            child.material.emissiveIntensity = 0
          }
        }
      })
    }
  }, [hovered, clone])
  
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const actionNames = Object.keys(actions)
      const idleAction = actionNames.find(name => 
        name.toLowerCase().includes('idle') || 
        name.toLowerCase().includes('stand')
      ) || actionNames[0]
      
      if (idleAction && actions[idleAction]) {
        actions[idleAction].fadeIn(0.5).play()
      }
    }
  }, [actions])

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.3
      }
      
      if (hoverEffect) {
        const target = hovered ? 1.15 : 1
        groupRef.current.scale.setScalar(
          THREE.MathUtils.lerp(groupRef.current.scale.x, target * scale, 0.1)
        )
      }
    }
  })

  return (
    <group 
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={() => hoverEffect && setHovered(true)}
      onPointerOut={() => hoverEffect && setHovered(false)}
    >
      <primitive 
        object={clone} 
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/vibe-coding-project/models/robot.glb')
