// library code
function createStore (reducer) {
    let state
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
    if (action.type === "ADD_TODO") {
        state = state.concat(action.todo)
    }
    return state
}


const store = createStore(todos)

store.subsucribe(() => console.log("The current state of the sote is ", store.getState()))

const action = {
    type: "ADD_TODO",
    todo: {
        id: 1,
        name: "Reading a Book",
        complete: true
    }
}

store.dispatch(action)