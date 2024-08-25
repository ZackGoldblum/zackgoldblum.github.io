import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Starfield = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const starsRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const createStarfield = (num, range) => {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array(num * 3);

            for (let i = 0; i < num * 3; i += 3) {
                vertices[i] = THREE.MathUtils.randFloatSpread(range);
                vertices[i + 1] = THREE.MathUtils.randFloatSpread(range);
                vertices[i + 2] = THREE.MathUtils.randFloatSpread(range);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5 });
            return new THREE.Points(geometry, material);
        };

        let scene, camera, renderer, stars;

        const init = () => {
            scene = new THREE.Scene();
            sceneRef.current = scene;
            scene.background = new THREE.Color(0x000000);

            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
            cameraRef.current = camera;
            camera.position.z = 500;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            rendererRef.current = renderer;
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            mountRef.current.appendChild(renderer.domElement);

            stars = createStarfield(10000, 1000);
            starsRef.current = stars;
            scene.add(stars);

            const starSpeeds = new Float32Array(10000).map(() => THREE.MathUtils.randFloat(3, 8));

            let lastTime = performance.now();
            const maxDelta = 1 / 30;  // Cap the delta at 30 fps

            const animate = () => {
                const currentTime = performance.now();
                let delta = (currentTime - lastTime) / 1000;  // Convert to seconds
                delta = Math.min(delta, maxDelta);
                lastTime = currentTime;

                const positions = stars.geometry.attributes.position.array;

                for (let i = 0; i < positions.length; i += 3) {
                    // Use individual star speed
                    positions[i + 2] += starSpeeds[i / 3] * delta * 1.25;

                    if (positions[i + 2] > 500) {
                        positions[i] = THREE.MathUtils.randFloatSpread(1000);
                        positions[i + 1] = THREE.MathUtils.randFloatSpread(1000);
                        positions[i + 2] = -500;
                    }
                }

                stars.geometry.attributes.position.needsUpdate = true;

                renderer.render(scene, camera);
                animationFrameRef.current = requestAnimationFrame(animate);
            };

            animate();

            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            };

            window.addEventListener('resize', handleResize);

            // Capture the current value of mountRef.current
            const currentMount = mountRef.current;

            return () => {
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animationFrameRef.current);
                if (currentMount && renderer) {
                    currentMount.removeChild(renderer.domElement);
                }
                // Dispose of Three.js objects
                if (scene) {
                    scene.dispose();
                }
                if (renderer) {
                    renderer.dispose();
                }
            };
        };

        init();

        return () => {
            // No-op
        };
    }, []);

    return <div ref={mountRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
    }} />;
};

export default Starfield;