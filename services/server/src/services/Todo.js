import {
  getAllTodos,
  insertTodo,
  deleteTodo,
  updateTodo,
  findTodo,
} from "../models/Todo";

export async function getTodos() {
  const response = await getAllTodos();
  return response;
}

export async function postTodos(text) {
  const res = await insertTodo(text);
  console.log(res);
  return res;
}

export function deleteTodos(req) {
  return deleteTodo(req);
}

export function updateTodos(req) {
  return updateTodo(req);
}

export function searchTodos(text) {
  return findTodo(text);
}
