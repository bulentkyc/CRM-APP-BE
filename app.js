const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({message:'Hello Bilal'}));

app.post('/register',(req, res) => {
    const {userName, pass}  = req.body;
    console.log(userName, pass);
    res.json({status: "success"});
});

app.listen(port, ()=>console.log(`CRM BE App started to work on port:${port}`))