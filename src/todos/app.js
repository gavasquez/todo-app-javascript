import todoStore, { Filters } from '../store/todo.store';
import html from "./app.html?raw";
import { renderPending } from './use-cases/render-pending';
import { renderTodos } from './use-cases/render-todos';


const ElementsIds = {
  TodoList: '.todo-list',
  newTodoInput: '#new-todo-input',
  clearCompleted: '.clear-completed',
  todoFilters: '.filtro',
  pendingCountLabel: '#pending-count'
};
/**
 * @param {string} elementId 
 * */

export const App = (elementId) => {


  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementsIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementsIds.pendingCountLabel)
  }

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescripctionInput = document.querySelector(ElementsIds.newTodoInput);
  const todoListUl = document.querySelector(ElementsIds.TodoList);
  const deleteCompletedBtn = document.querySelector(ElementsIds.clearCompleted);
  const filtersLi = document.querySelectorAll(ElementsIds.todoFilters);
  // Listeners
  newDescripctionInput.addEventListener('keyup', (event) => {
    //* el 13 es la tecla enter
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  });

  todoListUl.addEventListener('click', (event) => {
    // closest( '[data-id]' ) que busque el padre mas cerca que tenga como propiedad data-id
    const element = event.target.closest('[data-id]');
    const dataId = element.getAttribute('data-id');
    todoStore.toggleTodo(dataId);
    displayTodos();
  });

  todoListUl.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    const dataId = element.getAttribute('data-id');
    // Validamos por la clase
    const isDestroyElement = event.target.className === 'destroy';
    if (!element || !isDestroyElement) return;
    todoStore.deleteTodo(dataId);
    displayTodos();
  });

  deleteCompletedBtn.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  })

  filtersLi.forEach(element => {
    element.addEventListener('click', (element) => {
      filtersLi.forEach(el => el.classList.remove('selected'))
      element.target.classList.add('selected');
      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filters.All)
          break;
        case 'Pendientes':
          todoStore.setFilter(Filters.pending)
          break;
        case 'Completados':
          todoStore.setFilter(Filters.Completed)
          break;
      }
      displayTodos();
    })
  })
};