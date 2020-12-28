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

const ADD_TODO = "ADD_TODO"
const REMOVE_TODO = "REMOVE_TODO"
const TOGGLE_TODO = "TOGGLE_TODO"
const ADD_GOAL = "ADD_GOAL"
const REMOVE_GOAL = "REMOVE_GOAL"

function addTodoAction (todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction (goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction (id) {
    return {
        type: REMOVE_GOAL,
        id
    }
}

function todos(state=[], action) {

    switch(action.type) {
        case ADD_TODO:
            return state.concat(action.todo)
        case REMOVE_TODO:
            return state.filter(s => s.id !== action.id)
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: ! todo.complete}))
        default:
            return state
    }
}

function goals(state=[], action) {

    switch(action.type) {
        case ADD_GOAL:
            return state.concat(action.goal)
        case REMOVE_GOAL:
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

store.dispatch(addTodoAction({
    id: 0,
    name: "watch video",
    complete: true
}))

store.dispatch(addTodoAction({
    id: 1,
    name: "Complete redux",
    complete: false
}))

store.dispatch(addTodoAction({
    id: 2,
    name: "this should be removed",
    complete: true
}))

store.dispatch(removeTodoAction({
    id: 2
}))

store.dispatch(addGoalAction({
    id: 0,
    name: "This has to be removed"
}))

store.dispatch(addGoalAction({
    id: 1,
    name: "Lose weight"
}))

store.dispatch(removeGoalAction({
    id: 0
}))
