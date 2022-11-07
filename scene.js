import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js";
import { OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js";

// create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#5794C7');

// create camera
const camera = new THREE.PerspectiveCamera( 
    45, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
    );

    camera.position.z = 4;

  
// render
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    // controls
const controls = new OrbitControls( camera, renderer.domElement );

    // snowball
    const snow = new THREE.SphereGeometry(0.25, 32, 16);
    const snowMaterial = new THREE.MeshPhongMaterial({color:'#7edfe6', emissive: '#391c7e', specular: '#7e94e5', shininess: 70});

    let snowBall, i;
    let snowBody = [];
    for (let i = 0; i < 3; i ++){
        snowBall = new THREE.Mesh(snow, snowMaterial);
        snowBall.position.y = i / 2;
        snowBody.push (snowBall)

        const body = new THREE.Group();
        body.add(snowBall)
        scene.add(body) 
        body.position.y = -0.5;
       
    }
    // making a carrot nose


const noseShape = new THREE.ConeGeometry(0.05, 0.18, 20, 16);
const noseColor = new THREE.MeshPhongMaterial({color:'#BF6640', emissive:'#1e1b09', specular:'#abcfeb', shininess: 50});

const nose = new THREE.Mesh(noseShape, noseColor)
nose.position.z = 0.3;
nose.position.y = 1;
nose.rotation.x = 1.5;

// scene.add(nose);

// making eyes


const eyeBalls = new THREE.SphereGeometry(0.02, 32, 16);
const eyeColor = new THREE.MeshPhongMaterial({color: 'black', emissive:'#000000', specular:'#2f4ce8', shininess: 50});

const eyeL = new THREE.Mesh(eyeBalls, eyeColor);
eyeL.position.z = 0.22;
eyeL.position.x = -0.1;
eyeL.position.y = 1.1;

const eyeR = new THREE.Mesh(eyeBalls, eyeColor);
eyeR.position.z = 0.22;
eyeR.position.x = 0.1;
eyeR.position.y = 1.1;
// scene.add(eyeL, eyeR)

// mouth

const mouthShape = new THREE.TorusGeometry(0.5/5, 0.08/5, 16, 50, -3)
const mouthColor = new THREE.MeshBasicMaterial({color: '#D088D7'})

const mouth = new THREE.Mesh(mouthShape, mouthColor)
mouth.position.y = 0.95;
mouth.position.z = 0.25;
// scene.add(mouth)

// hat
const hatTop = new THREE.CylinderGeometry(0.17, 0.17, 0.35, 32)
const hatBottom = new THREE.BoxGeometry(0.5, 0.05, 0.5)

const hatColor = new THREE.MeshPhongMaterial({color:'#6672CC', emissive:"#000000", specular:"#dc8ce7", shininess: 70})

const hat = new THREE.Mesh(hatTop, hatColor)
const brim = new THREE.Mesh(hatBottom,hatColor)
brim.position.y = 1.25;
hat.position.y = 1.45;
// scene.add(hat, brim)


//arms
const arm = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 32)
const stickColor = new THREE.MeshPhongMaterial({color:'#4D2A19', emissive:"#000000", specular:'white', shininess: 50})
const armL = new THREE.Mesh(arm, stickColor)
const armR = new THREE.Mesh(arm, stickColor)
armL.position.y = 0.6;
armL.position.x = -0.25;
armL.rotation.z = 1;

armR.position.y = 0.6;
armR.position.x = 0.25;
armR.rotation.z = -1;

// scene.add(armL, armR)

const bodyParts = new THREE.Group();
bodyParts.add(nose, mouth, eyeL, eyeR, hat, brim, armL, armR,);
bodyParts.position.y = -0.5
scene.add(bodyParts)


// buttons 
const button = new THREE.SphereGeometry(0.05, 32, 16)
const buttonMaterial = new THREE.MeshPhongMaterial({color: 'black', emissive:'#000000', specular:'#2f4ce8', shininess: 50})

let n;

let coals = []
let buttons;


// make them a group so that you can move the whole thing

for (let n = 0; n < 3;n++) {
 buttons = new THREE.Mesh(button, buttonMaterial)
    buttons.position.z = 0.25
    buttons.position.y = n / 6
   

    coals.push(buttons)

const group = new THREE.Group();
group.add(buttons)
scene.add(group)
group.position.y = -0.15;

}

    // lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040,2);
    directionalLight.position.set(1, 1, 1);

    const directLighttwo = new THREE.DirectionalLight(0x404040,2);
    directLighttwo.position.set(-100, 1, 10);
    scene.add(directionalLight, directLighttwo);



    function animate(){
        // redBox.rotation.x += 0.01
        // redBox.rotation.y += 0.01
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }

    animate();
  
window.addEventListener('resize', onWindowResize )

function onWindowResize(){
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
}





