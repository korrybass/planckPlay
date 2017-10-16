const { flipYAxis } = require('../lib/utils')

module.exports = (planck, world) => {
  const vec2 = planck.Vec2
  
  const playerRayCastCallBack = function (fixture, point, normal, fraction) {
    debugger
    console.log(
      'fixture: ' + fixture,
      'point: ' + point,
      'normal: ' + normal,
      'fractin: ' + fraction
    )
  }

  const drawPlayer = (canvas, physicsShape) => {
    const ctx = canvas.getContext("2d")
    const {x, y} = physicsShape.getPosition()
    ctx.beginPath()
    ctx.rect(x,flipYAxis(y, canvas),50,50)
    ctx.stroke()
    ctx.closePath()
  }

  const playerSettings = {
    friction: 30,
    mass: 10
  }
  const playerWidth = 50
  const playerHeight = 50
  const player = world.createDynamicBody(vec2(20,100))
  const playerBox = planck.Box(playerWidth,playerHeight)
  const playerFixture = player.createFixture(playerBox, playerSettings)
  
  player.getPlayerCenter = function () {
    const dimensions = planck.player.getUserData().getDimensions()
    const position = planck.player.getPosition()
    return {
      x: dimensions.width/2 + position.x,
      y: position.y - dimensions.height/2 
    }
  }

  player.setPlayerRayCast = function () {
    const self = this
    const playerCenter = self.getPlayerCenter()
    const dimensions = self.getUserData().getDimensions()
    const rayPoint1 = vec2(playerCenter.x, playerCenter.y)
    const rayPoint2 = vec2( playerCenter.x - dimensions.width/2 - 10, playerCenter.y)
    console.log(rayPoint2)
    playerFixture.rayCast(rayPoint1, rayPoint2, playerRayCastCallBack)      
  }
  
  player.setUserData(
    {
      name: 'player',
      getDimensions: function () {
        return {width: playerWidth, height: playerHeight}
    }
  }
)
  drawPlayer(planck.canvasRef, player)
  player.drawPlayer = drawPlayer
  
  Object.assign(planck, {player})
}