const express = require('express');

const path = require('path');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils.js')
const PORT = process.env.PORT || 3001;

const app = express();
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/api/notes',function(req,res){

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
    
    //res.json()
})
app.post('/api/notes',function(req,res){

    readAndAppend(req.body, './db/db.json');
    
    res.json(req.body)
})

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
