class HelloComponent extends HTMLElement {
    #text

    static get observedAttributes() {
        return ['text']
    }

    constructor() {
        super()
        console.log("hello - component()")
        this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
    }

    connectedCallback() {
        console.log("connected")
        let div = document.createElement("div")
        div.setAttribute("id", "mydiv")
        this.shadowRoot.appendChild(div)
        let button = document.createElement("button");
        button.setAttribute("id", "button");
        button.innerHTML = this.#text;
        div.appendChild(button);
        button.addEventListener("click", () => {
            console.log("Ich wurde geklicked");
            const event = new CustomEvent("button-clicked", {detail: {text: this.#text}});
            this.dispatchEvent(event);
        });
        //div.innerHTML = "hello, world"
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attribute ${name} changed to ${newValue}`);
        if (name === "text") {
            const button = this.shadowRoot.getElementById("button");
            console.log("attributeChanged() callback changed", newValue, button);
            this.#text = newValue;
        }
    }
}

customElements.define("hello-component", HelloComponent)
