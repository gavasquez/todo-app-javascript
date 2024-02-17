import { Todo } from '../models/todo.model';
import { createTodoHtml } from './create-todo-html';

let element;

/**
*@param {String} elementId
*@param {Todo} todos
*/

export const renderTodos = ( elementId, todos = [] ) => {

  if ( !element )
    element = document.querySelector( elementId );
  if ( !element ) throw new Error( `Element with id "${ elementId }" not found.` );
  // Antes de llamar el element en forEach se debe purgar todo html
  element.innerHTML = '';
  //todo: referencia
  todos.forEach( todo => {
    element.append( createTodoHtml( todo ) );
  } );
  
};