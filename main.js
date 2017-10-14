const planck = require('planck-js')
const World = require('./components/world')(planck)
const Renderer = require('./lib/Renderer')(planck, World)
const Walls = require('./components/Walls')(planck, World)
const Ground = require('./components/Ground')(planck, World)
const Player = require('./components/Player')(planck, World)

planck.play(World)