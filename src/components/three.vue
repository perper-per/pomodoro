<template>
  <div ref="root" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const root = ref(null)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const loader = new GLTFLoader()
const renderer = new THREE.WebGLRenderer()
const controls = new OrbitControls(camera, renderer.domElement)
const light = new THREE.DirectionalLight(0xffffff, 3)
const light2 = new THREE.AmbientLight(0x404040)
const light3 = new THREE.PointLight( 0xff0000, 8, 100 );
const textureLoader = new THREE.TextureLoader()
let loadedModel = null

const animate = () => {
  requestAnimationFrame(animate)

  // 如果模型已載入，調整旋轉
  if (loadedModel) {
    // loadedModel.rotation.x += 0.01
    loadedModel.rotation.y += 0.05
  }
  renderer.render(scene, camera)
}

onMounted(() => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 直接用 renderer 給的 canvas
  root.value.appendChild(renderer.domElement)

  textureLoader.load('/public/GalacticCenter_desktop.png', (texture) => {
    scene.background = texture
  })

  light.position.set(1, 1, 3).normalize()
  light3.position.set( 0, 0, 2 );
  scene.add(light, light2, light3)

  loader.load('/tomato.glb', (gltf) => {
    scene.add(gltf.scene)
    loadedModel = gltf.scene
    loadedModel.scale.set(1.8, 1.8, 1.8)
  })

  camera.position.set(1, 0, 2)
  controls.update()

  animate()
})
</script>
