import { Todo } from '../models/Todo';

let dataBase = [];

export function getAllData() {
  return dataBase;
}


export function insertData(text) {
  const newTodo = Todo({text});
  dataBase.push(newTodo)
  return newTodo
}


export function deleteData({ id, removed }) {
  dataBase = dataBase.map((item) => {
    if (item.id === id) {
      item.removed = removed;
    }
    return item;
  });
  return dataBase.find((item) => {
    return item.id === id;
  });
}

export function updateData({id, ...rest}) {
      const { db , updated} = dataBase.reduce((acc, data) => {
        if (data.id === id) {
          acc.db.push({
            ...data,
            ...rest,
          });
          acc.updated = true;// UPDATE OLDUGU VERISINI TUTUYORUZ OLMAZSA DIGER CONDITION GECSIN
        } else {
          acc.db.push(data)
        }
        return acc;
      }, {db: [], updated: false});

      if (updated) {
        dataBase = db;
      } else {
        const newTodo = Todo(rest);
        dataBase.push(newTodo);
        return {
          id: newTodo.id,
          message: 'New Todo created',
        }
      }
      return {
        message: `${id} updated`
      }
};