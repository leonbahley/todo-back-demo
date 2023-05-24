import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todos",
});

app.get("/todos", (req, res) => {
  const q = "SELECT * FROM todos";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/todos", (req, res) => {
  const q = "INSERT INTO todos(`title`) VALUES (?)";

  const values = req.body.title;

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const q = " DELETE FROM todos WHERE id = ? ";

  db.query(q, [todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.patch("/todos/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const q = "UPDATE todos SET `completed`= ? WHERE id = ?";

  const values = 0;

  db.query(q, [values, todoId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Server started");
});
