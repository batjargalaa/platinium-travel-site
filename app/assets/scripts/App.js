import "../style/styles.css";
import MobileMenu from "./modules/MoblileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
// if (module.hot) {
//     module.hot.accept();
// }