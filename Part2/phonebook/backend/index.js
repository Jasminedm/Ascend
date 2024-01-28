const express = require('express');
const app = express();

app.use(express.json())

const persons = [
  { "id": 1, "name": "Arto Hellas", "number": "040-123456" },
  { "id": 2, "name": "Ada Lovelace", "number": "39-44-5323523" },
  { "id": 3, "name": "Dan Abramov", "number": "12-43-234345" },
  { "id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122" }
];
  
app.get('/api/persons', (req, res) => {
    res.json(persons);
  });

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(p => p.id === id)

if (person) {
    res.json(person)
} else {
    res.status(404).end()
}
  })

app.get('/info', (req, res) => {
  const timestamp = new Date();
  const entryCount = persons.length;

  res.send(`
    <p>Phonebook has info for ${entryCount} people</p>
    <p>${timestamp}</p>
  `);
});

app.post('/api/persons', (req, res) =>{
    const body = req.body
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number is missing'
        })
    }

    const isDuplicateName = persons.some(person => person.name === body.name);

    if (isDuplicateName) {
        return res.status(400).json({
            error: 'Name must be unique'
        });
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    }

    persons.push(newPerson)
    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
const id = parseInt(req.params.id)
const personIndex = persons.findIndex(p => p.id === id);

if (personIndex !== -1) {
    const deletedPerson = persons.splice(personIndex, 1);
    res.json(deletedPerson[0]);
} else {
    res.status(404).end()
}

})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



