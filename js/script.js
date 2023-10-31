let generalDiv = document.querySelector(".container")

let start_quiz = document.createElement("button")



let html_question = document.createElement("div")
generalDiv.append(html_question)
html_question.setAttribute("class", "html_question")

generalDiv.append(start_quiz)


start_quiz.innerHTML = "Start Quiz"

let page = 0,
    limit = 3;

// 0. Return a pagination object x
// 1. Return questions x
// 2. Return total number of questions x
// 3. Function should accept the number of questions to be returned x
// 4. Function should return the number of questions passed x

/**
 * Total page = Total content / 3
 * 
 * start = (page - 1) * 3  
 * 
 * end = start + 3
 * 
 */

/**
 * A function that paginates the array of questions per page
 * @param {Object} data -data to paginate
 * @param {number} page - page of questions
 * @param {number} limit - number of questions to be returned
 * @returns {Object} Object of questions per the page specified
 */
const paginate = (data, page, limit) => {
    page = parseInt(page)
    limit = parseInt(limit)
        // Calculate total pages
    const totalQuestion = data.length

    const totalPage = Math.ceil(totalQuestion / limit)

    // Calculate where to Start and end of the contents to display
    const start = (page - 1) * limit;
    const end = start + limit;

    // Display data
    const fetchedQuestions = data.slice(start, end)
    const number_of_questions = `${limit} of ${data.length}`

    return { totalPage: totalPage, currentPage: page, number_of_questions: number_of_questions, questions: fetchedQuestions }
}



/**
 * @return {Boolean} check - for correct answer
 */
const checkAnswer = () => {

    document.querySelectorAll(".option").forEach(elem => elem.addEventListener("change", (e) => {
        // console.log(e.target.dataset.ben)
        e.target.parentElement.style.backgroundColor = (e.target.value == e.target.dataset.ben && e.target.checked == true) ? "green" : "none"
    }))
}


/**
 * 
 * @param {Object} e - DOM Element
 * @return {}
 */

// console.log(e)
fetch("../json/quiz.json")
    .then(res => res.json())
    .then(data => {


        start_quiz.onclick = (e) => {

            e.target.innerHTML = "Next ❯"

            if (page < 100) {
                page++
                const paginate_data = paginate(data, page, 3).questions
                displayQuestion(paginate_data)
            } else {
                displayQuestion(paginate(data, page, 3).questions)
            }
            // console.log(page)

            checkAnswer()
            return page
        }
    })


/**
 * 
 * @param {data} data - Question json
 * @return {Object} Manipulated question to display
 */
let i = 0;

function displayQuestion(data) {
    html_question.innerHTML = " ";

    data.forEach((ques, ind) => {

        let options = "";
        ques.options.forEach((ele) => {
            options += `
         <li>
             <label for="${ques.number}" name="${ques.number}" id="${ques.number}${ind}">
                 <input type="radio" class="option" name="${ques.number}" data-ben="${ques.answer}" value="${ele}">${ele}</input>
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
}