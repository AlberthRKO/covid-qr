
$(document).ready(function () {




    // llenado de tabla actual
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {

            let confirmadosAhora = document.querySelector('#tablaAhora')
            let sumaFinal = 0;
            let sumaFinalR = 0;
            let sumaFinalM = 0;
            for (let pacientes of Object.keys(data['confirmados'][0]['dep'])) {
                let numeros = data['confirmados'][0]['dep'][pacientes];
                let numerosAnt = data['confirmados'][1]['dep'][pacientes];
                let numerosR = data['recuperados'][0]['dep'][pacientes];
                let numerosAntR = data['recuperados'][1]['dep'][pacientes];
                let numerosM = data['decesos'][0]['dep'][pacientes];
                let numerosAntM = data['decesos'][1]['dep'][pacientes];
                // console.log(pacientes,numeros)

                // conteo de Confirmados
                sumaFinal = numeros - numerosAnt

                // Conteo de muertos
                sumaFinalM = numerosM - numerosAntM
                // conteo de Recuperados
                sumaFinalR = numerosR - numerosAntR

                // Agregabdi a las tablas ciando el dato sea 0

                if (sumaFinal <= 0 && sumaFinalR<=0 && sumaFinalM<=0) {
                        let numeros = data['confirmados'][1]['dep'][pacientes];
                        let numerosAnt = data['confirmados'][2]['dep'][pacientes];
                        let numerosR = data['recuperados'][1]['dep'][pacientes];
                        let numerosAntR = data['recuperados'][2]['dep'][pacientes];
                        let numerosM = data['decesos'][1]['dep'][pacientes];
                        let numerosAntM = data['decesos'][2]['dep'][pacientes];
                        // console.log(pacientes,numeros)

                        // conteo de Confirmados
                        sumaFinal = numeros - numerosAnt

                        // Conteo de muertos
                        sumaFinalM = numerosM - numerosAntM
                        // conteo de Recuperados
                        sumaFinalR = numerosR - numerosAntR
                        console.log(sumaFinal, sumaFinalM , sumaFinalR)
                }


                confirmadosAhora.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${sumaFinal}</td>
                    <td>${sumaFinalR}</td>
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
            let suma = 0;
            let suma2 = 0;
            for (let pacientes of Object.keys(data['confirmados'][0]['dep'])) {
                let numeros = data['confirmados'][0]['dep'][pacientes];
                let numerosAnt = data['confirmados'][1]['dep'][pacientes]
                // console.log(pacientes,numeros)

                suma += numeros;
                suma2 += numerosAnt;

            }

            // Aprobar 
            let conteoFinal = suma - suma2
            if (conteoFinal <= 0) {
                for (let pacientes of Object.keys(data['confirmados'][0]['dep'])) {
                    let numeros = data['confirmados'][1]['dep'][pacientes];
                    let numerosAnt = data['confirmados'][2]['dep'][pacientes]
                    // console.log(pacientes,numeros)

                    suma += numeros;
                    suma2 += numerosAnt;

                }
            }
            // console.log(suma)
            // console.log(suma-suma2)
            confirmadosAhora.innerHTML = `${suma - suma2}`
        })


    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {

            let confirmadosAhoraS = document.querySelector('#nConfirmadosAhoraS')
            let suma = 0;
            let suma2 = 0;
            for (let pacientes of Object.keys(data['recuperados'][0]['dep'])) {
                let numeros = data['recuperados'][0]['dep'][pacientes];
                let numerosAnt = data['recuperados'][1]['dep'][pacientes]
                // console.log(pacientes,numeros)

                suma += numeros;
                suma2 += numerosAnt;

            }

            let conteoFinal = suma - suma2
            if (conteoFinal <= 0) {
                for (let pacientes of Object.keys(data['recuperados'][0]['dep'])) {
                    let numeros = data['recuperados'][1]['dep'][pacientes];
                    let numerosAnt = data['recuperados'][2]['dep'][pacientes]
                    // console.log(pacientes,numeros)

                    suma += numeros;
                    suma2 += numerosAnt;

                }
            }

            // console.log(suma)
            // console.log(suma-suma2)
            confirmadosAhoraS.innerHTML = `${suma - suma2}`
        })

    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {

            let confirmadosAhoraM = document.querySelector('#nConfirmadosAhoraM')
            let suma = 0;
            let suma2 = 0;
            for (let pacientes of Object.keys(data['decesos'][0]['dep'])) {
                let numeros = data['decesos'][0]['dep'][pacientes];
                let numerosAnt = data['decesos'][1]['dep'][pacientes]
                // console.log(pacientes,numeros)

                suma += numeros;
                suma2 += numerosAnt;

            }

            // Agregando condicion si llega a aver 0 pacientees
            let conteoFinal = suma - suma2
            if (conteoFinal <= 0) {
                for (let pacientes of Object.keys(data['decesos'][0]['dep'])) {
                    let numeros = data['decesos'][1]['dep'][pacientes];
                    let numerosAnt = data['decesos'][2]['dep'][pacientes]
                    // console.log(pacientes,numeros)

                    suma += numeros;
                    suma2 += numerosAnt;

                }
            }


            // console.log(suma)
            // console.log(suma-suma2)
            confirmadosAhoraM.innerHTML = `${suma - suma2}`
        })



    // Suma de contagiados
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {
            let fechaCo = data['confirmados'][0]['fecha'];
            let fechas = document.querySelector('#fechaCovid2');
            fechas.innerHTML = `${fechaCo}`;
            let confirmados = document.querySelector('#nConfirmados')
            let suma = 0;
            for (let pacientes of Object.keys(data['confirmados'][0]['dep'])) {
                let numeros = data['confirmados'][0]['dep'][pacientes];
                // console.log(pacientes,numeros)

                suma += numeros;

            }
            // console.log(suma)
            confirmados.innerHTML = `${suma}`
        })
    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {
            let recuperados = document.querySelector('#nRecuperados')
            let suma = 0;
            for (let pacientes of Object.keys(data['recuperados'][0]['dep'])) {
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
            let suma = 0;
            for (let pacientes of Object.keys(data['decesos'][0]['dep'])) {
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
            let fechaCo = data['confirmados'][0]['fecha'];
            let lista = document.querySelector('#contenido');
            let fechas = document.querySelector('#fechaCovid');
            lista.innerHTML = '';
            fechas.innerHTML = `${fechaCo}`;
            for (let pacientes of Object.keys(data['confirmados'][0]['dep'])) {
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
            lista.innerHTML = '';
            for (let pacientes of Object.keys(data['decesos'][0]['dep'])) {
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
            lista.innerHTML = '';
            for (let pacientes of Object.keys(data['recuperados'][0]['dep'])) {
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
    /* fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {
            let lista = document.querySelector('#contenido4');
            lista.innerHTML = '';
            for (let pacientes of Object.keys(data['sospechosos'][0]['dep'])) {
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
            lista.innerHTML = '';
            for (let pacientes of Object.keys(data['descartados'][0]['dep'])) {
                let numeros = data['descartados'][0]['dep'][pacientes];
                // console.log(pacientes,numeros)

                lista.innerHTML += `		
                <tr>
                    <th>${pacientes}</th>
                    <td>${numeros}</td>
                </tr>
            `
            }
        }) */   //La api no actualiza ahora estados de sospechosos y descartados

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