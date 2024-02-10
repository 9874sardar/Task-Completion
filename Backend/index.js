require("dotenv").config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

app.post('/signup',(req,res) =>{
    const sql = "INSERT INTO signup (`username`,`email`,`contact`,`dob`,`age`,`password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.contact,
        req.body.dob,
        req.body.age,
        req.body.password,
    ]
    console.log(values)
    db.query(sql,[values], (err,data)=>{
        if (err) {
            return res.json("Error");
        }
    
        return res.json(data);
    })
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "UPDATE signup SET `username`= ?,`contact`= ?,`dob`= ?,`age`= ? WHERE id= ?";

    const values = [
        req.body.username,
        req.body.contact,
        req.body.dob,
        req.body.age,
    ];

    console.log("VAlues",values);
    db.query(sql,[...values,id], (err,data)=>{
        if (err) {
            return res.json("Error");
        }
        console.log("data",data);
        return res.json(data);
    })
})

app.post('/login',(req,res) =>{
    const sql = "SELECT * FROM signup WHERE `email` = ? AND `password` = ?";
    // console.log(values)
    db.query(sql,[req.body.email, req.body.password], (err,data)=>{
        if (err)
            return res.json("Error");
    
        if(data.length > 0){
            return res.json(data);
        } else {
            return res.json("Failure");
        }
    })
})

app.get('/home/:id',(req,res) =>{
    const user = req.params.id;
    const sql = "SELECT * FROM signup WHERE `id` = ?";
    db.query(sql,[user], (err,data)=>{
        if (err)
            return res.json("Error");
    
        if(data.length > 0){
            return res.json(data);
        } else {
            return res.json("Failure");
        }
    })
})


app.listen(PORT, ()=> {
    console.log("listening");
})