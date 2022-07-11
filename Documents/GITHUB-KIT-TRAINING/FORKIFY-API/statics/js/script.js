// Get element document
const body = document.body
    // Create element
const div = document.createElement("div")
const btn = document.createElement('button')
const input = document.createElement("input")
const img = document.createElement("img")

// Write in created element
div.innerHTML = "<strong>Hello, Div </strong>";
btn.innerHTML = "Click"

// Set attribute
div.setAttribute('class', 'div div2')
div.setAttribute("data-name", "ben")
input.setAttribute('type', 'file')

// Add to main body
body.append(div)
body.append(input)
body.append(btn)


// Add insert image and display
btn.addEventListener("click", () => {
    img.src = URL.createObjectURL(input.files[0])
    body.append(img)
})


div.dataset = "name-a-data-set"
div.classList.add("class-add")
    // .remove('div', true)


fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
    .then(res => res.json())
    .then(data => {
        console.log(data)



    }).catch(err => { if (err) console.log(err) })