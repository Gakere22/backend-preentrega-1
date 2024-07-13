


const fs = require ('fs');





/*
function initializeFile (ruta) {
    try {
        if(!fs.existsSync(ruta)) {
            fs.writeFileSync(ruta, JSON.stringify(arreglo),null,2)
            console.log("creo el archivo")
        }else{
            console.log("existe el arhcivo")
        }
        
    } catch (error) {
        console.error(error)
    }
}

*/

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
    

async function createInitialBase (ruta)  {
    const datosJson = JSON.stringify(arreglo)
    
    if (!fs.existsSync(ruta)){
        fs.writeFileSync(ruta, datosJson,null,2)
        console.log("inicializo el arcivo") // sacar
        
    }else{
        console.log("el archivo tiene contenido")
    }

}



 

 const getDataFromFile = (ruta)=>{
    try { 
       const data = fs.readFileSync(ruta ,"utf8")
       const dataParseada = JSON.parse(data)
       return dataParseada
    } catch (error) {
        console.error(error)
    }

} 

module.exports= {
    //initializeFile,
    createInitialBase,
    getDataFromFile
}

