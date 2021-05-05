function toMinutes(seconds){
   
   var minutes = seconds / 60;
    var resto = seconds % 60; 
    
    // Will display time in 10:30:23 format
    var formattedTime = new Date(seconds * 1000).toISOString().substr(11, 8);
    return formattedTime;
   }

function tempo(lista){
    let primeiro = lista[0];
    let lista_retorna=[];
    lista.map(item => {
        
        let resultado = item -primeiro;
        var minuto= toMinutes(resultado);
        lista_retorna.push(minuto);
    });
 

    return lista_retorna;
}

export {toMinutes, tempo};