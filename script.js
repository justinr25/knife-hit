// canvas setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// variables
const GAME_SPEED = 60

// event listeners
addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
    cancelAnimationFrame(animationId)
})

// objects
class Circle {
    constructor({position, velocity, radius, color}) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()
    }
}

class Knife {
    constructor({position, velocity, width, height, color}) {
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.color = color
    }
    
    draw() {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update() {
        this.draw()

        // update position of knife
        this.position.y += this.velocity.y
    }
}

// implementation
let circle
let knives
let lastRenderTime

function init() {
    circle = new Circle({ 
        position: {
            x: canvas.width / 2,
            y: canvas.height / 2 - 150
        },
        velocity: {
            x: 0,
            y: 0
        },
        radius: 150,
        color: '#fdd46d'
    })
    knives = [new Knife({
        position: {
            x: canvas.width / 2,
            y: canvas.height - 200
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 25,
        height: 100,
        color: '#8CAEBE'
    })]
    lastRenderTime = 0
}

// animation loop
let animationId
function animate(currentTime) {
    animationId = requestAnimationFrame(animate)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / GAME_SPEED) return
    lastRenderTime = currentTime

    ctx.clearRect(0, 0, innerWidth, innerHeight)

    circle.update()
    knives.forEach((knife) => {
        knife.update()
    })
    console.log(knives)
}

init()
animate()

addEventListener('click', () => {
    knives.push(new Knife({
        position: {
            x: canvas.width / 2,
            y: canvas.height - 200
        },
        velocity: {
            x: 0,
            y: -70
        },
        width: 25,
        height: 100,
        color: '#8CAEBE'

    }))
})