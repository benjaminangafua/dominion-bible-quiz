let generalDiv = document.querySelector(".container")
let html_question = document.createElement("div")
generalDiv.append(html_question)
html_question.setAttribute("class", "html_question")

fetch("../json/quiz.json")
    .then(res => res.json())
    .then(data => {
        data.questions.forEach((ques, ind) => {
            let opt = ques.options
            let options = "";
            opt.forEach((ele) => {
                options += `
                    <li>
                        <label for="${ques.number}" id="${ques.number}${ind}">
                            <input type="radio" class="option" name="${ques.number}" title="${ques.answer}" value="${ele}">${ele}</input>
                        </label>
                    </li>`
            })
            html_question.innerHTML += `
            <div class="question">
                <div> <b> ${ques.number}. ${ques.question}</b></div>
                ${options}
             </div>
            `
        });
        document.querySelectorAll(".option").forEach(elem => elem.addEventListener("change", (e) => e.target.parentElement.style.backgroundColor = (e.target.value == e.target.title && e.target.checked == true) ? "green" : "none"))


        // console.log(.id)
        // answer.lastChild.data
        // console.log(answer)
        // && e.target.value == ans.includes(e.target.value)
        // .insertAdjacentHTML("beforebegin", )
    })