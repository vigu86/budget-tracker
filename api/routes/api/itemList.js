const { Router } = require("express");
const Item = require("../../models/Item");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const itemList = await Item.find();
    if (!itemList) throw new Error("No Todo List found");
    res.status(200).json(itemList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/", async (req, res) => {
//   const newTodo = new Todo(req.body);
//   try {
//     const todo = await newTodo.save();
//     if (!todo) throw new Error("Something went wrong saving the Todo");
//     res.status(200).json(todo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const removed = await Todo.findByIdAndDelete(id);
//     if (!removed) throw Error("Something went wrong ");
//     res.status(200).json(removed);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
