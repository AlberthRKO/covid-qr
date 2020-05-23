
$(document).ready(function () {

    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        
        let confirmadosAhora = document.querySelector('#tablaAhora')
        let suma=0;
        let suma2=0;
        let sumaFinal=0;
        let sumaS=0;
        let suma2S=0;
        let sumaFinalS=0;
        let sumaM=0;
        let suma2M=0;
        let sumaFinalM=0;
        for(let pacientes of Object.keys(data['confirmados'][0]['dep'])){
            let numeros = data['confirmados'][0]['dep'][pacientes];
            let numerosAnt = data['confirmados'][1]['dep'][pacientes];
            let numerosS = data['sospechosos'][0]['dep'][pacientes];
            let numerosAntS = data['sospechosos'][1]['dep'][pacientes];
            let numerosM = data['decesos'][0]['dep'][pacientes];
            let numerosAntM = data['decesos'][1]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            suma += numeros;
            suma2 += numerosAnt;
            sumaFinal = suma - suma2

            sumaM += numerosM;
            suma2M += numerosAntM;
            sumaFinalM = sumaM - suma2M

            sumaS += numerosS;
            suma2S += numerosAntS;
            sumaFinalS = sumaS - suma2S

            confirmadosAhora.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${sumaFinal}</td>
                    <td>${sumaFinalS}</td>
                    <td>${sumaFinalM}</td>
                </tr>
            `
            
        }
        // console.log(suma)
        // console.log(suma-suma2)
        // confirmadosAhora.innerHTML = `${suma-suma2}`
    })





    // Suma detallada
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        
        let confirmadosAhora = document.querySelector('#nConfirmadosAhora')
        let suma=0;
        let suma2=0;
        for(let pacientes of Object.keys(data['confirmados'][0]['dep'])){
            let numeros = data['confirmados'][0]['dep'][pacientes];
            let numerosAnt = data['confirmados'][0]['dep'][pacientes]
            // console.log(pacientes,numeros)
            
            suma += numeros;
            suma2 += numerosAnt;
            
        }
        // console.log(suma)
        // console.log(suma-suma2)
        confirmadosAhora.innerHTML = `${suma-suma2}`
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        
        let confirmadosAhoraS = document.querySelector('#nConfirmadosAhoraS')
        let suma=0;
        let suma2=0;
        for(let pacientes of Object.keys(data['sospechosos'][0]['dep'])){
            let numeros = data['sospechosos'][0]['dep'][pacientes];
            let numerosAnt = data['sospechosos'][1]['dep'][pacientes]
            // console.log(pacientes,numeros)
            
            suma += numeros;
            suma2 += numerosAnt;
            
        }
        // console.log(suma)
        // console.log(suma-suma2)
        confirmadosAhoraS.innerHTML = `${suma-suma2}`
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        
        let confirmadosAhoraM = document.querySelector('#nConfirmadosAhoraM')
        let suma=0;
        let suma2=0;
        for(let pacientes of Object.keys(data['decesos'][0]['dep'])){
            let numeros = data['decesos'][0]['dep'][pacientes];
            let numerosAnt = data['decesos'][1]['dep'][pacientes]
            // console.log(pacientes,numeros)
            
            suma += numeros;
            suma2 += numerosAnt;
            
        }
        // console.log(suma)
        // console.log(suma-suma2)
        confirmadosAhoraM.innerHTML = `${suma-suma2}`
    })



    // Suma de contagiados
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let fechaCo=data['confirmados'][0]['fecha'];
        let fechas = document.querySelector('#fechaCovid2');
        fechas.innerHTML=`${fechaCo}`;
        let confirmados = document.querySelector('#nConfirmados')
        let suma=0;
        for(let pacientes of Object.keys(data['confirmados'][0]['dep'])){
            let numeros = data['confirmados'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            suma += numeros;
            
        }
        // console.log(suma)
        confirmados.innerHTML =  `${suma}`
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let recuperados = document.querySelector('#nRecuperados')
        let suma=0;
        for(let pacientes of Object.keys(data['recuperados'][0]['dep'])){
            let numeros = data['recuperados'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            suma += numeros;
            
        }
        // console.log(suma)
        recuperados.innerHTML = `${suma}`
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let muertos = document.querySelector('#nMuertos')
        let suma=0;
        for(let pacientes of Object.keys(data['decesos'][0]['dep'])){
            let numeros = data['decesos'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            suma += numeros;
            
        }
        // console.log(suma)
        muertos.innerHTML = `${suma}`
    })




    // detalles de contagiados

    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let fechaCo=data['confirmados'][0]['fecha'];
        let lista = document.querySelector('#contenido');
        let fechas = document.querySelector('#fechaCovid');
        lista.innerHTML='';
        fechas.innerHTML=`${fechaCo}`;
        for(let pacientes of Object.keys(data['confirmados'][0]['dep'])){
            let numeros = data['confirmados'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
        }
    })

    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let lista = document.querySelector('#contenido2');
        lista.innerHTML='';
        for(let pacientes of Object.keys(data['decesos'][0]['dep'])){
            let numeros = data['decesos'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
        }
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let lista = document.querySelector('#contenido3');
        lista.innerHTML='';
        for(let pacientes of Object.keys(data['recuperados'][0]['dep'])){
            let numeros = data['recuperados'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
        }
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let lista = document.querySelector('#contenido4');
        lista.innerHTML='';
        for(let pacientes of Object.keys(data['sospechosos'][0]['dep'])){
            let numeros = data['sospechosos'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
        }
    })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let lista = document.querySelector('#contenido5');
        lista.innerHTML='';
        for(let pacientes of Object.keys(data['descartados'][0]['dep'])){
            let numeros = data['descartados'][0]['dep'][pacientes];
            // console.log(pacientes,numeros)
            
            lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
        }
    })

});


//mediante un boton
/* document.querySelector('#botonCapo').addEventListener('click', traer)
function traer(){
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
    .then(res => res.json())
    .then(data => {
        let fechaCo=data['confirmados'][0]['fecha'];
        let lista = document.querySelector('#contenido');
        let fechas = document.querySelector('#fechaCovid');
        lista.innerHTML='';
        fechas.innerHTML=`${fechaCo}`;
        for(let pacientes of Object.keys(data['confirmados'][0]['dep'])){
            let numeros = data['confirmados'][0]['dep'][pacientes];
            console.log(pacientes,numeros)
            
            lista.innerHTML += `


								
								<tr>
									<th>${pacientes}</th>
									<td>${numeros}</td>
									<td>14/05/2020</td>
									<td><button type="button" class="btn btn-info btn-">Mensaje</button></td>
								</tr>
								

            `
        }
    })
} */