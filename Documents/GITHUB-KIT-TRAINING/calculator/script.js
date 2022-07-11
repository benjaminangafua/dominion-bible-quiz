"use strict"
const signs = document.querySelectorAll(".sign")
const equal = document.getElementById("equal")
const numbers = document.querySelectorAll(".num")
let user_input = document.querySelector(".input-value")



numbers.forEach((ele) => ele.addEventListener("click", () => user_input.value += ele.getAttribute('value')))


signs.forEach(elem => elem.addEventListener("click", (ele) => console.log(ele.originalTarget)))


signs.forEach(ele => ele.addEventListener("click", () => user_input.value += "" + ele.innerHTML + ""))


// Clear input
document.getElementById("clear").addEventListener("click", () => user_input.value = "")



const NUMBERS_ARRAY = (Operator, index) => {

    console.log(user_input.value.split(Operator))
    return Number((user_input.value.split(Operator)[index]))
}
const add = (num1, num2) => num1 + num2
const subtract = (num1, num2) => num1 - num2
const divide = (num1, num2) => num1 / num2
const multiply = (num1, num2) => num1 * num2


equal.addEventListener("click", () => {

    // const signsArray = ["/", "+", "X", "-"]

    if (user_input.value.includes("+")) {
        let sum = NUMBERS_ARRAY("+", 0) + NUMBERS_ARRAY("+", 1)

        return user_input.value += " = " + sum
    } else if (user_input.value.includes("/")) {
        let quotient = NUMBERS_ARRAY("/", 0) / NUMBERS_ARRAY("/", 1)

        console.log(quotient)
        return user_input.value += " = " + quotient

    } else if (user_input.value.includes("X")) {

        let product = NUMBERS_ARRAY("X", 0) * NUMBERS_ARRAY("X", 1)
        console.log(product)
        return user_input.value += " = " + product

    } else if (user_input.value.includes("-")) {
        let difference = NUMBERS_ARRAY("-", 0) - NUMBERS_ARRAY("-", 1)

        return user_input.value += " = " + difference

    }
})