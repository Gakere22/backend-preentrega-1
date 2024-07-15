

const fs = require("fs")


const express = require('express');

const productsRouter = require ("./api/products/api-products.js")
const cartsRouter = require ("./api/carts/api-carts.js");

const archivoGeneral = require("./gestion-archivos/general.js");

const archivoProductos = require ("./gestion-archivos/productos.js");

const archivoCarts = require("./gestion-archivos/carts.js")

const { error } = require("console");

const rutePro = archivoProductos.ruta


const ruteCart = archivoCarts.ruta


archivoProductos.createInitialBase()

archivoCarts.createInitialBase()

console.log("levanto la data de productos ")

console.log("esta es la ruta")

console.log(rutePro)


const productos = archivoGeneral.getDataFromFile(rutePro)

console.log(productos)

console.log("levanto la data de cart ")

console.log("esta es la ruta")

console.log(ruteCart)

const carts = archivoGeneral.getDataFromFile(ruteCart)

console.log(carts)


/*
const productos = archivoGeneral.getDataFromFile(rutePro)

console.log(productos)
*/


/*
productos
.then(val=>console.log(val))
*/




let nextIdPro = archivoProductos.getNextId()

console.log(nextIdPro)







/*
const datos = [
    {name:"nahuel",
     last:"varas"

    },
    {name:"Toro",
    last:"varas"
   
    },
    {name:"Suri",
        last:"varas"
       
        }
]

//const ruta = "C:\archivos bckp\documentos\CODERHOUSE\BACKEND I\PREENTREGA1\src\archivos\productos.json"
const datosJson = JSON.stringify(datos)


//console.log(ruta)

console.log(rute)

const escribir = async (data)=>{
    
    await fs.promises.writeFile(rute, data, "utf8", 0o666,"w")
    console.log("guarde los datos del productos")
    
}



let nro = 0
    while(nro <= 3 ){
        escribir (datosJson)  
        nro++      
    }
*/
/*
const dameData = async (rute)=>{
     const data = await fs.promises.readFile(rute, "utf8","r")
     console.log(data)
     return  JSON.parse(data)
        /*
        if(err){
            console.error(err)
        }else{
            console.log(data)
            return JSON.parse(data)
        }

    }

dameData(rute)
*/




/*
const eliminarArchivo = (ruta)=>{

    fs.unlink(ruta,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("se elimino el archivo ")
        }

    })
}

eliminarArchivo(rute)
*/

const app = express();
const PORT = 8080;

app.use(express.json()) // esta linea es para poder enviar inpormacion en el body de la request
app.use(express.urlencoded({extended:true}))  // esta linea es para que la paliccion entienda los parametros que viajan por la url


app.use("/", productsRouter);
app.use("/", cartsRouter);



const server = app.listen(PORT, ()=>(console.log("levanto el servidor")));
console.log("donde estoy")