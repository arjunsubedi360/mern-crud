const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env'});
// require('./db/conn.js');
const User = require('./models/userSchema');

app.use(express.json());

// we link the router file to make code clean
app.use(require('./router/auth'));


const PORT = process.env.PORT;




app.get('/', (req,res) => {
    res.send(`Hello world from the server`);
});

// app.get('/about/',  (req,res) => {
//     console.log("Hello my About");
//     res.send('This is About  page');
// });

app.get('/contact/', (req,res) => {
    res.send('This is Contact  page');
});

app.get('/signin/', (req,res) => {
    res.send('This is sign  page');
});


app.get('/signup/', (req,res) => {
    res.send('This is register  page');
});

// const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(() => {
    console.log(`connection succesful`);
    app.listen(PORT, () =>{
    console.log(`The server is running in port ${PORT}`);
})
}).catch((err) => console.log(`no connection`));

