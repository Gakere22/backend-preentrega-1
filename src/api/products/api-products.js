
const fs = require("fs")

const express = require("express")

const router = express.Router()


const archivoProductos = require("../../gestion-archivos/productos.js")

const archivoGeneral =require ("../../gestion-archivos/general.js")











router.put ("/products/:pid", (req,res)=>{
    const id = parseInt(req.params.pid)
    const data = req.body
    const products = archivoGeneral.getDataFromFile(archivoProductos.ruta)
   
    
    const index = products.findIndex((pro)=> pro.id === id)
    if (index !== -1){
         
       
        if (data.title){
            products[index].name = data.title
        }
        if(data.description){
            products[index].description = data.description
        }
        if(data.code){
            products[index].code = data.code
        }
        if(data.price){
            products[index].price = parseFloat(data.price)
        }
        if(data.status){
            products[index].status = data.status === "false"? false: true
        }
        if(data.stock){
            products[index].stock = parseInt(data.stock)
        }
        if(data.category){
            products[index].category = data.category
        }    
        
        archivoProductos.saveProductsOnFile(products)
        
        res.json({
        message: "se actualizo el producto"
        })
    }else{
        res.json({
        message: "El producto no existe"
    })
    }                         
    
})




router.get("/products", (req,res)=>{
     
    let {limit} = req.query;
    const products = archivoGeneral.getDataFromFile(archivoProductos.ruta)
    
    if(products.length !== 0){
        
        if(limit){
            limit = parseInt(limit)
            if(limit < products.length) {
                let productosFiltrados = products.slice(limit)
                res.json({...productosFiltrados})
            }else{
                res.json({message:" el parametro pasado como limiete supera la cantidad de productos exitentes"})
            }          
        }else{
            res.json({...products})
        }
    }else{
        res.send({status:"error", message:"No hay productos "})
    }
    
})


router.get("/products/:pid", (req,res)=>{
    let id = parseInt(req.params.pid)

    const products = archivoGeneral.getDataFromFile(archivoProductos.ruta)

    const product = products.find((pro)=> (pro.id===id));
    if ( product !== undefined){       
        res.json({
           product
        })
    }else{
        res.json({
            mensaje:" No existe producto con el ID"
        })
    }
})


router.post("/products", (req,res)=>{
            
            const data = req.body
            let product= {};
            let nextId = archivoProductos.getNextId()
            if (data.title){
                if(data.description){
                    if(data.code){
                        if(data.price){
                            if(data.status){
                                if(data.stock){
                                    if(data.category){
                                         product = {
                                            id: nextId,
                                            name: data.title,
                                            description: data.description,
                                            price: parseFloat(data.price),
                                            status: data.status === "false"? false: true, 
                                            stock: parseInt(data.stock),
                                            category: data.category,
                                            thumbnalis:  Boolean(data.thumbnalis)? data.thumbnalis : null 
                                        }
                                     
                                       
                                    }else{
                                        res.send({status: "error", mensaje:"El campo category es obligatorio"})
                                    }
                                }else{
                                    res.send({status: "error", mensaje:"El campo Stock es obligatorio"})
                                }
                            }else{
                                res.send({status: "error", mensaje:"El campo Status es obligatorio"})
                            }
                        }else{
                            res.send({status: "error", mensaje:"El campo Price es obligatorio"})
                        }
                    }else{
                        res.send({status: "error", mensaje:"El campo Code es obligatorio"})
                    }
                }else{
                    res.send({status: "error", mensaje:"El campo Description es obligatorio"})
                }

            }else{
                res.send({status: "error", mensaje:"El campo Name es obligatorio"})
            }

          archivoProductos.updateProduct (product, archivoProductos.ruta);
          nextId++
          
          res.send({status: "succes", mensaje:"Se dio de alta el producto"})
        
            
})




router.delete("/products/:pid",(req,res)=>{
    const id = parseInt(req.params.pid)
    products = archivoGeneral.getDataFromFile(archivoProductos.ruta)
    products =  products.filter((pro)=> pro.id !== id)
    archivoProductos.saveProductsOnFile(products)

    res.json({ message:" se borro producto"})
})


module.exports = router 
