import "../style/styles.css";
import "lazysizes";
import MobileMenu from "./modules/MoblileMenu";
import Modal from "./modules/Modal";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
import ClientArea from "./modules/ClientArea";
// end reacttai holbootoi code baina
import React from "react";
import ReactDOM from "react-dom";
function MyReactComponent() {
    return (
        <div>
            <h1>This is react component</h1>
            <p>React is awesome</p>
        </div>
    )
}
ReactDOM.render(<MyReactComponent />, document.querySelector("#my-react-example"))
new ClientArea();
let mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if (typeof modal == "undefined") {
            import(/* webpackChunkName: "modal" */"./modules/Modal")
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