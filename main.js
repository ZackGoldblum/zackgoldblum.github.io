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
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1200;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#background'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const stars = createStarfield(20000, 2000);
scene.add(stars);

const clock = new THREE.Clock();

function animate() {
    if (!isPaused) {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();  // Get the time elapsed since last frame
        camera.position.z -= 5 * delta;
        if (camera.position.z <= 0) camera.position.z = 1200;
    }
    renderer.render(scene, camera);
}

function togglePause() {
    isPaused = !isPaused;

    if (isPaused) {
        pauseButton.src = "/buttons/play.webp";
    } else {
        pauseButton.src = "/buttons/pause.webp";
        clock.start();
        animate();
    }
}

// Animation control
let isPaused = false;
const pauseButton = document.getElementById('playpauseButton')
if (pauseButton) {
    pauseButton.addEventListener('click', togglePause);
}

document.addEventListener('DOMContentLoaded', function () {
    const starsButton = document.getElementById('starsButton');

    if (starsButton) {
        starsButton.addEventListener('click', function () {
            window.location.href = 'space';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.getElementById('backButton');

    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }
});

animate();
