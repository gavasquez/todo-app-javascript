import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: 'all',
  Completed: 'completed',
  pending: 'pending',
};

const state = {
  todos: [
    new Todo( 'Piedra del alma' ),
    new Todo( 'Piedra del tiempo' ),
    new Todo( 'Piedra del infinito' ),
    new Todo( 'Piedra del poder' ),
  ],
  filter: Filters.All,
};


const initStore = () => {
  loadStore();
  console.log( 'Store inicializado 🥑' );
};

const loadStore = () => {
  if ( !localStorage.getItem( 'state' ) ) return;
  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem( 'state', JSON.stringify( state ) );
};

/** 
*@param {String} description 
*/
const addTodo = ( description ) => {
  if ( !description ) throw new Error( 'Descripcion es requerida' );
  const newTodos = new Todo( description );
  state.todos = [ ...state.todos, newTodos ];
  saveStateToLocalStorage();
  /* state.todos.push( newTodos ); */
};

const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todoId === todo.id ) {
      todo.done = !todo.done;
    }
    return todo;
  } );
  saveStateToLocalStorage();
};

const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStorage();
};

const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

const getTodos = ( filter = Filters.All ) => {
  switch ( filter ) {
    case Filters.All:
      return [ ...state.todos ];
    case Filters.Completed:
      return state.todos.filter( todo => todo.done );
    case Filters.pending:
      return state.todos.filter( todo => !todo.done );
    default:
      throw new Error( `Opcion ${ filter } is not valid` );
  }
};



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
};