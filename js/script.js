const quiz_topic = document.querySelector(".quiz-topic")
const start_quiz = document.querySelector(".start-quiz")
const select_topic = document.querySelector(".select-topic")
const home_content = document.querySelector(".home-content")

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

    const totalQuestion = data.length
    const totalPage = Math.ceil(totalQuestion / limit)
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

        quiz_topic.innerHTML = list(data, "li")
        select_topic.innerHTML = list(data, 'option')
        select_topic.style.display = "none"

        start_quiz.onclick = (e) => {

            home_content.style.display = "none"
            select_topic.style.display = "grid"

            select_topic.onchange = (event) => {
                data.forEach(ele => {
                    if (Object.keys(ele).includes(event.target.value)) {
                        console.log(ele[event.target.value])
                            // if (page < data[0]["general knowledge"].length) {
                            //     page++
                            //     let _, dt = data.forEach(ele => _ = (ele["general knowledge"]));
                            //     const paginate_data = paginate(_, page, 3).questions
                            //     displayQuestion(paginate_data)
                            // } else {
                            //     displayQuestion(paginate(data, page, 3).questions)
                            // }
                    }
                })
            }

            // e.target.innerHTML = "Next ❯"


            // checkAnswer()
            // return page
        }
    })

function selectTopic(event) {
    console.log(event.target.value)
}

function list(data, element) {

    let dt = `<${element}>Element</${element}>`;
    data.forEach(ele => Object.keys(ele).forEach(elem => dt += `<${element} value="${elem}">${elem}</${element}>`))
    return dt;
}
/**
 * 
 * @param {data} data - Question json
 * @return {Object} Manipulated question to display
 */
let i = 0;

// function displayQuestion(data) {
//     html_question.innerHTML = " ";
//     data.forEach((ques, ind) => {

//         let options = "";
//         ques.options.forEach((ele) => {
//             options += `
//          <li>
//              <label id="${ques.number}" id="${ques.number}${ind}">
//                  <input type="radio" class="option" name="${ques.number}" value="${ele}">${ele}</input>
//              </label>
//          </li>`
//         })
//         html_question.innerHTML += `
//          <div class="question">
//              <div><b>${ques.number}. ${ques.question}</b></div>
//              ${options}
//          </div>
//          `
//     });
// }