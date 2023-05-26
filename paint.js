const rectButton = document.querySelector('.rect')
const circleButton = document.querySelector('.circle')
const pickButton = document.querySelector('.pick')
const CANVAS = document.querySelector('.canvas')
let editor = document.querySelector('.highlight')
let movePoint = document.querySelector('.cm')
let rectMode = false
let circleMode = false
let pickMode = false
let moveMode = false
let canvasON = false

rectButton.addEventListener('click', () => {
    rectMode = !rectMode
    if(rectMode) {
        rectButton.style.backgroundColor = 'white'
        circleButton.style.backgroundColor = 'blue'
        pickButton.style.backgroundColor = 'blue'
        circleMode = false
        pickMode = false
    } else {
        console.log(rectArr);
        rectButton.style.backgroundColor = 'blue' 
        rectArr = rectArr.filter(rect => rect.clientWidth > 1)
        rectArr.forEach((rect, i) => rect.className = `newRect${i}`)
        console.log(rectArr);
    }
})

circleButton.addEventListener('click', () => {
    circleMode = !circleMode
    if(circleMode) {
        circleButton.style.backgroundColor = 'white'
    } else {
        console.log(circleArr);
        circleButton.style.backgroundColor = 'blue' 
        circleArr = circleArr.filter(circle => circle.clientWidth > 1)
        circleArr.forEach((circle, i) => circle.className = `newcircle${i}`)
        console.log(circleArr);
    }
})

pickButton.addEventListener('click', e => {
    pickMode = !pickMode
    rectMode = false
    circleMode = false
    circleButton.style.backgroundColor = 'blue' 
    rectButton.style.backgroundColor = 'blue' 
    if(pickMode) {
        pickButton.style.backgroundColor = 'white'
        document.querySelector('body').style.cursor = 'grab'
        rectArr.forEach((rect, i) => {
            rect.addEventListener('click', () => {
                editor.style.display = 'block'
                editor.style.top = rect.style.top
                editor.style.left = rect.style.left
                editor.style.width = rect.style.width
                editor.style.height = rect.style.height
                
                movePoint.addEventListener('mousedown', e => {
                    moveMode = true
                    rectArr[i].inert = true
                })

                CANVAS.addEventListener('mousemove', e => {
                    if(moveMode && rectArr[i].inert){
                        editor.style.left = `${e.pageX-(rectArr[i].clientWidth/2)}px`
                        editor.style.top = `${e.pageY-(rectArr[i].clientHeight/2)}px`
                        rectArr[i].style.left = editor.style.left
                        rectArr[i].style.top = editor.style.top
                        console.log('e.pageX:', e.pageX, 'e.pageY:', e.pageY)
                    }
                })
                
                CANVAS.addEventListener('mouseup', () => {
                    moveMode = false
                    rectArr[i].inert = false
                })
            })
        })
    } else {
        pickButton.style.backgroundColor = 'blue'
    }
})



let newRect
let newCircle
let startX
let startY
let rectArr = []
let circleArr = []

CANVAS.addEventListener('mousedown', e => {
    if(rectMode) {
        canvasON = true
        newRect = document.createElement('div')
        newRect.className = `newRect${rectArr.length}`
        newRect.style.position = 'absolute'
        newRect.style.backgroundColor = 'red'
        startX = e.clientX
        startY = e.clientY
        newRect.style.left = `${startX}px`
        newRect.style.top = `${startY}px`
        document.querySelector('.canvas').appendChild(newRect)
        rectArr.push(newRect)
    } else if(circleMode){
        canvasON = true
        newCircle = document.createElement('div')
        newCircle.className = `newCircle${circleArr.length}`
        newCircle.style.position = 'absolute'
        newCircle.style.backgroundColor = 'red'
        newCircle.style.borderRadius = '50%'
        startX = e.clientX
        startY = e.clientY
        newCircle.style.left = `${startX}px`
        newCircle.style.top = `${startY}px`
        document.querySelector('.canvas').appendChild(newCircle)
        circleArr.push(newCircle)
    }
})


CANVAS.addEventListener('mouseup', () => {
    if(rectMode) {
        canvasON = false
    } else if(circleMode) {
        canvasON = false
    }
})

CANVAS.addEventListener('mousemove', e => {
    if(canvasON && rectMode) {
        newRect.style.width = `${e.clientX - startX}px`
        newRect.style.height = `${e.clientY - startY}px`
        if(e.clientY < startY) {
            newRect.style.top = `${e.clientY}px`
            newRect.style.height = `${startY - e.clientY}px`
        } 
        else if(e.clientX < startX) {
            newRect.style.left = `${e.clientX}px`
            newRect.style.width = `${startX - e.clientX}px`
        } 
        else if(e.clientX < startX && e.clientY < startY) {
            newRect.style.top = `${e.clientY}px`
            newRect.style.height = `${startY - e.clientY}px`
            newRect.style.left = `${e.clientX}px`
            newRect.style.width = `${startX - e.clientX}px`
        }
    } else if(canvasON && circleMode) {
        newCircle.style.width = `${e.clientX - startX}px`
        newCircle.style.height = `${e.clientY - startY}px`
        if(e.clientY < startY) {
            newCircle.style.top = `${e.clientY}px`
            newCircle.style.height = `${startY - e.clientY}px`
        } 
        else if(e.clientX < startX) {
            newCircle.style.left = `${e.clientX}px`
            newCircle.style.width = `${startX - e.clientX}px`
        } 
        else if(e.clientX < startX && e.clientY < startY) {
            newCircle.style.top = `${e.clientY}px`
            newCircle.style.height = `${startY - e.clientY}px`
            newCircle.style.left = `${e.clientX}px`
            newCircle.style.width = `${startX - e.clientX}px`
        }
    }
})

