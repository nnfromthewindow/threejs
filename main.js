import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    const canvas = document.querySelector('#c');
    
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
//  renderer.setSize( window.innerWidth, window.innerHeight );

    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// LIGHTS

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
    //pointLight.color.setHSL( Math.random(), 1, 0.5 );
    pointLight.position.set( 0, 100, 90 );
    scene.add( pointLight );

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    //const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88})
    const material2 = new THREE.MeshBasicMaterial({color: 0xffffff})
    const cube = new THREE.Mesh( geometry, material );
    const materialText = new THREE.MeshPhongMaterial( { color: 0xffffff } )

    const loader = new FontLoader();

    let text
    let car


    loader.load( 'fonts/Pacifico_Regular.json', function ( font ) {

        const textGeometry = new TextGeometry( 'three.js', {
            font: font,
            size: 1,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.001,
            bevelSize: 0.001,
            bevelOffset: 0,
            bevelSegments: 5
        } );

            text = new THREE.Mesh( textGeometry, materialText );
            text.position.set(1,0,0)
            scene.add(text)
    //     console.log(text)
    } );

    const loaderModel = new GLTFLoader();

    loaderModel.load( 'static/porsche/scene.gltf', function ( gltf ) {
    //    console.log(gltf)
        car = gltf
        car.scene.position.set(-3,0,0)
        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );


    const size = 3;
const widthSegments = 3;
const heightSegments = 3;
const depthSegments = 3;
const boxGeometry = new THREE.BoxGeometry(
    size, size, size,
    widthSegments, heightSegments, depthSegments);

const geometry2 = new THREE.EdgesGeometry(boxGeometry);

const material3 = new THREE.LineBasicMaterial({color: 0x000000});
const cubeWire = new THREE.LineSegments(geometry2, material3);

    scene.background = new THREE.Color(0xAAAAAA);
    scene.add( cube );
    scene.add( cubeWire );
    
    camera.position.z = 8;



//RESIZE RENDER
    
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

//RENDER FUNCTION    
    function render( time ) {

        time *= 0.01;

        if ( resizeRendererToDisplaySize( renderer ) ) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

        }

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cubeWire.rotation.x -= 0.01;
        cubeWire.rotation.y -= 0.01;
        //text.rotation.x -= 0.01;
        if(text) text.rotation.x -= 0.01;
        //  if(car)car.scene.rotation.x -= 0.01;
        if(car)car.scene.rotation.z -= 0.01;

        renderer.render( scene, camera );

        requestAnimationFrame( render );

    }

    requestAnimationFrame( render );  
           