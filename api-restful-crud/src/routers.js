const router = require("express").Router();
const Person = require('./models/Person');

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name || !salary || !approved) {
    res.status(400).json({ erro: 'All fields are mandatory' });
    return;
  }

  const person = {
    name,
    salary,
    approved
  }

  try {
    await Person.create(person);
    res.status(201).json({ message: 'Successfully registered person' });

  } catch (err) {
    res.status(500).json({ erro: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);

  } catch (err) {
    res.status(500).json({ erro: err });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(person);

  } catch (err) {
    res.status(500).json({ erro: err });
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
      res.status(400).json({ erro: 'All fields are mandatory' });
      return;
    }

    const updatedPerson = await Person.updateOne({ _id: id }, person);
    res.status(200).json(person);

    if (updatedPerson.matchedCount === 0) {
      res.status(400).json({ message: 'the user has not been updated' });
      return;
    }
    
  } catch (err) {
    res.status(500).json({ erro: err });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

   if (!person) {
     res.status(404).json({ erro: 'User not found' });
     return;
   }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ erro: 'the user was successfully removed' });
    
  } catch (err) {
    res.status(500).json({ erro: err });
  }
});


module.exports = router;
