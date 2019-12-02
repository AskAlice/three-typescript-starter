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
    position:Array<number>;
    rotation:Array<number>;
    mesh: THREE.Mesh;
    isCurrentTile: Boolean;
    constructor(scene:THREE.Scene,size?:Array<number>,position?:Array<number>,rotation?:Array<number>,material?:Material) {
        material = material || new Wireframe(scene);
        super(scene, size, position, rotation, material);
        this.isCurrentTile = true;
    }
    solidify(box){
        box = box.clone();
        box.position.y+=0.25;
        this.scene.add(box);
        return box;
    }
}