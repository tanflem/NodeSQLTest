const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port:8889,
    database:"testProjectDatabase"
});


db.connect(err =>{
    if(err) throw err;
    console.log('MySql Connected')
});

const app = express()

// Create Database
app.get('/createdb',(req, res) => {
    let sql = 'CREATE DATABASE testProjectDatabase'
    db.query(sql, err =>{
        if(err) {
            throw err
        }
        res.send('Database Created')
    });
});

// Create project Table
app.get('/createproject',(req, res) => {
    let sql = 'CREATE TABLE project(id int NOT NULL AUTO_INCREMENT, LastName varchar(255) NOT NULL, primary key (id))'
    db.query(sql, err =>{
        if(err) {
            throw err
        }
        res.send('Project Table Created')
    });
});

// Inserting Project
app.get('/insertproject',(req, res) => {
    let post = {LastName: 'End of the World'}
    let sql = 'INSERT INTO project SET ?'
    let query = db.query(sql, post, err =>{
        if(err) {
            throw err
        }
        res.send('Project added')
    });
});

// Getting project table
app.get('/getproject', (req, res) => {
    let sql = 'SELECT * FROM project'
    let query = db.query(sql, (err, results) =>{
        if(err){
            throw err
        }
        console.log(results)
        res.send('Project details fetched')
    })
})

// Updating
app.get('/updateproject/:id', (req, res) => {
    let newName = 'Updated name'
    let sql = `DELETE project WHERE id = ${req.params.id}`
    let query = db.query(sql, err =>{
        if(err) throw err;

        res.send('Project details updated')
    })
})

// Deleting
app.get('/deleteproject/:id', (req, res) => {
    let newName = 'Updated name'
    let sql = `UPDATE project SET lastName = '${newName}' WHERE id = ${req.params.id}`
    let query = db.query(sql, err =>{
        if(err) throw err;

        res.send('Project deleted')
    })
})

app.listen('3000', () =>{
    console.log('Server Started on port 3000')
})