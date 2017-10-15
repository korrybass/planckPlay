module.exports = (planck, world) => {
  const vec2 = planck.Vec2  
  const wallLeft = world.createBody()
  const wallRight = world.createBody()
  wallLeft.createFixture(planck.Box(-45,planck.canvasRef.height))
  wallLeft.setPosition(vec2(0, planck.canvasRef.height))
  wallRight.createFixture(planck.Box(0, planck.canvasRef.height))
  wallRight.setPosition(vec2(planck.canvasRef.width, planck.canvasRef.height))
}
