// add styles
import './style.css'
import * as THREE from 'three'
import Mesh from './Mesh/Mesh'
import Material from './Material/Material'
import { Vector3, MeshPhongMaterial } from 'three'
import Wireframe from './Material/Wireframe'
import Tile from './Mesh/Tile'
const OrbitControls = require('three-orbitcontrols')


const cameraSpeed = 0.25;
const cameraDistance = -50;
const boxSize = 3;
let tubeDiameter = 20;
let spiralizer = 10;

window.THREE = THREE;
let scene = new THREE.Scene();
(global as any).scene = scene;
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
	antialias: true
})
camera.name = "PerspectiveCamera";
renderer.shadowMap.enabled = true;
renderer.autoClear = false;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement );
controls.target = scene.position;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;
let axis = new THREE.AxesHelper(10)
//scene.add(axis)

let height = 1;
(global as any).isRunning = true;

// let light = new THREE.PointLight(0xffffff, 1.0)
// light.position.set(8, 20, 8)
// light.lookAt(new Vector3());
// //light.castShadow = true;
// scene.add(light)
let light2 = new THREE.AmbientLight(0xffffff, 1.0);
light2.position.set(8,height+25, 8)
light2.name = "AmbientLight";
//light2.castShadow = true;
scene.add(light2)


let dlight = new THREE.DirectionalLight(0xffffff,1.0);
dlight.castShadow = true;
dlight.position.set( 8,height+5,0 );  
dlight.name = "DirectionalLight";
scene.add(dlight);



let subject = new Mesh(
	scene,
	[10000,0,10000],
	[0,-55.55,0],
	undefined,
	new Material(
		"hsl(38,50%,50%)",
		MeshPhongMaterial,{
			transparent:true,
			opacity:0.7}
			)
	)

let tiles = new THREE.Group();
tiles.name = "Tiles";
let obj = new Tile(
	tiles,
	[boxSize,0.0001,boxSize,1,1,1],
	undefined,
	undefined,
	new Material("red", THREE.MeshBasicMaterial,{wireframe:true,opacity:0})
	);
	scene.remove(obj.mesh);
	tiles.remove(obj.mesh);
let box = obj.mesh;
box.rotation.x = 90;
var timer = 1 * Date.now();
var lastTimer = 1 * Date.now()
let heightNull = new THREE.Object3D; 
box.castShadow = true;
box.receiveShadow = true;
box.position.x = 0
box.rotation.y = 1;
camera.position.y = cameraDistance;
camera.position.z = 0;
scene.add(tiles);
camera.lookAt(scene.position)
document.addEventListener('mousedown',place,false);

function animate(): void {
	requestAnimationFrame(animate)
	render()
}
function place(){
	box = obj.solidify(box);
	let mat = new Material("hsl("+ (height*20) % 360+", 50%,50%)",undefined,{transparent:true,opacity:0});
	box.material = mat.get;
	height++;
	obj.mesh = box;
	;
	timer = 1 * Date.now()
	
	//if(timer-lastTimer >25){
	box.position.x = (tubeDiameter*Math.cos(timer/spiralizer));
	box.position.z = (tubeDiameter*Math.sin(timer/spiralizer));
	box.rotation.x = (90*Math.cos(timer/spiralizer));
	box.rotation.z = (90*Math.sin(timer/spiralizer));
	box.rotation.y = (90*Math.tan(timer/spiralizer));
	tubeDiameter =10*Math.sin(timer/800)+40;
	spiralizer += Math.cos(timer/500);
	let pos = new THREE.Vector3(0,(height-5)*0.05,0);
	//camera.lookAt(pos);
	controls.target=pos;
	tiles.children.forEach(function(c:THREE.Mesh){
		if((c.material as THREE.Material).opacity > 0.999){
			scene.remove(c);
			//console.log("oof");
		 	tiles.remove(c);
		}else{
			(c.material as THREE.Material).opacity += 0.0009;
		}
	})
	//camera.lookAt(obj.mesh);
}
camera.fov = 130;
function render(): void {
	if((global as any).isRunning){
		if(camera.position.y < height)
		camera.position.y += .25; 
		lastTimer = timer;
		// scene.add(camera);
	}
	for(let i = 0; i < 5; i++)
		place();
	subject.mesh.position.y += 0.25;
	controls.update();
	// camera.rotation.x += 0.1;
	// camera.rotation.z += 0.1;
	
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
	