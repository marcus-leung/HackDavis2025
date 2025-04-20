// components/Globe.jsx

"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const Globe = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Set up the Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000) // Aspect ratio set to 1 for square
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })
    
    // Set the size of the canvas (e.g., 300x300px square)
    const size = 300
    renderer.setSize(size, size)
    renderer.setClearColor(0xFFFFFF, 1) // Matching the white background color
    
    // Set the canvas background color to match the rest of the screen
    document.body.appendChild(renderer.domElement)

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Move camera back so we can see the cube
    camera.position.z = 5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      scene.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-0 pointer-events-none">
      {/* Square canvas with a size of 300px */}
      <canvas ref={canvasRef} className="w-[300px] h-[300px]" />
    </div>
  )
}

export default Globe
