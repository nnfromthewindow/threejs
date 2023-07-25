import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm';
//CLASE DE GUI HELPER
class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
}
/////////////////////


    const canvas = document.querySelector('#c');
    
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
//  renderer.setSize( window.innerWidth, window.innerHeight );

    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 500;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.set(0, 3, 10);
    camera.up.set(0, 0, -1);
    camera.lookAt(0, 0, 0);

//ORBIT CONTROL

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0);
controls.update();


//AXES HELPER
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;


//LOADERS
  const loadManager = new THREE.LoadingManager();
  const textureLoader = new THREE.TextureLoader(loadManager);

  const loader = new FontLoader();

//PLANE

const planeSize = 40;
 
const checkerLoader = new THREE.TextureLoader();
const texture = checkerLoader.load('static/checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
scene.add(mesh);

  // LIGHTS

  /*
  const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);
*/

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);



/*
    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
    dirLight.position.set( 0, 0, 1 ).normalize();
    scene.add( dirLight );

    const pointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );
    //pointLight.color.setHSL( Math.random(), 1, 0.5 );
    pointLight.position.set( 0, 100, 90 );
    scene.add( pointLight );
*/
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    //const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    
    //const material = new THREE.MeshBasicMaterial({map: textureLoader.load('static/wall.jpg')})

    const materials = [
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-1.jpg')}),
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-2.jpg')}),
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-3.jpg')}),
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-4.jpg')}),
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-5.jpg')}),
        new THREE.MeshBasicMaterial({map: textureLoader.load('static/flower-6.jpg')}),
      ];

    const material2 = new THREE.MeshBasicMaterial({color: 0xffffff})
    //const cube = new THREE.Mesh( geometry, material );
    const cube = new THREE.Mesh(geometry, materials);

    const materialText = new THREE.MeshPhongMaterial( { color: 0xffffff } )
    const materialCube2 = new THREE.MeshPhongMaterial( { color: 0xff4400 } )
    const cube2 = new THREE.Mesh(geometry, materialCube2);
    

    cube.position.set(0,5,-5)
    cube2.position.set(-4,3,3)

    scene.add(cube2)

    loadManager.onLoad = () => {
        loadingElem.style.display = 'none';
    //    const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
       // cubes.push(cube);  // add to our list of cubes to rotate
      };

    loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBarElem.style.transform = `scaleX(${progress})`;
    };  
      const loadingElem = document.querySelector('#loading');
      const progressBarElem = loadingElem.querySelector('.progressbar');

    let text
    let car

    cube.add(axes)
    //const helper = new AxisGridHelper(cube, 2);
    //cube.add(helper, 'visible').name("Tierra");

    

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
            text.position.set(4,3,0)
            scene.add(text)
    //     console.log(text)
    } );

    const loaderModel = new GLTFLoader();

    loaderModel.load( 'static/porsche/scene.gltf', function ( gltf ) {
    //    console.log(gltf)
        car = gltf
        car.scene.position.set(-6 ,0,0)
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
cubeWire.position.set(0,1.5,0)
    scene.background = new THREE.Color(0xAAAAAA);
    scene.add( cube );
    scene.add( cubeWire );
    
   // camera.position.z = 8;

//GUI HELPER 

const gui = new GUI();
//gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('skyColor');
gui.addColor(new ColorGUIHelper(light, 'groundColor'), 'value').name('groundColor');
gui.add(light, 'intensity', 0, 2, 0.01);


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
       // cube2.rotation.x += 0.01;
        cube2.rotation.y += 0.01;
      //  cubeWire.rotation.x -= 0.01;
        cubeWire.rotation.y -= 0.01;
        //text.rotation.x -= 0.01;
        if(text) text.rotation.x -= 0.01;
        //  if(car)car.scene.rotation.x -= 0.01;
        if(car)car.scene.rotation.y -= 0.01;

        renderer.render( scene, camera );

        requestAnimationFrame( render );

    }

    requestAnimationFrame( render );  
           