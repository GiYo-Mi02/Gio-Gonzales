import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register all plugins once — every component imports gsap from here
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export { ScrollTrigger, Flip };
export default gsap;
