//npm init -y                  # Creates package.json automatically
// npm install express         # Installs Express framework for backend APIs and server
// npm install mysql2          # Connects Node.js application to MySQL database
// npm install dotenv          # Loads environment variables from .env file (passwords, ports, etc.)
// npm install cors            # Allows frontend and backend to communicate across different ports/domains (when both run on different ports)
// npm install -D nodemon      # Automatically restarts server when code changes (development only)
// npm install -g nodemon      install  globally

// npm install express mysql2 dotenv cors   (developers install at a time)
// npm install -g nodemon

// Acquire all
const express = require('express');
const mysql = require('mysql2');
const app=express();                       // store express module in 'app' variable
const cors = require('cors');

app.use(cors());
app.use(express.json());

// step -1 start running server 
app.listen(3000,()=>{
    console.log("Server running on port 3000");
})

// step-2 create database
//step-3 Connect to database

const db=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '04082005',
    database : 'LoginPage'
})

//check if db is connected or not

db.connect((err)=>{
    if(err){
       console.log("Error connecting to database",err);
       return
    }
    console.log("Connected to database");
    
})

//step-4   Create API's

app.post('/add-user', (req,res)=>{
    console.log("Received Data:", req.body);

    const { username, password } = req.body;

    
    const query = "INSERT INTO Login(userName, password) VALUES (?, ?)";

    db.query(query, [username, password], (err, results) => {

        if (err) {
            console.log("Error occurred:", err);
            return res.status(500).send("Failed to insert data");
        }

        console.log("Created Successfully");
        console.log(results);

        res.send("Added Successfully");
        
        
    })
   
})



