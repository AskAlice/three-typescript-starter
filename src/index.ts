// add styles
import './style.css'
import * as THREE from 'three'
import Mesh from './Mesh/Mesh'
import Material from './Material/Material'
import { Vector3 } from 'three'
import Wireframe from './Material/Wireframe'
const OrbitControls = require('three-orbitcontrols')


let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
	antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement );
controls.target = scene.position;

let axis = new THREE.AxesHelper(10)
//scene.add(axis)


let light = new THREE.PointLight(0xffffff, 1.0)
light.position.set(100, 70, 30)
light.lookAt(new Vector3());
scene.add(light)
let light2 = new THREE.AmbientLight(0xffffff, 1.0);
light2.position.set(0, 0, 0)
scene.add(light2)

const obj = new Mesh(
	scene,
	[8,0.1,8,1,1,1],
	undefined,
	undefined,
	new Wireframe(scene)
	);

let box = obj.mesh;



box.position.x = 0.5
box.rotation.y = 0.5
camera.position.x = 5
camera.position.y = 5
camera.position.z = 5

camera.lookAt(scene.position)

function animate(): void {
	requestAnimationFrame(animate)
	render()
}

function render(): void {
	let timer = 1 * Date.now()
	if(scene.children.length < 900){
	box.rotation.x += 2*Math.tan(timer)
	box.rotation.z += 2*Math.cos(timer)
	box.rotation.x += 2*Math.sin(timer)
	const obj = new Mesh(
		scene,
		[5,0.05,5,1,1,1],
		undefined,
		undefined,
		new Wireframe(scene,new THREE.Color("hsl("+timer %360+ ", 80%, 50%)"),THREE.MeshBasicMaterial, {})
		);
	console.log(timer%360);
	//box.position.y = 0.5 + 0.5 * Math.sin(timer)
	obj.mesh.rotation.y = box.rotation.y+0.8*(timer*0.011 % 0.8)
	obj.mesh.rotation.z = box.rotation.z+0.5*(timer*0.013 % 0.8)
	obj.mesh.rotation.x = box.rotation.x+0.5*(timer*0.019 % 0.8)
	}
	renderer.render(scene, camera)
}

animate()
