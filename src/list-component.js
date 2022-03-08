class ListComponent extends HTMLElement {

    #text
    #detail

    static get observedAttributes() {
        return [ 'text', 'detail' ];
    }

    constructor() {
        super();
        console.log('ListComponent constructor');
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        console.log('connected');

        const span = document.createElement('span');
        span.innerText = this.#text;
        this.shadowRoot.appendChild(span);

        this.shadowRoot.addEventListener('click', () => {
            console.log('i was clicked', this);
            const event = new CustomEvent('list-item-clicked', { detail: { detail: this.#detail } });
            this.dispatchEvent(event);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attribute ${name} changed to ${newValue}`);

        switch (name) {
            case 'text':
                this.#text = newValue;
                break;
            case 'detail':
                this.#detail = newValue
                break;
        }
    }

}

customElements.define('list-component', ListComponent);
