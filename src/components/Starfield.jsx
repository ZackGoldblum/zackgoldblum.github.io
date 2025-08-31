import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const Starfield = ({ onSkyboxLoaded = () => { }, disableScrollMotion = false }) => {
    // Three.js scene references
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Component state
    const [starsVisible, setStarsVisible] = useState(false);
    const [starsAnimating, setStarsAnimating] = useState(false);

    // Use ref for callback to keep it stable and prevent useEffect re-runs
    const onSkyboxLoadedRef = useRef(onSkyboxLoaded);

    // Update ref when callback changes, but don't trigger useEffect
    useEffect(() => {
        onSkyboxLoadedRef.current = onSkyboxLoaded;
    }, [onSkyboxLoaded]);

    // Animation and scroll tracking references
    const scrollProgressRef = useRef(0);
    const scrollVelocityRef = useRef(0);
    const lastScrollTimeRef = useRef(0);
    const lastScrollPositionRef = useRef(0);
    const starLayersRef = useRef([]);
    const starsVisibleRef = useRef(false);
    const starsAnimatingRef = useRef(false);

    // Sync states with refs for animation loop access
    useEffect(() => {
        starsVisibleRef.current = starsVisible;
    }, [starsVisible]);

    useEffect(() => {
        starsAnimatingRef.current = starsAnimating;
    }, [starsAnimating]);

    // Start animation when stars become visible (independent of UI)
    useEffect(() => {
        if (starsVisible && !starsAnimating) {
            setStarsAnimating(true);
        }
    }, [starsVisible, starsAnimating]);

    useEffect(() => {
        let scene, camera, renderer, skyboxMesh;

        // Function to create a circular texture for perfect star circles
        const createCircularTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            // Clear canvas
            ctx.clearRect(0, 0, 64, 64);

            // Create radial gradient for smooth circular falloff
            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
            gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

            // Draw the circle
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            return texture;
        };

        // Configuration constants (increased minimum sizes to prevent twinkling)
        const STAR_LAYER_CONFIG = {
            // VERY_DISTANT: { count: 3000, distance: 800, size: 0.6, opacity: 0.4 },
            // FAR: { count: 2500, distance: 600, size: 0.7, opacity: 0.5 },
            DISTANT: { count: 2000, distance: 450, size: 0.8, opacity: 0.6 },
            MEDIUM_FAR: { count: 1500, distance: 350, size: 0.9, opacity: 0.7 },
            MEDIUM: { count: 1000, distance: 250, size: 1.0, opacity: 0.8 }
        };

        const ANIMATION_CONFIG = {
            skyboxFadeSpeed: 0.015,
            starFadeSpeed: 0.02,
            baseFlightSpeed: 0.6,
            velocityDecay: 0.95,
            maxVelocity: 2000,
            scrollAmplification: { base: 2.5, max: 40 },
            fadeInDuration: 1.0
        };

        // Function to create a layer of stars
        const createStarLayer = (starCount, distance, size, opacity) => {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array(starCount * 3);
            const colors = new Float32Array(starCount * 3);
            const sizes = new Float32Array(starCount);

            // Star colors (warm to cool)
            const starColors = [
                new THREE.Color(0xffffff), // White
                new THREE.Color(0xfffacd), // Light warm
                new THREE.Color(0xffd700), // Gold
                new THREE.Color(0xffb6c1), // Light pink
                new THREE.Color(0x87ceeb), // Sky blue
                new THREE.Color(0xccccff), // Light blue
            ];

            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;

                // Random distribution in a sphere around the camera
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);

                vertices[i3] = distance * Math.sin(phi) * Math.cos(theta);
                vertices[i3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
                vertices[i3 + 2] = distance * Math.cos(phi);

                // Random color
                const color = starColors[Math.floor(Math.random() * starColors.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;

                // Star size with controlled variation (ensure minimum size)
                const sizeVariation = 0.8 + Math.random() * 0.4;
                sizes[i] = Math.max(size * sizeVariation, 0.6); // Minimum size to prevent subpixel rendering
            }

            // Add age tracking for fade-in effect
            const ages = new Float32Array(starCount);
            for (let i = 0; i < starCount; i++) {
                ages[i] = Math.random() * 5.0;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('age', new THREE.BufferAttribute(ages, 1));

            const material = new THREE.PointsMaterial({
                size: size,
                vertexColors: true,
                transparent: true,
                opacity: opacity,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                alphaTest: 0.001, // Lower alpha test to prevent small stars from disappearing
                map: createCircularTexture(),
            });

            const stars = new THREE.Points(geometry, material);
            stars.userData = {
                distance: distance,
                baseOpacity: opacity,
                originalColors: colors.slice()
            };

            return stars;
        };

        const init = () => {
            // Create the scene
            scene = new THREE.Scene();
            sceneRef.current = scene;

            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            cameraRef.current = camera;
            camera.position.set(0, 0, 0);

            // Create and configure renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            rendererRef.current = renderer;
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 1.0);
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.NoToneMapping;
            renderer.toneMappingExposure = 1.0;
            mountRef.current.appendChild(renderer.domElement);

            // Create sphere geometry for skybox
            const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);

            // Load the galaxy texture
            const textureLoader = new THREE.TextureLoader();

            // Load galaxy texture
            textureLoader.load(
                '/hiptyc_2020_8k.webp',
                (texture) => {
                    // Configure texture for skybox
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.flipY = false;
                    texture.generateMipmaps = true;

                    // Create skybox material
                    const skyboxMaterial = new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.BackSide,
                        transparent: true,
                        opacity: 0
                    });

                    // Create and add skybox mesh
                    skyboxMesh = new THREE.Mesh(sphereGeometry, skyboxMaterial);

                    // Initial skybox positioning
                    skyboxMesh.rotation.x = Math.PI * -0.1;
                    skyboxMesh.rotation.y = Math.PI * 0;
                    skyboxMesh.rotation.z = Math.PI * 0;

                    scene.add(skyboxMesh);

                    // Initialize stars and start animation immediately
                    setStarsVisible(true);

                    // Start the animation loop
                    animate();

                    // Delay the UI trigger until stars are visible
                    setTimeout(() => {
                        onSkyboxLoadedRef.current();
                    }, 1000);
                },
                undefined, // Progress callback not needed
                (error) => {
                    console.error('Failed to load galaxy texture:', error);
                    // No fallback - just proceed with black background and stars
                    setStarsVisible(true);
                    animate();

                    // Delay the UI trigger until stars are visible
                    setTimeout(() => {
                        onSkyboxLoadedRef.current();
                    }, 2000);
                }
            );

            // Create star layers with fade-in effect
            const starLayers = [];
            const layerConfigs = [
                // STAR_LAYER_CONFIG.VERY_DISTANT,
                // STAR_LAYER_CONFIG.FAR,
                STAR_LAYER_CONFIG.DISTANT,
                STAR_LAYER_CONFIG.MEDIUM_FAR,
                STAR_LAYER_CONFIG.MEDIUM
            ];

            layerConfigs.forEach(config => {
                const starLayer = createStarLayer(config.count, config.distance, config.size, 0.0);
                starLayer.userData.targetOpacity = config.opacity;
                scene.add(starLayer);
                starLayers.push(starLayer);
            });

            starLayersRef.current = starLayers;

            // Scroll event handler for velocity tracking
            const handleScroll = () => {
                const currentTime = performance.now();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = Math.min(scrollTop / Math.max(documentHeight, 1), 1);

                // Calculate scroll velocity, but only if page is visible
                const deltaTime = currentTime - lastScrollTimeRef.current;
                const deltaScroll = scrollTop - lastScrollPositionRef.current;

                // Prevent velocity accumulation when switching tabs
                if (deltaTime > 0 && deltaTime < 100 && !document.hidden) {
                    const velocity = Math.abs(deltaScroll) / (deltaTime / 1000);
                    scrollVelocityRef.current = velocity;
                } else {
                    // Reset velocity if too much time has passed or tab was hidden
                    scrollVelocityRef.current = 0;
                }

                // Update references for next calculation
                lastScrollTimeRef.current = currentTime;
                lastScrollPositionRef.current = scrollTop;
                scrollProgressRef.current = scrollProgress;
            };

            // Handle window resize
            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;

                camera.aspect = width / height;
                camera.updateProjectionMatrix();

                renderer.setSize(width, height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            };



            // Handle page visibility changes to reset scroll tracking
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    // Reset scroll velocity when tab becomes hidden
                    scrollVelocityRef.current = 0;
                } else {
                    // Reset timing when tab becomes visible again
                    lastScrollTimeRef.current = performance.now();
                    lastScrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
                }
            };

            // Add event listeners
            window.addEventListener('resize', handleResize);
            if (!disableScrollMotion) {
                window.addEventListener('scroll', handleScroll, { passive: true });
            }
            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Initialize scroll tracking
            lastScrollTimeRef.current = performance.now();
            lastScrollPositionRef.current = window.pageYOffset || document.documentElement.scrollTop;
            handleScroll();

            // Store the current mount reference for cleanup
            const currentMount = mountRef.current;

            // Cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                if (!disableScrollMotion) {
                    window.removeEventListener('scroll', handleScroll);
                }
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                cancelAnimationFrame(animationFrameRef.current);

                if (currentMount && renderer) {
                    currentMount.removeChild(renderer.domElement);
                }

                // Clean up Three.js resources
                if (skyboxMesh) {
                    if (skyboxMesh.material.map) {
                        skyboxMesh.material.map.dispose();
                    }
                    skyboxMesh.material.dispose();
                    skyboxMesh.geometry.dispose();
                    if (scene) {
                        scene.remove(skyboxMesh);
                    }
                }

                starLayersRef.current.forEach(starLayer => {
                    if (starLayer) {
                        starLayer.material.dispose();
                        starLayer.geometry.dispose();
                        if (scene) {
                            scene.remove(starLayer);
                        }
                    }
                });

                if (scene) {
                    scene.clear();
                }
                if (renderer) {
                    renderer.dispose();
                }
            };
        };

        // Animation loop
        const animate = () => {
            // Fade in skybox
            if (skyboxMesh && skyboxMesh.material.opacity < 1) {
                skyboxMesh.material.opacity += ANIMATION_CONFIG.skyboxFadeSpeed;
            }

            // Decay scroll velocity when not actively scrolling
            scrollVelocityRef.current *= ANIMATION_CONFIG.velocityDecay;

            // Convert scroll velocity to speed multiplier (restore original values)
            let velocityFactor = 0;
            let scrollAmplification = 2.5;

            if (!disableScrollMotion) {
                velocityFactor = Math.min(scrollVelocityRef.current / ANIMATION_CONFIG.maxVelocity, 1.0);
                scrollAmplification = 2.5 + velocityFactor * 40;
            }

            starLayersRef.current.forEach((starLayer) => {
                if (starLayer && starLayer.userData) {
                    const distance = starLayer.userData.distance;

                    // Handle star fade-in when stars become visible
                    if (starsVisibleRef.current && starLayer.material.opacity < starLayer.userData.targetOpacity) {
                        starLayer.material.opacity += ANIMATION_CONFIG.starFadeSpeed;
                        starLayer.material.opacity = Math.min(starLayer.material.opacity, starLayer.userData.targetOpacity);
                    }

                    // Only animate star movement if animation is enabled
                    if (starsAnimatingRef.current && starLayer.material.opacity > 0) {
                        // Flying through space motion - stars move toward camera (restore original speed)
                        const baseFlightSpeed = 0.7;
                        const flightSpeed = baseFlightSpeed * scrollAmplification;

                        // Update star positions
                        const positions = starLayer.geometry.attributes.position.array;
                        const originalColors = starLayer.userData.originalColors;
                        const ages = starLayer.geometry.attributes.age.array;
                        const colors = starLayer.geometry.attributes.color.array;
                        const deltaTime = 1.0 / 60.0;

                        for (let i = 0; i < positions.length; i += 3) {
                            const starIndex = i / 3; // Get the star index for age array

                            // Move stars toward camera
                            positions[i + 2] += flightSpeed * deltaTime;

                            // If star has passed the camera, redistribute it behind us
                            if (positions[i + 2] > 50) {
                                positions[i] = THREE.MathUtils.randFloatSpread(distance * 2);
                                positions[i + 1] = THREE.MathUtils.randFloatSpread(distance * 2);
                                positions[i + 2] = -distance - (Math.random() * distance);
                                ages[starIndex] = 0.0;
                            }

                            // Update star age and apply fade-in effect
                            ages[starIndex] += deltaTime;
                            const fadeInProgress = Math.min(ages[starIndex] / ANIMATION_CONFIG.fadeInDuration, 1.0);
                            const fadeInAlpha = fadeInProgress * fadeInProgress;

                            // Apply fade-in to star color
                            const colorIndex = i;
                            const originalColorR = originalColors[colorIndex];
                            const originalColorG = originalColors[colorIndex + 1];
                            const originalColorB = originalColors[colorIndex + 2];

                            colors[colorIndex] = originalColorR * fadeInAlpha;
                            colors[colorIndex + 1] = originalColorG * fadeInAlpha;
                            colors[colorIndex + 2] = originalColorB * fadeInAlpha;
                        }

                        // Mark geometry attributes for update
                        starLayer.geometry.attributes.position.needsUpdate = true;
                        starLayer.geometry.attributes.color.needsUpdate = true;
                        starLayer.geometry.attributes.age.needsUpdate = true;
                    }
                }
            });

            renderer.render(scene, camera);
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Initialize the component
        const cleanup = init();

        // Return cleanup function
        return cleanup;
    }, [disableScrollMotion]); // Include disableScrollMotion dependency

    return (
        <div
            ref={mountRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000000', // Ensure black background immediately
                zIndex: -1 // Behind all other content
            }}
        />
    );
};

// PropTypes validation
Starfield.propTypes = {
    onSkyboxLoaded: PropTypes.func,
    disableScrollMotion: PropTypes.bool
};

export default Starfield;
