



const fs = require ("fs")

  
 const data = require("./general")

 const ruta ='products.json'

    function  getNextId(){  //ruta
        const  products = data.getDataFromFile(ruta)   
       
        let max = 0
        if (products.length !== 0){
         
            for(i=0; i < products.length;i++){
                if(products[i].id > max){
                    max = products[i].id
                }        
            }
        max++
           
        }            
        return  max
    }
                    
    
     function updateProduct (pro){ //ruta
        
            const products = data.getDataFromFile(ruta)
            console.log(products)
            products.push(pro)
            saveProductsOnFile(products, ruta)
           
    
    }
    
    function saveProductsOnFile(products){//ruta
         try {
            fs.writeFileSync(ruta, JSON.stringify(products),null, 2)
            
        } catch (error) {
            
        }
    
    }
    
    const obj = {
        id: 1,
        title:  "cambio  numero 100005",
        description: " cambio descripcion nueva",
        code:"10ajdh",
        price: 9,
        status: true,
        stock:10 ,
        category:"paquetes",
        thumbnalis:""
    }
  
const arreglo = [obj]

async function createInitialBase ()  {
    const datosJson = JSON.stringify(arreglo)
    
    if (!fs.existsSync(ruta)){
        fs.writeFileSync(ruta, datosJson,null,2)
        
        
    }else{
        console.log("el archivo PRODUCTOS tiene contenido")
    }

}






console.log(ruta)


module.exports = {ruta}



module.exports = {
    saveProductsOnFile, 
    updateProduct,
    getNextId,
    ruta,
    createInitialBase,
}

