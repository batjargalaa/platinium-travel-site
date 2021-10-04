import { throttle, debounce } from "lodash";
class StickyHeader {
    constructor() {
        this.siteheader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.events()
        this.browserHeigth = window.innerHeight;
        this.previousScrollY = window.scrollY
    }
    events() {
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200))
        window.addEventListener("resize", debounce(() => {
            this.browserHeigth = window.innerHeight;
        }, 300))
    }
    runOnScroll() {
        this.checkScrollDirection();
        if (window.scrollY > 60) {
            this.siteheader.classList.add("site-header--dark")
        } else {
            this.siteheader.classList.remove('site-header--dark')
        }
        this.pageSections.forEach(el => this.calcSection(el))
    }
    calcSection(el) {
        if (window.scrollY + this.browserHeigth > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeigth) * 100;
            if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down') || (scrollPercent < 33 && this.scrollDirection == 'up')) {
                let matchingLink = el.getAttribute('data-matching-link');
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove('is-current-link'));
                document.querySelector(matchingLink).classList.add("is-current-link");
            }
        }
    }
    checkScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY;
    }
}
export default StickyHeader