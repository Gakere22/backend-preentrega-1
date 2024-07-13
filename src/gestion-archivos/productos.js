



const fs = require ("fs")

  
 const data = require("./general")

 const ruta ='products.json'
   //QUE PASA ACA?????
    function  getNextId(){  //ruta
        const  products = data.getDataFromFile(ruta)   
        console.log("etoy en id")
        console.log(products)
        let max = 0
        if (products.length !== 0){
        console.log("estoy en get id ")
            
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
            console.log("se guardo el archivo")
        } catch (error) {
            
        }
    
    }
    
  



console.log(ruta)


module.exports = {ruta}



module.exports = {
    saveProductsOnFile, 
    updateProduct,
    getNextId,
    ruta
}

