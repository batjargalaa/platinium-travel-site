import Axios from "axios"
class ClientArea {
    constructor() {
        this.injectHTML();
        this.form = document.querySelector('.client-area__form')
        this.field = document.querySelector('.client-area__input')
        this.contentArea = document.querySelector('.client-area__content-area')
        this.events()
    }
    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendRequest();
        })
    }
    sendRequest() {
        Axios.post("https://priceless-nobel-7fb599.netlify.app/.netlify/functions/secret-page",
            {
                password: this.field.value
            })
            .then(response => {
                this.form.remove();
                this.contentArea.innerHTML = response.data;
            }
            )
            .catch(
                () => {
                    this.contentArea.innerHTML = `
                <p class="client-area__error"> wrong password.Pls try again</p>
                `
                    this.field.value = '';
                    this.field.focus();
                }
            );
    }
    injectHTML() {
        document.body.insertAdjacentHTML('beforeend', `
        <div class="client-area">
        <div class="wrapper wrapper-medium">
          <h2 class="section-title section-title--blue">Specialy user page</h2>
          <form action="" class="client-area__form">
            <input type="text" class="client-area__input" placeholder="Password" name="" id="">
            <button class="btn btn--orange">Login</button>
          </form>
          <div class="client-area__content-area"></div>
        </div>
      </div>
    `
        )
    }
}
export default ClientArea;