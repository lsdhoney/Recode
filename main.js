//example from https://dev.to/maniflames/pointcloud-effect-in-three-js-3eic

window.addEventListener('load', init)



let mesh

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)

camera.position.set(0, 0, 300)

let renderer = new THREE.WebGLRenderer({
  //canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true

let controls = new THREE.OrbitControls(camera,renderer.domElement)
  //controls.enableZoom = false
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.maxDistance = 2000;
  controls.update();

function init() {
  
  loadModel();
  addLights();

  scene.add(new THREE.AmbientLight(0x404040)) 
  
  
}

function loadModel(){
  const loader = new THREE.OBJLoader()
  for (let i=0; i<3; i++){
    for (let j=0; j<3; j++){
      for (let k=0; k<3;k++){
        loader.load('assets/YC.obj',
        (obj) => {
              
              let material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.025 })
              mesh = new THREE.Points(obj.children[0].geometry, material)
              mesh.position.y = -80 +i*50
              mesh.position.x = -50 +j*50
              mesh.position.z = -50 +k*100
              scene.add(mesh)    
          },
        (xhr) => {
            console.log(xhr)
        },
        (err) => {
            console.error("loading .obj went wrong, ", err)
          }
       )
      }
   
    }
    
}
}



  document.body.appendChild(renderer.domElement)
  

function animate() {


  requestAnimationFrame(animate)
  controls.update();   
  renderer.render(scene, camera);

}

animate()

