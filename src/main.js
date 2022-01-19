const { response } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    Content: "Bla blablablablablablablabla",
    date: "23/5/2000",
    important: "false",
  },
  {
    id: 2,
    Content: "HEHEHEHEHEEHEHEHEH",
    date: "10/1/2020",
    important: "false",
  },
  {
    id: 3,
    Content: "Play videogames",
    date: "18/1/2022",
    important: "true",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/api/notes/", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((nota) => nota.id === id);

  if (note) {
    res.json(note);
  } else {
    res.redirect("https://http.cat/404");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((nota) => nota.id !== id);

  res.json(note);

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  if (!note || !note.content)
    return response.status(400).json({
      error: "note.content is missing",
    });

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];

  res.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));
