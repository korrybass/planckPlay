const { flipYAxis } = require('./utils')
const {requestAnimationFrame} = window
const Controls = require('../components/Controls')

const drawBox = function (canvas, physicsShape) {
  const ctx = canvas.getContext("2d")
  const {x, y} = physicsShape.getPosition()
  ctx.beginPath()
  ctx.rect(x,flipYAxis(y, canvas),50,50)
  ctx.stroke()
  ctx.closePath()
}

module.exports = (planck, world) => {
  //init Controls
  const { controlsLoop } = Controls(planck, planck.player)

  const renderProto = {
    canvasRef: document.getElementById("scene"),
    getContext: function() {
      return this.canvasRef.getContext("2d")
    },
    sceneObjects: {},
    play: function(world) {
      const self = this
      let initialRender = true
      requestAnimationFrame( ( ) => {
        const context = this.getContext()
        context.clearRect(0,0, self.canvasRef.width, self.canvasRef.height)
        let body = world.getBodyList()
        world.step(1 / 10)
        planck.player.drawPlayer(self.canvasRef, body)
        
        while(body.getNext()){
          if (body.getUserData()  && body.getUserData().name === 'player') {
            planck.player.drawPlayer(self.canvasRef, body)
            planck.player.setPlayerRayCast()
          }else{
            drawBox(self.canvasRef, body)
          }
          let fixture = body.getFixtureList()
          // while(fixture && fixture.getNext()){
          //   fixture = fixture.getNext()
          // }
          body = body.getNext()
        }
        controlsLoop()
        planck.play(world)
      })
    }
  }

  return Object.assign(planck, renderProto)
}