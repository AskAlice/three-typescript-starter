import * as THREE from 'three'
import Material from '../Material/Material';
import Mesh from './Mesh';
import Wireframe from '../Material/Wireframe';
export default class Tile extends Mesh {
    material: any;
    scene: THREE.Scene;
    mat: THREE.Material;
    geo: any;
    size:any;
    group:any;
    position:Array<number>;
    rotation:Array<number>;
    mesh: THREE.Mesh;
    isCurrentTile: Boolean;
    constructor(scene,size?:Array<number>,position?:Array<number>,rotation?:Array<number>,material?:Material) {
        material = material || new Wireframe();
        super(scene, size, position, rotation, material);
        this.isCurrentTile = true;
        this.mesh.name = "Tile"
    }
    solidify(box){
        box = box.clone();
        box.position.y+=0.05;
        this.scene.add(box);
        return box;
    }
    place(){
        this.scene.add(this.mesh);
        return (x=0,y=0,z=0) => {
        this.mesh.position.set(x,y,z);
        return (xR=0,yR=0,zR=0,order=undefined) => {
            this.mesh.rotation.set(xR,yR,zR,order);
            this.scene.add(this.mesh);
            }
        }
        
    }
}