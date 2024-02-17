import { App } from './src/todos/app'
import './style.css'

import todoStore from "./src/store/todo.store";

todoStore.initStore();

App('#app');


