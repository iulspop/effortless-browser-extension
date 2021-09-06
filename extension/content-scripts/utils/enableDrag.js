export function enableDrag({enableX = true, enableY = true}) {
  return (e) => {
    let element = e.currentTarget
    element.style.cursor = 'grabbing'

    let mouseOffsetX = e.offsetX
    let mouseOffsetY = e.offsetY

    let outboundsX = window.innerWidth  - element.offsetWidth
    let outboundsY = window.innerHeight - element.offsetHeight

    const updatePosition = (e) => {
      e.preventDefault() // Prevents highlighting text when dragging

      let newX = e.clientX - mouseOffsetX
      let newY = e.clientY - mouseOffsetY

      if (newX < 0)          { newX = 0 }
      if (newX > outboundsX) { newX = outboundsX }
      if (newY < 0)          { newY = 0 }
      if (newY > outboundsY) { newY = outboundsY }

      if ( enableX === true ) { element.style.left = String(newX) + 'px' }
      if ( enableY === true ) { element.style.top  = String(newY) + 'px' }
    }

    window.addEventListener('mousemove', updatePosition)

    window.addEventListener('mouseup', function cleanUp() {
      window.removeEventListener('mousemove', updatePosition)
      element.style.cursor = 'grab'
      window.removeEventListener('mouseup', cleanUp)
    })
  }
}