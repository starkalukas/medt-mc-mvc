import "./parent-component.js"
import "./hello-component.js"
import "./list-component.js"

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded")
    let content = document.getElementById("main")
    let button = document.getElementById("button")
    button.addEventListener("click", () => {
        content.innerHTML = "my super content!"
        let helloComponent = document.querySelector("hello-component")
        helloComponent.setAttribute("text", "mein neuer Text")
        const myDiv = document.getElementById("myDiv");
        console.log("mydiv = " + myDiv);
    })
})


