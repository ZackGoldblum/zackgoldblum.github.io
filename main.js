import "./main.css"
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-3);
camera.position.setZ(30);

renderer.render(scene, camera);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)

const size = 2000;
const vertices = [];

for (let i = 0; i < 20000; i++) {
    const x = (Math.random() * size + Math.random() * size) / 2 - size / 2;
    const y = (Math.random() * size + Math.random() * size) / 2 - size / 2;
    const z = (Math.random() * size + Math.random() * size) / 2 - size / 2;

    vertices.push(x, y, z);
}

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star)
}

Array(2000).fill().forEach(addStar)

// const backgroundTexture = new THREE.TextureLoader().load("desktop_bg.jpg")
const backgroundTexture = new THREE.TextureLoader().load()
scene.background = backgroundTexture;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate()