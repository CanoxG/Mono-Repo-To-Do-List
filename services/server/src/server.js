import express from "express";
import cors from "cors";
import { deleteTodos, getTodos, postTodos, updateTodos } from "./services/Todo";
import { server } from "./config/config";
import { connectDb } from "./database/mongodb";

const app = express();

app.use(cors());

app.get("/", (_req, res) => {
  res.send("Go to /todos");
});

app.get("/todos", async (_req, res) => {
  const todos = await getTodos();
  res.json(todos);
});

app.post("/todos", async (request, response) => {
  console.log("post", request.query);
  const { text } = request.query;
  const res = await postTodos(text);
  response.json(res);
});

app.delete("/todos", async (request, response) => {
  console.log("delete", request.query);
  const res = await deleteTodos(request.query);
  console.log({ res });
  response.json(res);
});

app.put("/todos", async (request, response) => {
  console.log("put", request.query);
  if (request.query.id !== "undefined") {
    const data = await updateTodos(request.query);
    console.log(data);
    response.json(data);
  } else {
    response.status(422).send("id required");
  }
});

connectDb().then(() => {
  app.listen(server.PORT, (err) => {
    if (err) console.log(err);
    console.log("Listening PORT", server.PORT);
  });
});

export default app;
