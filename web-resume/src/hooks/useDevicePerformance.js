import { useState, useEffect } from 'react'

export function useDevicePerformance() {
  const [performance, setPerformance] = useState({
    isMobile: false,
    isLowEnd: false,
    pixelRatio: 1,
  })

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      
      const isLowEnd = navigator.hardwareConcurrency <= 4 || 
        (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 4)

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        isMobile ? 1.5 : 2
      )

      setPerformance({ isMobile, isLowEnd, pixelRatio })
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return performance
}
