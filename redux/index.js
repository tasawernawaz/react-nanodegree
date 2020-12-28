// library code
function createStore (reducer) {
    let state = {}
    let listners = []

    const getState = () => {
        return state
    }

    const subsucribe = (listner) => {
        listners.push(listner)

        return () => {
            listners = listners.filter(l => l !== listner)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listners.forEach(listner => listner())
    }

    return {
        getState,
        subsucribe,
        dispatch,
    }
}


// app code
function todos(state=[], action) {

    switch(action.type) {
        case "ADD_TODO":
            return state.concat(action.todo)
        case "REMOVE_TODO":
            return state.filter(s => s.id !== action.id)
        case "TOGGLE_TODO":
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: ! todo.complete}))
        default:
            return state
    }
}

function goals(state=[], action) {

    switch(action.type) {
        case "ADD_GOAL":
            return state.concat(action.goal)
        case "REMOVE_GOAL":
            return state.filter(s => s.id !== action.id)
        default:
            return state
    }
}

function app(state, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action)
    }
}

const store = createStore(app)

store.subsucribe(() => console.log("The current state of the store is ", store.getState()))

let action = {
    type: "ADD_TODO",
    todo: {
        id: 1,
        name: "Complete redux",
        complete: false
    }
}

store.dispatch(action)


action = {
    type: "ADD_TODO",
    todo: {
        id: 1,
        name: "watch video",
        complete: true
    }
}

store.dispatch(action)


const goal = {
    type: "ADD_GOAL",
    goal: {
        id: 0,
        name: "Lose weight"
    }
}

store.dispatch(action)
store.dispatch(goal)