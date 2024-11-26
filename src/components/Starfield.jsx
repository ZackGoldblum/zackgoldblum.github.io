import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Starfield = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const starsRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const createStarfield = (num, range, layerIndex) => {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array(num * 3);
            const colors = new Float32Array(num * 3);
            const sizes = new Float32Array(num);

            // Star colors based on temperature (from red to blue-white)
            const starColors = [
                new THREE.Color(0xffcccc), // Reddish
                new THREE.Color(0xffffff), // White
                new THREE.Color(0xccccff), // Bluish
            ];

            for (let i = 0; i < num; i++) {
                const i3 = i * 3;
                vertices[i3] = THREE.MathUtils.randFloatSpread(range);
                vertices[i3 + 1] = THREE.MathUtils.randFloatSpread(range);
                vertices[i3 + 2] = THREE.MathUtils.randFloatSpread(range);

                // Random color from our palette
                const color = starColors[Math.floor(Math.random() * starColors.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;

                // Varied sizes based on layer and random factor
                sizes[i] = (Math.random() * 2 + 0.5) * (1 + layerIndex * 0.5);
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 1.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                sizeAttenuation: true
            });

            return new THREE.Points(geometry, material);
        };

        let scene, camera, renderer;
        const starLayers = [];

        const init = () => {
            scene = new THREE.Scene();
            sceneRef.current = scene;
            scene.background = new THREE.Color(0x000000);

            camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
            cameraRef.current = camera;
            camera.position.z = 500;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            rendererRef.current = renderer;
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            mountRef.current.appendChild(renderer.domElement);

            // Create multiple star layers
            const layerConfigs = [
                { stars: 5000, range: 1000, speed: 12 },
                { stars: 4000, range: 800, speed: 8 },
                { stars: 3000, range: 600, speed: 5 }
            ];

            layerConfigs.forEach((config, index) => {
                const stars = createStarfield(config.stars, config.range, index);
                stars.userData.speed = config.speed;
                scene.add(stars);
                starLayers.push(stars);
            });
            starsRef.current = starLayers;

            let lastTime = performance.now();
            const maxDelta = 1 / 60;

            const animate = () => {
                const currentTime = performance.now();
                let delta = (currentTime - lastTime) / 1000;  // Convert to seconds
                delta = Math.min(delta, maxDelta);
                lastTime = currentTime;

                starLayers.forEach(stars => {
                    const positions = stars.geometry.attributes.position.array;
                    const sizes = stars.geometry.attributes.size.array;

                    for (let i = 0; i < positions.length; i += 3) {
                        // Move stars
                        positions[i + 2] += stars.userData.speed * delta;

                        // Reset position when star goes too far
                        if (positions[i + 2] > 500) {
                            positions[i] = THREE.MathUtils.randFloatSpread(1000);
                            positions[i + 1] = THREE.MathUtils.randFloatSpread(1000);
                            positions[i + 2] = -500;
                        }

                        // Twinkle effect
                        const starIndex = i / 3;
                        sizes[starIndex] *= 0.9 + Math.random() * 0.2;
                    }

                    stars.geometry.attributes.position.needsUpdate = true;
                    stars.geometry.attributes.size.needsUpdate = true;
                });

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