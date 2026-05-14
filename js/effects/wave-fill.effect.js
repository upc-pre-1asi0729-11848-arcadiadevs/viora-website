export default {
  mounted(el, binding) {
    el.style.position = 'relative'
    el.style.overflow = 'hidden'

    const wave = document.createElement('span')
    const easing = 'cubic-bezier(0.36, 0, 0.24, 1)'
    
    wave.style.backgroundColor = binding.value || '#1C1D20'
    wave.style.position = 'absolute'
    wave.style.width = '250%'
    wave.style.aspectRatio = '1 / 1'
    wave.style.borderRadius = '50%'
    wave.style.zIndex = '0'
    wave.style.pointerEvents = 'none'
    wave.style.left = '50%'
    wave.style.top = '100%'
    wave.style.transform = 'translate(-50%, 0)'
    wave.style.transition = 'none'

    el.appendChild(wave)

    el.addEventListener('mouseenter', () => {
      wave.style.transition = `transform 0.5s ${easing}, top 0.5s ${easing}`
      wave.style.top = '50%'
      wave.style.transform = 'translate(-50%, -50%)'
    })

    el.addEventListener('mouseleave', () => {
      wave.style.transition = `transform 0.5s ${easing}, top 0.5s ${easing}`
      wave.style.top = '0%'
      wave.style.transform = 'translate(-50%, -100%)'

      setTimeout(() => {
        wave.style.transition = 'none'
        wave.style.top = '100%'
        wave.style.transform = 'translate(-50%, 0)'
      }, 500)
    })
  }
}