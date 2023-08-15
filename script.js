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

// utility functions
function clamp(min, max, value) {
    if (value < min) return min
    else if (value > max) return max
    else return value
}

// objects
class Circle {
    constructor({position, velocity, radius, color, health}) {
        this.position = position
        this.velocity = velocity
        this.radius = radius
        this.color = color
        this.health = health
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
    constructor({position, velocity, width, height, color, revolutionAngle, revolutionSpeed, hasCollided}) {
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.color = color
        this.revolutionAngle = revolutionAngle
        this.revolutionSpeed = revolutionSpeed
        this.hasCollided = hasCollided
    }
    
    draw() {
        ctx.save()
        ctx.beginPath()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.revolutionAngle)
        ctx.rect(-this.width / 2, 0, this.width, this.height)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
    }

    update() {
        this.draw()

        // update position of knife
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// implementation
let circle
let firstKnife
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
        radius: 100,
        color: '#fdd46d',
        health: 5
    })
    firstKnife = new Knife({
        position: {
            x: canvas.width / 2,
            y: canvas.height - 200
        },
        velocity: {
            x: 0,
            y: 0
        },
        width: 25,
        height: 80,
        color: '#8CAEBE'
    })
    knives = []
    lastRenderTime = 0
}

function gameOver() {
    cancelAnimationFrame(animationId)
}

function spawnKnife() {
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
        height: 80,
        color: '#8CAEBE',
        revolutionAngle: 0,
        revolutionSpeed: 1/4,
        // revolutionSpeed: 1/100,
        hasCollided: false
    }))
}

// animation loop
let animationId
function animate(currentTime) {
    animationId = requestAnimationFrame(animate)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / GAME_SPEED) return
    lastRenderTime = currentTime

    ctx.clearRect(0, 0, innerWidth, innerHeight)

    firstKnife.draw()

    // call game over when circle dies
    if (circle.health == 0) gameOver()

    knives.forEach((knife) => {
        knife.update()
    
        // handle knife / circle collision
        if (knife.position.y - knife.velocity.y < circle.position.y + circle.radius) {
            // update circle health
            if (!knife.hasCollided) circle.health--
            knife.hasCollided = true

            // update revolution angle of knife
            knife.revolutionAngle += knife.revolutionSpeed
            console.log(knife.revolutionAngle)

            // update position of knife
            knife.position.x = circle.position.x + circle.radius * Math.cos(knife.revolutionAngle + Math.PI * 0.5)
            knife.position.y = circle.position.y + circle.radius * Math.sin(knife.revolutionAngle + Math.PI * 0.5)
        }
    })
    circle.update()
}

init()
animate()

addEventListener('click', () => {
    spawnKnife()
})

// addEventListener('keydown', (event) => {
//     if (event.code == 'Space') cancelAnimationFrame(animationId)
// })