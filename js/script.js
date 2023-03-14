/////////////////////////////////////////////////////////////////////////
///// DIV WRAPPER CREATION TO HOLD THREEJS EXPERIENCE
const mapwrapper = document.querySelector('#map-wrapper');
let mapwrapper_h = mapwrapper.getBoundingClientRect().height;
let mapwrapper_w = mapwrapper.getBoundingClientRect().width; 

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(mapwrapper_w, mapwrapper_h) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
mapwrapper.appendChild(renderer.domElement) // add the renderer to html div

/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const camera = new THREE.PerspectiveCamera(1, mapwrapper_w / mapwrapper_h, 1, 1000)
camera.position.set(35, 50, 150)
scene.add(camera)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE RESPONSIVE ON RESIZE
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    mapwrapper_h = mapwrapper.getBoundingClientRect().height; // get resized wrapper height
    mapwrapper_w = mapwrapper.getBoundingClientRect().width; // get resized wrapper width
    camera.aspect = mapwrapper_w / mapwrapper_h; // reset the aspect ratio
    camera.updateProjectionMatrix(); // update with the new aspect ratio
    renderer.setSize(mapwrapper_w, mapwrapper_h) // make it full sized to the wrapper
    mapwrapper.appendChild(renderer.domElement) // add the renderer to html div
}

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
//OrbitControls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.update();

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 2)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 2)
sunLight.position.set(-69, 44, 14)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
const loader = new THREE.GLTFLoader();
loader.load('models/gltf/CampusRender2.glb', handle_load);
let mesh;
function handle_load(gltf) {
    mesh = gltf.scene;
    scene.add(mesh);
}


/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    controls.enabled = false //disable orbit controls to animate the camera

    new TWEEN.Tween(camera.position.set(35, 50, 150)).to({ // from camera position
        x: 55, //desired x position to go
        y: 45, //desired y position to go
        z: 55 //desired z position to go
    }, 6500) // time take to animate
        .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}

introAnimation() // call intro animation on start

/////////////////////////////////////////////////////////////////////////
//// DEFINE ORBIT CONTROLS LIMITS
function setOrbitControlsLimits() {
    controls.enableDamping = true
    controls.dampingFactor = 0.04
    controls.minDistance = 0
    controls.maxDistance = 99999
    controls.enableRotate = true
    controls.enableZoom = true
    controls.maxPolarAngle = 180 // Math.PI /2.5
}

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function renderLoop() {
    TWEEN.update() // update animations
    controls.target.set(0, .4, 0)
    controls.update() // update orbit controls
    renderer.render(scene, camera) // render the scene using the camera
    requestAnimationFrame(renderLoop) //loop the render function
}

renderLoop() //start rendering

/////////////////////////////////////////////////////////////////////////
//// BUTTON: CONSOLE.LOG THE CAM POSITION
const button_camposition = document.querySelector('#camposition')
camposition.onclick = function () {
    console.log(camera.position)
    console.log(controls.target)
}

// LOCATION NOTES
// Home: x: -8.095036266101356, y: 10.908493092719864, z: -3.7950691743832476
// Cafeteria: x: -8.095036266101356, y: 10.908493092719864, z: -3.7950691743832476
// Mokihana: x: 0.4899505199785652, y: 0.4675704629309256, z: 1.5217625611973327

/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO HOME
function goToHome() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 54, //desired x position to go
        y: 43, //desired y position to go
        z: 54 //desired z position to go

    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}
const button_home = document.querySelector('#home')
button_home.onclick = function () {
    goToHome()
}

/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO TO CAFETERIA
function goToCafeteria() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: -8.095036266101356, //desired x position to go
        y: 10.908493092719864, //desired y position to go
        z: -3.7950691743832476 //desired z position to go

    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })
}
const button_cafeteria = document.querySelector('#cafeteria')
button_cafeteria.onclick = function () {
    goToCafeteria()
}


/////////////////////////////////////////////////////////////////////////
//// BUTTON: GO TO MOKIHANA
function goToMokihana() {
    controls.enabled = false //disable orbit controls to animate the camera
    new TWEEN.Tween(camera.position).to({ // from camera position
        x: 0.4899505199785652, //desired x position to go
        y: 0.4675704629309256, //desired y position to go
        z: 1.5217625611973327 //desired z position to go
    }, 2000) // time take to animate
        .delay(0).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
            setOrbitControlsLimits() //enable controls limits
            TWEEN.remove(this) // remove the animation from memory
        })

    // VIA GSAP
    // setTimeout( function() {
    //     gsap.to( camera, {
    //         duration: 2,
    //         zoom: 2,
    //         onUpdate: function () {
    //             camera.updateProjectionMatrix();
    //         }
    //     } );
    //     gsap.to( controls.target, {
    //         duration: 2,
    //         x: .7,
    //         y: 1.3,
    //         z: 3.6,
    //         onUpdate: function () {
    //             controls.update();
    //         }
    //     } );
    // }, 2000 )

}
const button_mokihana = document.querySelector('#mokihana')
button_mokihana.onclick = function () {
    goToMokihana()
}