// // document.body.innerHTML = "hello world "
// // document.title = "javascript"

// document.body.innerHTML = "<button>clickk</button>"

const element = document.getElementById("box");
element.textContent = " This is the content"

let newElement  = document.createElement("h1")


newElement.textContent = "This is a heading"

element.appendChild(newElement)