for(let a = 0; a<11; a++){
    console.log(a);
}



let objeto = {
    nombre: "Juan",
    Apellido: "Perez",
    Edad: 23
}
for(let propiedad in objeto){
    console.log(objeto[propiedad]);
}



let arrays = [1,2,3,4,5]
for(let numero in arrays){
    console.log(arrays[numero])
}



let string = "Curso web"
for(let prop in string){
    console.log(string[prop])
}


let array = [1,2,3,4,5]
array.forEach(
    function(array){
        console.log(array)
    }
)