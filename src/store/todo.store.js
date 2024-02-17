import { Todo } from "../todos/models/todo.model";

const Filters = {
    All: 'all',
    Completed: 'completed',
    pending: 'pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del infinito'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    console.log(state)
    console.log('Store inicializado 🥑')
}

const loadStore = () => {
    throw new Error('Not implemented')
}

/** 
*@param {String} description 
*/
const addTodo = (description) => {
    if (!description) throw new Error('Descripcion es requerida')
    /* const newTodos = new Todo(description);
    return [...state.todos, newTodos]; */
    state.todos.push(new Todo(description))
}

const toggleTodo = (todoId) => {
    throw new Error('Not implemented')
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
}

const setFilter = (newFilter = Filters.All) => {
   state.filter = newFilter;
}

const getCurrentFilter = () => {
   return state.filter;
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]
        case Filters.Completed:
            return state.todos.filter(todo => todo.done)
        case Filters.Completed:
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Opcion ${filter} is not valid`)
    }
}



export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}