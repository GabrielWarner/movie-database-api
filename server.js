const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);


app.get('/api/movies' ,(req,res) =>{
    db.query('SELECT * FROM movies',(err, results) => {
        console.log(results)
        if(err){
            res.status(500).json({error:'error'})
            return
        }
        res.json(results)
    })
})

app.post('/api/movie-add', (req, res) => {
    if(req.body){
        let movie = req.body.name
        db.query('INSERT INTO movies (movie_name) VALUE (?)',movie, (err, results) =>{
            if(err){
                res.status(500).json({error:'error'})
                return
            }
            res.send("Success!")
        })
    }
});


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 