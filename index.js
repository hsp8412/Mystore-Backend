const express = require("express");
const app = express();

const products = [
    { id : 1, name: "Macbook Air", price: 1000},
    {id: 2, name: "Lamp", price: 20},
    {id: 3, name: "Mouse", price: 60}
]

app.get("/", (req, res)=>{
    res.send("Hello World!!");
});


app.get("/api/products", (req,res)=>{
    res.send([1,2,3]);
});

app.get("/api/products/:id", (req,res)=>{
    const product = products.find(p=>p.id === parseInt(req.params.id));
    if(!product) res.status(404).send("The product with the given id is not found!");
    res.send(product);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening to port ${port}...`))