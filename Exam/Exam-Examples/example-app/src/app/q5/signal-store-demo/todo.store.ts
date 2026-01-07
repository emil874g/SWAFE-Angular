import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: []
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos }) => ({
    todoCount: computed(() => todos().length),
    completedCount: computed(() => todos().filter(t => t.completed).length)
  })),
  withMethods((store) => ({
    addTodo(title: string) {
      const newTodo: Todo = {
        id: Date.now(),
        title,
        completed: false
      };
      patchState(store, { todos: [...store.todos(), newTodo] });
    },
    toggleTodo(id: number) {
      const updatedTodos = store.todos().map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      patchState(store, { todos: updatedTodos });
    },
    removeTodo(id: number) {
      const filteredTodos = store.todos().filter(t => t.id !== id);
      patchState(store, { todos: filteredTodos });
    }
  }))
);
