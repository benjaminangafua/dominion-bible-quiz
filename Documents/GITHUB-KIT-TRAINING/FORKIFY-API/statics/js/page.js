const container = document.querySelector(".container")
const MAIN = document.querySelector(".main");
const inner2 = document.querySelector(".inner2");
const banner = document.querySelector(".banner");
const circles = document.querySelectorAll(".circle")
const section1 = document.getElementById("#section1")


fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
    .then(res => res.json())
    .then(data => {

        banner.innerHTML = `<h1>^</h1> `
        banner.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.589), rgba(0, 0, 255, 0.274)), url(${data.recipes[13].image_url})`
        circles[0].innerHTML = `<img src="${data.recipes[1].image_url}">`
        circles[1].innerHTML = `<img src="${data.recipes[3].image_url}">`
        circles[2].innerHTML = `<img src="${data.recipes[4].image_url}">`
        inner2.innerHTML = `<img src="${data.recipes[10].image_url}">`

        data.recipes.forEach((element, index) => {

            MAIN.insertAdjacentHTML("afterbegin", `
                <div class="img">
                    <img src="${element.image_url}">
                    <div class="below-img">
                        <div>${element.title}</div>
                        <div>By <a href="${element.publisher_url}"> ${element.publisher} </a></div>
                    </div>
                </div>
            `)
        });
    }).catch(err => { if (err) console.log(err) })