import { db, ObjectId } from "../database/mongodb";

const getCollection = () => db.collection("todos");

export function Todo({ text, checked = false, removed = false }) {
  return {
    text,
    checked,
    removed,
    createdAt: new Date(),
  };
}

export async function getAllTodos() {
  const data = await getCollection().find({}).toArray();
  return data;
}

export async function insertTodo(text) {
  const newTodo = Todo({ text });
  const res = await getCollection().insertOne(newTodo);
  console.log("----asd", res.insertedId);
  return {
    ...newTodo,
    _id: res.insertedId,
  };
}

export async function deleteTodo({ id }) {
  const deleted = await getCollection().deleteOne({ _id: new ObjectId(id) });
  console.log({ deleted });
  return deleted;
}

export async function updateTodo({ id, checked, removed, ...updates }) {
  const isCheckedString = typeof checked === "string";

  const changes = {
    ...updates,
    ...(isCheckedString && { checked: checked !== "false" }),
  };

  await getCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: changes },
    { upsert: true }
  );
  const updated = getCollection().findOne({ _id: new ObjectId(id) });
  return updated;
}

export async function findTodo(text) {
  const search = await getCollection()
    .find({
      $text: { $search: text },
    })
    .toArray();
  console.log(search);
  return search;
}
