import * as THREE from 'three'
import Material from './Material'
export default class Wireframe extends Material {
    constructor(scene: THREE.Scene,color:string|number|THREE.Color = new THREE.Color("hsl(180, 100%, 50%)"), type?:any, args: any = {wireframe:true,transparent:true,opacity:0.1}){
        args = args || {};
        type = type || THREE.MeshPhongMaterial;
        super(scene,color,type,args);
    }
}