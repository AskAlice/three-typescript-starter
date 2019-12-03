import * as THREE from 'three'
import Material from '../Material/Material';

export default class Mesh {
    material: any;
    scene: any;
    mat: THREE.Material;
    geo: any;
    size:any;
    position:Array<number>;
    rotation:Array<number>;
    mesh: THREE.Mesh;
    constructor(scene:THREE.Scene,size?:Array<number>,position?:Array<number>,rotation?:Array<number>,material?:Material) {
        this.scene = scene;
        this.material = material || new Material();
        this.mat = this.getMaterial();
        this.size = size || [];
        this.position = position || [];
        this.rotation = rotation || [0, 0, 0];
        this.getGeometry()(...this.size);
        this.mesh = new THREE.Mesh(this.geo, this.mat);
        this.place()(...this.position)(...this.rotation);
    }
    getMaterial(){
        return this.material.get;
    }
    getGeometry(){
        return (width=10,height=0.5,depth=10, widthSegments = 32, heightSegments = 2, depthSegments=32) => {
            this.geo = new THREE.BoxGeometry(width,height,depth,widthSegments,heightSegments,depthSegments);
            return this.geo;
          };
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
    name(name:string){
        this.mesh.name = name;
    }
}