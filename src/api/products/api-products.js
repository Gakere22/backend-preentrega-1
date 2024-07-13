
const fs = require("fs")

const express = require("express")

const router = express.Router()


const archivoProductos = require("../../gestion-archivos/productos.js")

const archivoGeneral =require ("../../gestion-archivos/general.js")

//estos dos van en el archivo









router.put ("/products/:pid", (req,res)=>{
    const id = parseInt(req.params.pid)
    const data = req.body
    const products = archivoGeneral.getDataFromFile(archivoProductos.ruta)
    console.log("estoy en el put")
    console.log(id)
    console.log(products)
    const index = products.findIndex((pro)=> pro.id === id)
    if (index !== -1){
         
        console.log("levanto los valores del cambio")
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
        
        archivoProductos.saveProductsOnFile(products,archivoProductos.ruta)
        
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
    console.log("estoy buscando ldo productos")
    if(products.length !== 0){
        console.log(products)    //sacar
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
            mensaje:" No existe producto con ese ID"
        })
    }
})


router.post("/products", (req,res)=>{
            //debo traer el id para agregarlo al producot
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
          console.log("incremento id productos") //sacar
          res.send({status: "succes", mensaje:"Sedio de alta el producto"})
        
            
})


//se elimina el codigo
/*
router.put("/:píd", (req,res)=>{
    const id = parseInt(req.params.id)
    const data = req.body
    console.log("levanto los valores del cambio")
   
    // traigo los productos desde el archivo
    
    const product = {}
    

    if(products.length !== 0 ){
    //array productos y buscar producto por id
        const index = products.findIndex((prod)=>(prod.id === id))
        
            if (index !== -1){
            product = products[index]
            console.log("encontre el producto")
            if ((data.title) && (data.title !== product.name)){
                product.name = data.title
                console.log("encontre el nombre")
            }
            if((data.description) && (data.description !== product.description)){
                product.description = data.description
                console.log("encontre el cambio descripcion")
            }    
            if((data.code) && (data.code !== product.code)){
                product.code = data.code   
                console.log("encontre el codigo")
            } 
            if((data.price) && (data.price!== product.price)){
                product.price = parseFloat(data.price)   
                console.log("cambio el precio ") 
            }    
            if((data.status) && (data.status !== product.status)){
                product.status = (data.status === "false"? false : true) 
                console.log("cambio el status")
                    
            }    
            if((data.stock) && (data.stock !== product.stock)){
                product.stock = parseInt(data.stock)    
                console.log("cambio el stock")
            }  
            if((data.category) && (data.category !== product.category)){
                product.category = data.category    
                console.log("cambio el categoria")
            }  
            if((data.thumbnalis) && (data.thumbnalis !== product.thumbnalis)){
                product.thumbnalis = data.thumbnalis  
                console.log("cambio el image")  
            }  
            
            res.send({status:"success", message:"se modifico el productos"})

        }else{
            res.send({status:"error", menssage:"el produto no existe"})
        }
    }else{
        res.send({status:"error", menssage:"la lsita de productos eta vacia"})
    }
    // si el producto existe modificarlo si no existe devolver mensaje que no existe
    
   res.json({
    message: "anda el put"
   })
})
*/


router.delete("/products/:pid",(req,res)=>{
    const id = parseInt(req.params.pid)
    products =  products.filter((pro)=> pro.id !== id)
 

    res.json({ message:" se borro"})
})


module.exports = router 
