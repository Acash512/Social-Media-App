const ADJECTIVES = [
    'superficial',
    'simplistic',
    'outrageous',
    'tricky',
    'callous',
    'brainy',
    'scandalous',
    'berserk',
    'grumpy',
    'dizzy',
    'venomous',
    'disgusted',
    'reminiscent',
    'whimsical',
    'talented'
]

const OBJECTS = [
    'orangutan',
    'walrus',
    'warthog',
    'skunk',
    'hedgehog',
    'chihuahua',
    'llama',
    'raccoon',
    'canary',
    'panther',
    'hamster',
    'sloth',
    'porcupine',
    'antelope',
    'panda'
]

function genRandomUserName(){
    const adj = ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)] 
    const obj = OBJECTS[Math.floor(Math.random()*OBJECTS.length)]
    return `${adj}-${obj}`
}

module.exports = {
    genRandomUserName
}