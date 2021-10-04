import { throttle, debounce } from "lodash";
class RevealOnScroll {
    constructor(els, revealPoint) {
        this.itemsToReveal = els;
        this.revealPoint = revealPoint;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCalller, 200).bind(this);
        this.events();
        this.browserHeigth = window.innerHeight;
    }
    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log('resize window height')
            this.browserHeigth = window.innerHeight;
        }, 300))
    }
    calcCalller() {
        console.log('scroll')
        this.itemsToReveal.forEach(el => {
            if (!el.isRevealed) {
                this.calculateIfScrolledTo(el);
            }
        })
    }
    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeigth > el.offsetTop) {
            console.log('calc')
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeigth) * 100;
            if (scrollPercent < this.revealPoint) {
                el.classList.add("reveal-item--is-visible")
                el.isRevealed = true;
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }
    hideInitially() {
        this.itemsToReveal.forEach((el) => {
            el.classList.add("reveal-item")
            el.isRevealed = false;
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }

}
export default RevealOnScroll