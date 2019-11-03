import * as THREE from 'three'

export default class Material {
    basic: THREE.MeshBasicMaterial;
    params: object;
    type:any;
    get:THREE.MeshBasicMaterial|THREE.MeshDepthMaterial|THREE.MeshDistanceMaterial|THREE.MeshMatcapMaterial|THREE.MeshLambertMaterial|THREE.MeshNormalMaterial|THREE.MeshPhongMaterial|THREE.MeshPhysicalMaterial|THREE.MeshStandardMaterial|THREE.MeshToonMaterial;
    args: object;
    constructor(scene: THREE.Scene,color?:string|number|THREE.Color, type?:any, args?:object){
        this.type = type || THREE.MeshToonMaterial;
        this.args = args || {};
        const params = {
            color,
            side: THREE.DoubleSide,
            flatShading: true
          }
        this.params = {...params,...this.args};
        this.get = new this.type(this.params);
    }
}