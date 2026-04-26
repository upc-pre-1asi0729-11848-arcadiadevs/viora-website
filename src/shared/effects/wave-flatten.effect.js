// src/directives/vWaveFlatten.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  mounted(el) {
    // 1. Estado Inicial: La ola empieza gigante invadiendo la sección de abajo
    gsap.set(el, {
      "--wave-height": "15vh"
    })

    // 2. Física de aplastamiento progresivo
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 100%", 
        end: "top 0%",    
        scrub: true,       
      },
      "--wave-height": "0vh",
      ease: "none"
    })
  },
  unmounted(el) {
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === el) t.kill()
    })
  }
}