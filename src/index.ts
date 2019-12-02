// add styles
import './style.css'
import * as THREE from 'three'
import Mesh from './Mesh/Mesh'
import Material from './Material/Material'
import { Vector3 } from 'three'
import Wireframe from './Material/Wireframe'
import Tile from './Mesh/Tile'
const OrbitControls = require('three-orbitcontrols')


let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
	antialias: true
})
renderer.shadowMap.enabled = true;
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement );
controls.target = scene.position;

let axis = new THREE.AxesHelper(10)
//scene.add(axis)

let height = 1;

// let light = new THREE.PointLight(0xffffff, 1.0)
// light.position.set(8, 20, 8)
// light.lookAt(new Vector3());
// //light.castShadow = true;
// scene.add(light)
let light2 = new THREE.AmbientLight(0xffffff, 1.0);
light2.position.set(8,height+25, 8)
//light2.castShadow = true;
scene.add(light2)


let dlight = new THREE.DirectionalLight(0xffffff,1.0);
dlight.castShadow = true;
dlight.position.set( 8,height+5,0 );  
scene.add(dlight);

let obj = new Tile(
	scene,
	[5,0.0001,5,1,1,1],
	undefined,
	undefined,
	new Wireframe(scene, "red", THREE.MeshBasicMaterial,{wireframe:true,opacity:0})
	);

let box = obj.mesh;
var timer = 1 * Date.now();
var lastTimer = 1 * Date.now()

box.castShadow = true;
box.receiveShadow = true;
box.position.x = 0
box.rotation.y = 0
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4

camera.lookAt(scene.position)
document.addEventListener('mousedown',place,false);

function animate(): void {
	requestAnimationFrame(animate)
	render()
}
function place(){
	box = obj.solidify(box);
	let mat = new Material(scene, "hsl("+ (height*20) % 360+", 50%,50%)");
	box.material = mat.get;
	height++;
	obj.mesh = box;
	;[]
	//camera.lookAt(obj.mesh);
}
camera.fov = 10;
function render(): void {
	 timer = 1 * Date.now()

	 //if(timer-lastTimer >25){
		box.position.x = (5.5*Math.sin(timer/10));
		box.position.z = (5.5*Math.cos(timer/10));
 		lastTimer = timer;
		place();
	//camera.position.y = 4+Math.sin(timer/1000);
	//camera.position.y += height;
/*	if(scene.children.length < 900){
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
	} */
	renderer.render(scene, camera)
}

animate()
