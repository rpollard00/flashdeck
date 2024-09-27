import { Store, initialState, reducer } from "./store.js";

const store = new Store(reducer, initialState);

const qs = (selector) => document.querySelector(selector);
const el = (element, event, listener) =>
    element.addEventListener(event, listener);

const render = () => {
    let first = qs("#first");
    first.innerText = store.getState().first;
    let second = qs("#second");
    second.innerText = store.getState().second;
};

const renderAnswer = () => {
    let answerEl = qs(".answer");
    answerEl.innerText = store.getState().answer || "";
};

const renderMessage = () => {
    let messageEl = qs(".message");
    messageEl.innerText = store.getState().message || "";
};

const render_answer_on_card = () => {
    let el = qs(".card-back-content");
    el.innerText = store.getState().answer || "";
};

store.subscribe(() => {
    console.log("State updated: ", store.getState());
});
store.subscribe(renderAnswer);
store.subscribe(render_answer_on_card);
store.subscribe(renderMessage);

const ops = {
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};

const calc = (a, b, op) => ops[op](a, b);

const get_random_int = (low, high) => {
    return Math.floor(Math.random() * high + low);
};

let next_button = qs("#next");
next_button.disabled = true;
let submit_button = qs("#submit");
submit_button.disabled = true;
let flip_button = qs("#flip");
let guess = qs("#guess");
let answer = qs(".answer");
let message = qs(".message");

const reset_ui = () => {
    guess.value = "";
};

const set_front = () => {
    let card = qs(".card");
    let card_back = qs(".card-back");

    card.classList.remove("hidden");
    card_back.classList.add("hidden");
};

const set_back = () => {
    let card = qs(".card");
    let card_back = qs(".card-back");

    card.classList.add("hidden");
    card_back.classList.remove("hidden");
};

const hide_message = () => {
    let modal = qs(".message-container");

    modal.classList.remove("block");
    modal.classList.add("hidden");
};

const show_message = (timeout, style) => {
    let modal = qs(".message-container");

    modal.classList.remove("message-default");
    modal.classList.remove("message-error");
    modal.classList.remove("message-success");

    switch (style) {
        case "error": {
            modal.classList.add("message-error");
            break;
        }
        case "success": {
            modal.classList.add("message-success");
            break;
        }
        default: {
            modal.classList.add("message-default");
            break;
        }
    }

    modal.classList.remove("hidden");
    modal.classList.add("block");

    if (timeout) {
        setTimeout(() => {
            hide_message();
        }, timeout);
    }
};

const next_card = () => {
    store.dispatch({ type: "SET_MESSAGE", payload: "" });
    store.dispatch({ type: "SET_ANSWER", payload: "" });
    store.dispatch({ type: "SET_GUESS", payload: null });
    store.dispatch({ type: "SET_FIRST", payload: get_random_int(1, 12) });
    store.dispatch({ type: "SET_SECOND", payload: get_random_int(1, 12) });

    reset_ui();
    hide_message();
    set_front();
    render();

    next_button.disabled = true;
};

const submit_answer = (state) => {
    let guess_value = Number(state.getState().guess);
    let answer_value = calc(state.getState().first, state.getState().second, "*");

    if (guess_value === answer_value) {
        store.dispatch({ type: "SET_MESSAGE", payload: "You are correct!" });
        show_message(0, "success");
    } else {
        store.dispatch({ type: "SET_MESSAGE", payload: "WRONG!" });
        show_message(0, "error");
    }

    store.dispatch({ type: "SET_ANSWER", payload: answer_value });
    set_back();
    next_button.disabled = false;
    submit_button.disabled = true;
};

const update_guess_field = () => {
    guess.value = store.getState().guess;
};

store.subscribe(update_guess_field);

guess.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value.length > 0) {
        submit_button.disabled = false;
    }

    if (!/^\d+$/.test(value) && value.length > 0) {
        // prevent the user from entering an invalud character
        e.target.value = e.target.value.slice(0, -1);
        message.innerText = "Enter a valid whole number.";
        return;
    }

    store.dispatch({ type: "SET_GUESS", payload: value });
    message.innerText = "";
});

const flip = () => {
    let card = qs(".card");
    let card_back = qs(".card-back");

    card.classList.toggle("hidden");
    card_back.classList.toggle("hidden");
};

// sets the initial page state
next_card();

el(next_button, "click", next_card);
el(submit_button, "click", () => submit_answer(store));
