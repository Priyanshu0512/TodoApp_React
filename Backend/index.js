const express = require("express");
const app = express();
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");

app.use(cors());

const PORT = 3000;
app.use(express.json());

app.post("/todos", async function (req, res) {
  const payload = req.body;
  console.log(payload);
  const parsedPayload = createTodo.safeParse(payload);

  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "Invalid payload",
    });
    return;
  }
  await todo.create({
    title: payload.title,
    description: payload.description,
    completed: false,
  });
  res.status(200).json({
    msg: "Todo Created Successfully",
  });
});

app.get("/todo", async function (req, res) {
  const allTodos = await todo.find({});
  res.status(200).json({
    allTodos: allTodos,
  });
});

app.put("/completed", async function (req, res) {
  const payload = req.body;
  const parsedPayload = updateTodo.safeParse(payload);
  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "invalid inputs",
    });
    return;
  }
  await todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "Todo Updated",
  });
});

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
