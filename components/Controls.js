const {requestAnimationFrame, addEventListener} = window

module.exports = (planck) => {
  const vec2 = planck.Vec2

  let Controls = {
    isGoingRight: false,
    isGoingLeft: false
  }

  const runRight = () => {
    const player = planck.player
    let vel = player.getLinearVelocity()
    // console.log(vel)
    vel.x = 10
    player.setLinearVelocity(vel)
    Controls.isGoingRight = true    
  }
  
  const runLeft = () => {
    const player = planck.player
    let vel = player.getLinearVelocity()
    vel.x = -10
    Controls.isGoingLeft = true    
    player.setLinearVelocity(vel)
  }
  
  const jumpUp = (x, y) => {
    const player = planck.player
    const impulse = player.getMass() * 30
    player.applyLinearImpulse(vec2(0, impulse), player.getWorldCenter())
  }
  
  const getControls = () => {
    return keyTracker 
  }

  let keyTracker = {
    37: {
      pressed: false,
      action: runLeft
    },
    38: {
      pressed: false,
      action: jumpUp
    },
    39: {
      pressed: false,
      action: runRight
    }
  }

  const activeKeyCode = (code) => {
    if(keyTracker.hasOwnProperty(code)){      
      keyTracker[code].pressed = true
    }
  }
  
  const deactivateKeyCode = (code) => {
    if(keyTracker.hasOwnProperty(code)){
      keyTracker[code].pressed = false       
    }      
  }
  
  const directionReset = () => {
    Controls.isGoingLeft = false
    Controls.isGoingRight = false
  }


  addEventListener('keydown', (e) => {
    const player = planck.player
    const {x, y} = player.getPosition()
    const {keyCode} = e
    activeKeyCode(keyCode)      
    player.setAwake(true)
  })

  addEventListener('keyup', (e) => {
    const {keyCode} = e
    if(keyCode === 39 || keyCode === 37){
      directionReset()
    }
    deactivateKeyCode(keyCode)
  })

  return {
    controlsLoop: () => {
      const {x, y} = planck.player.getPosition()
    
      for(const key in keyTracker) {
        if(keyTracker[key].pressed){
          keyTracker[key].action(x, y)
        }
      }
    }
  }
}