const URL = "./project-data.json"

class ParentComponent extends HTMLElement {

    static get observedElements() {
        return [];
    }

    async download() {
        var response = await fetch(URL);
        var todos = await response.json();
        console.log(todos);
        return todos;
    }

    constructor() {
        super();
        console.log('HelloComponent constructor');
        this.attachShadow({ mode: 'open' });

        this.download().then(r => {
            const ul = document.createElement('ul');
            this.shadowRoot.appendChild(ul);

            for (const json of r) {
                const child = document.createElement('list-component');
                const li = document.createElement('li');

                child.setAttribute('text', `${json.title}`);
                child.setAttribute('detail', `Description: ${json.description}\nAuthor: ${json.author}\nSubject: ${json.subject}\n`);
                child.addEventListener('list-item-clicked', e => {
                    console.log('list-item-clicked', e.detail.detail, this);
                    document.getElementById('main').innerText = `${e.detail.detail}`;
                });

                li.appendChild(child);
                ul.appendChild(li);
            }
        });
    }

}

customElements.define('parent-component', ParentComponent);
