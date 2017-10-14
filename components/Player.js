const { flipYAxis } = require('../lib/utils')

module.exports = (planck, world) => {
  const vec2 = planck.Vec2  
  
  const drawPlayer = (canvas, physicsShape) => {
    const ctx = canvas.getContext("2d")
    const {x, y} = physicsShape.getPosition()
    ctx.beginPath()
    ctx.rect(x,flipYAxis(y, canvas),50,50)
    // base_image = new Image()
    // base_image.src = 'img/icon.png'
    // ctx.drawImage(base_image, x, flipYAxis(y, canvas), 50, 50)
    ctx.stroke()
    ctx.closePath()
  }

  const playerSettings = {
    friction: 30,
    mass: 30
  }
  const player = world.createDynamicBody(vec2(20,100))
  const playerFixture = player.createFixture(planck.Box(50,50), playerSettings)
  
  player.setUserData({name: 'player'})
  drawPlayer(planck.canvasRef, player)
  player.drawPlayer = drawPlayer
  
  Object.assign(planck, {player})
}