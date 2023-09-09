"use client";

import * as THREE from "three";
import { AnaglyphEffect } from "./AnaglyphEffect.js";
import { useEffect, useRef } from "react";

export const CubeFieldViewPort = () => {
	const mountRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const { current } = mountRef;

		if (!current) {
			return;
		}

		const mouse = new THREE.Vector2();
		let container,
			camera: THREE.PerspectiveCamera,
			scene: THREE.Scene,
			renderer: THREE.WebGLRenderer,
			effect: {
				setSize: (arg0: number, arg1: number) => void;
				render: (arg0: THREE.Scene, arg1: THREE.PerspectiveCamera) => void;
			};

		const spheres: any[] = [];

		let mouseX = 0;
		let mouseY = 0;

		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;

		document.addEventListener("mousemove", onDocumentMouseMove);

		const init = () => {
			container = current;
			// container = document.createElement("div");
			// document.body.appendChild(container);

			camera = new THREE.PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				0.01,
				100
			);
			camera.position.z = 3;

			const path = "assets/pisa/";
			const format = ".png";
			const urls = [
				path + "px" + format,
				path + "nx" + format,
				path + "py" + format,
				path + "ny" + format,
				path + "pz" + format,
				path + "nz" + format
			];

			const textureCube = new THREE.CubeTextureLoader().load(urls);

			scene = new THREE.Scene();
			scene.background = textureCube;

			const geometry = new THREE.SphereGeometry(0.1, 32, 16);
			const material = new THREE.MeshBasicMaterial({
				color: 0xffffff,
				envMap: textureCube
			});

			for (let i = 0; i < 200; i++) {
				const mesh = new THREE.Mesh(geometry, material);

				mesh.position.x = Math.random() * 10 - 5;
				mesh.position.y = Math.random() * 10 - 5;
				mesh.position.z = Math.random() * 10 - 5;

				mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

				scene.add(mesh);

				spheres.push(mesh);
			}

			//

			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio(window.devicePixelRatio);
			container.appendChild(renderer.domElement);

			const width = window.innerWidth || 2;
			const height = window.innerHeight || 2;

			effect = new AnaglyphEffect(renderer);
			effect.setSize(width, height);

			//

			window.addEventListener("resize", onWindowResize);
		};

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			effect.setSize(window.innerWidth, window.innerHeight);
		}

		function onDocumentMouseMove(event: { clientX: number; clientY: number }) {
			mouseX = (event.clientX - windowHalfX) / 100;
			mouseY = (event.clientY - windowHalfY) / 100;
		}

		//

		const animate = () => {
			requestAnimationFrame(animate);

			render();
		};

		function render() {
			const timer = 0.0001 * Date.now();

			camera.position.x += (mouseX - camera.position.x) * 0.05;
			camera.position.y += (-mouseY - camera.position.y) * 0.05;

			camera.lookAt(scene.position);

			for (let i = 0, il = spheres.length; i < il; i++) {
				const sphere = spheres[i];

				sphere.position.x = 5 * Math.cos(timer + i);
				sphere.position.y = 5 * Math.sin(timer + i * 1.1);
			}

			effect.render(scene, camera);
		}

		init();
		animate();

		return () => {
			document.removeEventListener("mousemove", onDocumentMouseMove);
			window.removeEventListener("resize", onWindowResize);
			// current.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div
			ref={mountRef}
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: 0,
				left: 0,
				zIndex: -1,
				opacity: 1
			}}
		></div>
	);
};
