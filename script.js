import * as THREE from "../Modules/three.module.js";
import { OrbitControls } from "../Modules/OrbitControls.js";

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const Orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
Orbit.update();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    '../Image/stars.jpg',
    '../Image/stars.jpg',
    '../Image/stars.jpg',
    '../Image/stars.jpg',
    '../Image/stars.jpg',
    '../Image/stars.jpg'

]);

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.SphereGeometry(85, 30, 30);
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('../Image/earth.jpg')
});
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

function animate(){

    renderer.render(scene, camera);

    mesh.rotateY(0.004);
}
renderer.setAnimationLoop(animate)


let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs >= 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    let time = `${hrs}:${mins}:${secs}:${period}`;
    document.getElementById("clock").innerText = time;
    setTimeout(clock, 1000);
  };
  
  clock();