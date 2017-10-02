const planck = require('planck-js')
const vec2 = planck.Vec2
const {requestAnimationFrame, addEventListener} = window

const drawPlayer = (name, ctx, physicsShape) => {
  const {x, y} = physicsShape.getPosition()
  ctx.beginPath()
  ctx.rect(x,flipYAxis(y),10,10)
    base_image = new Image()
  base_image.src = 'img/icon.png'
  ctx.drawImage(base_image, x, flipYAxis(y), 50, 50)
  // ctx.stroke()
  ctx.closePath()
  ctx.name = name
  planck.Renderer.addObject(ctx)
}

const flipYAxis = (ycoor, ctx) => document.getElementById("scene").height - ycoor


planck.Renderer = {
  canvasRef: document.getElementById("scene"),
  getContext: function() {
    return this.canvasRef.getContext("2d")
  },
  sceneObjects: {},
  addObject: function(obj) {
    this.sceneObjects[obj.name] = obj
  },
  play: function(world) {
    const self = this
    requestAnimationFrame( ( ) =>{
      const context = this.getContext()
      context.clearRect(0,0, self.canvasRef.width, self.canvasRef.height)
      let body = world.getBodyList()
      const objKey = body.getUserData().name
      drawPlayer(objKey, context, body)
      world.step(1 / 10)
      
      // while(body.getNext()){
      //   let fixture = body.getFixtureList()
      //   while(fixture && fixture.getNext()){
      //     fixture = fixture.getNext()
      //   }
      //   body = body.getNext()        
      // }
      planck.Renderer.play(world)
    })
  }
}

// World
const world = new planck.World({
  gravity: vec2(0,-10)
})

// Walls
const wallLeft = world.createBody()
const wallRight = world.createBody()
wallLeft.createFixture(planck.Box(0,planck.Renderer.canvasRef.height))
wallLeft.setPosition(vec2(0, planck.Renderer.canvasRef.height))
wallRight.createFixture(planck.Box(0, planck.Renderer.canvasRef.height))
wallRight.setPosition(vec2(planck.Renderer.canvasRef.width, planck.Renderer.canvasRef.height))

// Ground
const groundFD = {
  density : 0.0,
  friction : 0.1
};
const ground = world.createBody()
ground.createFixture(planck.Box(planck.Renderer.canvasRef.width, 2), groundFD)

// Player Box
const playerSettings = {
  friction: 30
}
const player = world.createDynamicBody(vec2(0,100))
const playerFixture = player.createFixture(planck.Box(50,50), playerSettings)
player.setUserData({name: 'box'})
const context = planck.Renderer.canvasRef
drawPlayer(player.getUserData().name, context.getContext("2d"), player)

planck.Renderer.play(world)

// Controls
let Controls = {
  isGoingRight: false,
  isGoingLeft: false
}

const directionReset = () => {
  Controls.isGoingLeft = false
  Controls.isGoingRight = false
}

addEventListener('keydown', (e) => {
  const {x, y} = player.getPosition()
  const {keyCode} = e
  player.setAwake(true)
  if (keyCode === 39) { // right
    Controls.isGoingRight = true    
    player.setLinearVelocity(vec2(0, 0))    
    player.applyForce(vec2(300, y), player.getWorldCenter())
  }
  if (keyCode === 37) { // left
    Controls.isGoingLeft = true    
    player.setLinearVelocity(vec2(0, 0))
    player.applyForce(vec2(-300, y), player.getWorldCenter())
  }
  if (keyCode === 38) { // up
    if(Controls.isGoingLeft){
      player.applyForce(vec2(-x, 400), player.getWorldCenter())
    } else {
      player.applyForce(vec2(x, 400), player.getWorldCenter())
    }
  }
})

addEventListener('keyup', (e) => {
  const {keyCode} = e
  if(keyCode === 39 || keyCode === 37){
    directionReset()
  }
})