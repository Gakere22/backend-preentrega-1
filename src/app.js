



const express = require('express');

const productsRouter = require ("./api/products/api-products.js")
const cartsRouter = require ("./api/carts/api-carts.js")

const app = express();
const PORT = 8080;

app.use(express.json()) // esta linea es para poder enviar inpormacion en el body de la request
app.use(express.urlencoded({extended:true}))  // esta linea es para que la paliccion entienda los parametros que viajan por la url


app.use("/", productsRouter);
app.use("/", cartsRouter);


const server = app.listen(PORT, ()=>(console.log("levanto el servidor")));
console.log("donde estoy")