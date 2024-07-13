

const fs = require("fs")


const express = require("express")


const router = express.Router()


let index = 0

let carts = []

router.post("/carts", (req,res)=>{

    index++;
    const products = []
    const cart = {id:index, products}
    carts.push(cart)// carst lo traigo dle archivo

    res.json({message:" se dio de alta"}) //devoverl con estatus

})

router.post("/carts/:cid/products/:pid",(req,res)=>{
    const cId = parseInt(req.params.cid);
    const id = parseInt(req.params.pid);
   
    if (carts.length !== 0){    
        let cart = carts.find((carro)=> carro.id === cId)
        console.log(`el carrito esta en ${cart}`)//sacar
        if (cart !== undefined){
            let productIndex = cart.products.findIndex((pro)=> pro.id === id )
            
            if (productIndex !== -1){
                cart.products[productIndex].quantity++ 
                console.log(`cantidad ${cart.products[productIndex].quantity++ }`) //sacar
                res.json({status: "success", message:"se modificao la cantidad el producto"})
            }else{
                let product = {id, quantity: 1}
                cart.products.push(product)
                res.json({status: "success", message:"se agrego el producto al carrito"})
            }
        }else{
            res.json({message: "el id del carrito no exixte"})
        }
    }else{
        res.json({message:"no hay carritos generados"})
    }


})

router.get("/carts", (req,res)=> {

    res.json({...carts})
})

router.get("/carts/:cid", (req,res)=>{
    const cId = parseInt(req.params.cid)
    if (carts.length !== 0){    
        let cart = carts.find((carro)=> carro.id === cId)
        if (cart !== undefined){
            res.json({...cart.products})
        }else{
            res.json({message: "el id del carrito no exixte"})
        }
    }
})



/*
router.get("/carts", (req,res)=>{


})
    */
module.exports = router