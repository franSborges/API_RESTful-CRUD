const router = require("express").Router();
const Person = require('./models/Person');

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name || !salary || !approved) {
    res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    return;
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person);
    res.status(201).json({ message: 'Pessoa inserida com sucesso' });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(404).json({ message: 'O usúario não foi encontrado' });
      return;
    }

    res.status(200).json(person);

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved
  }

  try {
    if (!name || !salary || !approved) {
      res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
      return;
    }

    const updatedPerson = await Person.updateOne({ _id: id }, person);
    res.status(200).json(person);

    if (updatedPerson.matchedCount === 0) {
      res.status(400).json({ message: 'O usúario não foi atualizado' });
      return;
    }
    
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

   if (!person) {
     res.status(404).json({ message: 'O usúario não foi encontrado' });
     return;
   }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: 'O usúario foi removido com sucesso' });
    
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


module.exports = router;