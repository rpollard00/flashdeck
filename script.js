let first_value = 0;
let second_value = 0;
let next_button = document.querySelector("#next");
let submit_button = document.querySelector("#submit");
let guess = document.querySelector("#guess");
let answer = document.querySelector(".answer");
let message = document.querySelector(".message");

const set_num = (position, value) => {
    if (position === 1) {
        first_value = value;
    } else if (position === 2) {
        second_value = value;
    } else {
        console.error("INVALID POSITION SELECTED");
    }
};

const render = () => {
    let first = document.querySelector("#first");
    first.innerText = first_value;
    let second = document.querySelector("#second");
    second.innerText = second_value;
};

const get_random_int = (low, high) => {
    return Math.floor(Math.random() * high + low);
};

const reset_state = () => {
    submit_button.disabled = false;
    guess.value = "";
    message.innerText = "";
    answer.innerText = "";
};

const next_card = () => {
    reset_state();
    set_num(1, get_random_int(1, 12));
    set_num(2, get_random_int(1, 12));
    render();
};

const check_answer = () => {
    let guess_value = guess.value;
    let answer_value = first_value * second_value;

    answer.innerText = answer_value;
    if (Number(guess_value) === Number(answer_value)) {
        message.innerText = "You are correct!";
    } else {
        message.innerText = "WRONG";
    }

    guess.value = "";
    submit_button.disabled = true;
};

// sets the initial page state
//
next_card();

next_button.addEventListener("click", next_card);
submit_button.addEventListener("click", check_answer);
