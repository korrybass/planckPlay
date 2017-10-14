module.exports = (planck, world) => {
  const groundFD = {
    density : 0.0,
    friction : 0.1
  }
  const ground = world.createBody()
  ground.createFixture(planck.Box(planck.canvasRef.width, 2), groundFD)
}