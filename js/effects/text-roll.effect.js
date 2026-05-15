import { gsap } from 'gsap'

export default {
  mounted(el) {
    const textNodes = Array.from(el.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    )

    let wrapper

    if (textNodes.length > 0) {
      wrapper = document.createElement('span')
      wrapper.style.display = 'inline-block'
      wrapper.style.transformOrigin = 'center center'
      textNodes.forEach(node => wrapper.appendChild(node))
      el.appendChild(wrapper)
    } else {
      wrapper = el.firstElementChild
    }

    if (!wrapper) return

    el.addEventListener('mouseenter', () => {
      if (gsap.isTweening(wrapper)) return

      const tl = gsap.timeline()

      // Sale por la derecha inclinándose
      tl.to(wrapper, {
        x: 30,
        rotationZ: 5,
        duration: 0.22,
        ease: 'power2.in'
      })
      // Teletransporte a la izquierda sin que se vea
      .set(wrapper, {
        x: -30,
        rotationZ: -5,
      })
      // Entra desde la izquierda y se asienta en el centro
      .to(wrapper, {
        x: 0,
        rotationZ: 0,
        duration: 0.38,
        ease: 'back.out(1.5)'
      })
    })
  }
}