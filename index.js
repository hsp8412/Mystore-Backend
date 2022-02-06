const Joi = require("joi");
const express = require("express");
const app = express();


app.use(express.json());

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


app.post("/api/products", (req,res)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().min(10).max(11).required()
    })

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(product);
    res.send(product);
})


app.get("/api/products/:id", (req,res)=>{
    const product = products.find(p=>p.id === parseInt(req.params.id));
    if(!product) res.status(404).send("The product with the given id is not found!");
    res.send(product);
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening to port ${port}...`))