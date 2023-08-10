// canvas setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// variables

// event listeners
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
    cancelAnimationFrame(animationId)
})

// objects
class Circle {
    constructor() {
    }

    draw() {
    }

    update() {
        this.draw()
    }
}

class Knife {
    constructor() {
    }

    draw() {
    }

    update() {
        this.draw()
    }
}

// implementation
let objectArray

function init() {
    objectArray = []
    for (let j = 0; j < 50; j++) {
        objectArray.push(new Object())
    }
}

// animation loop
let animationId
function animate() {
    animationId = requestAnimationFrame(animate)

    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let j = 0; j < objectArray.length; j++) {
        objectArray[j].update()
    }
}

init()
animate()