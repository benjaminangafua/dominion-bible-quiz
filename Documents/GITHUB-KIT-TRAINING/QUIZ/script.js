let score_board = document.getElementById("score-board")

function questionsForm() {
    let subject = document.getElementById("subject");
    let number_of_questions = document.getElementById("number-of-question");
    let questions_field = document.getElementById("questions");

    fetch(`https://kit-questions.glitch.me/question/${subject.value}/${number_of_questions.value}`)
        .then(response => response.json())
        .then(data => {

            /* converting data to array */
            let regular_data = Object.entries(data.questions)

            regular_data.forEach((element, index) => {

                // Looping through option
                let option_value, id;

                Object.entries(element[1].options).forEach((value, index2) => {

                    id = `${element[0]}-${index2 +1}`
                    option_value += `<li>
                        <label for="${id}">
                            <input type="radio" title="${element[1].answer}" name="${element[0]}" id="${id}" value="${value[0]}" >${value}</input> 
                        </label> </li>`
                })

                questions_field.insertAdjacentHTML("beforebegin",
                    `<div id="quiz-style"> 
                        <li><b> ${index + 1}. ${element[1].question}</b></li> 
                        ${option_value} 
                    </div>`)
            });
            document.querySelectorAll("input[type='radio']").forEach((ele, i) => ele.addEventListener("change", (e) => e.target.parentElement.style.backgroundColor = (e.target.title == e.target.value) ? "green" : "none"))

        })
        /* display */
    document.getElementById("q-num").style.display = "none";

}

score_board.style.display = "block";