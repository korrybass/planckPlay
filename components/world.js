// World
module.exports = (planck) => {
  const vec2 = planck.Vec2  
  const world = new planck.World({
    gravity: vec2(0,-10)
  })

  return world
} 
