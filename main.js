import * as THREE from 'three';

function createStarfield(num, range) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });

    const vertices = [];
    for (let i = 0; i < num; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(range),
            THREE.MathUtils.randFloatSpread(range),
            THREE.MathUtils.randFloatSpread(range)
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return new THREE.Points(geometry, material);
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set the background to black

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1200;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#background'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const stars = createStarfield(20000, 2000);
scene.add(stars);

function animate() {
    requestAnimationFrame(animate);
    camera.position.z -= 5 * clock.getDelta();
    if (camera.position.z <= 0) camera.position.z = 1200;
    renderer.render(scene, camera);
}

const clock = new THREE.Clock();
animate();
