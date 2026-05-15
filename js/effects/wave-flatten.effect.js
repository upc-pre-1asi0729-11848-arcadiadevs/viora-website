// src/directives/vWaveFlatten.js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  mounted(el) {
    gsap.set(el, {
      "--wave-height": "15vh"
    })

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