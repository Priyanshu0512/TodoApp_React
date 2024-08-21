const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Connor:qwerty12345@cluster0.ss8tp.mongodb.net/Todo"
);

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  todo,
};
