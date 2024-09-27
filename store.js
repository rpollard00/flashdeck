const initialState = {
    first: 0,
    second: 0,
    guess: null,
    streak: 0,
    message: "",
    answer: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIRST":
            return {
                ...state,
                first: action.payload,
            };
        case "SET_SECOND": {
            return {
                ...state,
                second: action.payload,
            };
        }
        case "SET_GUESS": {
            return {
                ...state,
                guess: action.payload,
            };
        }
        case "STREAK": {
            return {
                ...state,
                streak: state.streak + 1,
            };
        }
        case "SET_MESSAGE": {
            return {
                ...state,
                message: action.payload,
            };
        }
        case "SET_ANSWER": {
            return {
                ...state,
                answer: action.payload,
            };
        }
        case "RESET_STREAK": {
            return {
                ...state,
                streak: 0,
            };
        }
        case "RESET_STATE": {
            return { ...initialState };
        }
        default:
            return state;
    }
};

class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((listener) => listener());
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}

export { Store, initialState, reducer };
