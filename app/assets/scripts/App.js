import "../style/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MoblileMenu";
import Modal from "./modules/Modal";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if (typeof modal == "undefined") {
            import("./modules/Modal")
                .then(x => {
                    let modal = new x.default();
                    setTimeout(() => modal.openModal(), 20)
                })
                .catch(() => console.log('aldaa garlaa'));
        } else {
            modal.openModal()
        }

    })
});
if (module.hot) {
    module.hot.accept();
}