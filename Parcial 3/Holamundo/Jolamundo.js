const express = require ("express");
const app = express();

app.get('/',(req,res)=>{
    res.send('Hola Mundo')
})
app.listen(8001,()=>{
    console.log(`Hola Mundo en el puerto : ${8001}`)
})