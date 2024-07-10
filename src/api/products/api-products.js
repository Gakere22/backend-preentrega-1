
const express = require("express")

const router = express.Router()

//estos dos van en el archivo
let products = [];
let  idProduct = 0;

router.put ("/products/:píd", (req,res)=>{
    const id = parseInt(req.params.píd)
    const data = req.body
    console.log("levanto los valores del cambio")

    res.json({
        message: "anda el put"
       })
})




router.get("/products", (req,res)=>{
     
    let {limit} = req.query;
    
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
    let id = parseInt(req.params.pid); 
    const product = products.find((pro)=> (pro.id===id));
    if ( product !== undefined){       
        res.json({
           product
        })
    }else{
        res.json({
            mensaje:" no se envia nada"
        })
    }
})


router.post("/products", (req,res)=>{
            //debo traer el id para agregarlo al producot
            const data = req.body
            let product= {};
            idProduct++;
            if (data.title){
                if(data.description){
                    if(data.code){
                        if(data.price){
                            if(data.status){
                                if(data.stock){
                                    if(data.category){
                                         product = {
                                            id:idProduct,
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

          products.push(product);
          res.send({status: "succes", mensaje:"Sedio de alta el producto"})
        
         
          
            
            
})



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