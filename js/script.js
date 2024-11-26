const LANDING_PAGE = document.querySelector(".LANDING_PAGE");
const QUIZ_CATEGORY = document.querySelector(".QUIZ_CATEGORY");
const BEGIN_QUIZ = document.querySelector(".BEGIN_QUIZ");
const SELECTED_CATEGORY = document.querySelector(".SELECTED_CATEGORY");
const HTML_QUESTION = document.querySelector(".HTML_QUESTION");
const NextPage = document.querySelector(".NEXT_PAGE");
const PreviousPage = document.querySelector(".PREVIOUS_PAGE");
let page = 2,
  limit = 3,
  pageStart = false;

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
  page = parseInt(page);
  limit = parseInt(limit);

  const totalQuestion = data.length;
  const totalPage = Math.ceil(totalQuestion / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  // Display data
  const fetchedQuestions = data.slice(start, end);
  const number_of_questions = `${limit} of ${data.length}`;
  const paginated = {
    totalPage: totalPage,
    currentPage: page,
    number_of_questions: number_of_questions,
    questions: fetchedQuestions,
  };
  return paginated;
};

/**
 * @return {Boolean} check - for correct answer
 */
const checkAnswer = () => {
  document.querySelectorAll(".option").forEach((elem) =>
    elem.addEventListener("change", (e) => {
      e.target.parentElement.style.backgroundColor =
        e.target.value == e.target.dataset.ben && e.target.checked == true
          ? "green"
          : "none";
    })
  );
};

/**
 *
 * @param {Object} e - DOM Element
 * @return {}
 */

fetch("../json/quiz.json")
  .then((res) => res.json())
  .then((data) => {
    if (data) {
      QUIZ_CATEGORY.innerHTML = list(data, "li");
      SELECTED_CATEGORY.innerHTML = list(data, "option");
      SELECTED_CATEGORY.style.display = "none";

      BEGIN_QUIZ.onclick = (e) => {
        LANDING_PAGE.style.display = "none";
        SELECTED_CATEGORY.style.display = "grid";

        SELECTED_CATEGORY.onchange = (event) => {
          GetQuestions(data, event);
        };
        // e.target.innerHTML = "Next ❯";
        // checkAnswer()
        // return page
      };
    }
  });

function GetQuestions(data, event) {
  data.forEach((ele) => {
    const VALUES = event.target.value;

    if (Object.keys(ele).includes(VALUES)) {
      let _ = ele[VALUES];

      let paginated_data = paginate(_, 1, 3).questions;
      const totalPages = paginate(_, 1, 3).totalPage;
      displayQuestion(paginated_data);

      NextPage.onclick = (e) => {
        if (page < totalPages) {
          paginated_data = paginate(_, page, 3).questions;
          displayQuestion(paginated_data);
          page++;
        }
      };

      PreviousPage.onclick = () => {
        if (page > 0) {
          page--;

          paginated_data = paginate(_, page, 3).questions;
          displayQuestion(paginated_data);
        }
      };
    }
  });
}

function list(data, element) {
  let dt = `<${element}>Element</${element}>`;
  data.forEach((ele) =>
    Object.keys(ele).forEach(
      (elem) => (dt += `<${element} value="${elem}">${elem}</${element}>`)
    )
  );
  return dt;
}
/**
 *
 * @param {data} data - Question json
 * @return {Object} Manipulated question to display
 */
let i = 0;

function displayQuestion(data) {
  HTML_QUESTION.innerHTML = " ";

  data.forEach((ques, ind) => {
    let options = "";
    ques.options.forEach((ele) => {
      options += `
       <li>
           <label id="${ques.number}" id="${ques.number}${ind}">
               <input type="radio" class="option" name="${ques.number}" value="${ele}">${ele}</input>
           </label>
       </li>`;
    });
    HTML_QUESTION.innerHTML += `
       <div class="question">
           <div><b>${ques.number}. ${ques.question}</b></div>
           ${options}
       </div>
       `;
  });
}
