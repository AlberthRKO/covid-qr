$(document).ready(function () {





    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {





            var confirmados = new Array();
            var recuperados = new Array();
            var decesos = new Array();

            // recorremos todo lo que hay en el data
            for (let item of Object.keys(data['confirmados'])) {
                // console.log(data['confirmados'][item])
                let suma = 0;
                let sumaR = 0;
                let sumaM = 0;
                for (let pacientes of Object.keys(data['confirmados'][item]['dep'])) {
                    let numeros = data['confirmados'][item]['dep'][pacientes];
                    let numerosR = data['recuperados'][item]['dep'][pacientes];
                    let numerosM = data['decesos'][item]['dep'][pacientes];

                    suma += numeros;
                    sumaR += numerosR;
                    sumaM += numerosM;
                    // console.log(numeros)

                }

                confirmados.push(suma);
                recuperados.push(sumaR);
                decesos.push(sumaM);
                // console.log(suma, sumaR, sumaM)


            }

            // console.log(confirmados)

            var fechas = new Array();
            let fechaFormato = '';
            for (let item2 of Object.keys(data['confirmados'])) {
                // console.log(data['confirmados'][item2]['fecha'])


                // damos formato a las fechas
                // dateFormat indicamos el formato poniendo month en texto y dia en numerico
                fechaFormato = moment(data['confirmados'][item2]['fecha']).format('DD/MM')


                fechas.push(fechaFormato);
            }


            // console.log(fechas)



            function totalCasesChart(ctx) {

                // Creamos la grafica
                // new mandamos el contexto de donde se dibujara el chart y luego la configuracion
                const chart = new Chart(ctx, {


                    // El tipo de grafica
                    type: 'line',
                    // data.. informacion que pondremos en el nivel X y Y
                    data: {
                        // eje X labels
                        // usaremos map que iterara todos los elementos
                        // convertimos la fecha a formato valido con api del navegador
                        // data.confirmados.map(items => new Intl.DateTimeFormat().format(new Date(items.fecha)))
                        labels: fechas.reverse(),
                        // dataset para los graficos
                        datasets: [
                            {
                                // dato y la grafica
                                label: 'Confirmados',
                                borderColor: '#6E3DCC',
                                backgroundColor: '#6E3DCC',
                                data: confirmados.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Recuperados',
                                borderColor: '#00A04E',
                                backgroundColor: '#00A04E',
                                data: recuperados.reverse()
                            },
                            {
                                // dato y la grafica
                                label: 'Muertes',
                                borderColor: '#ED1C24',
                                backgroundColor: '#ED1C24',
                                data: decesos.reverse()
                            }
                        ]

                    },
                    // opciones de mejora
                    options: {
                        title: {
                            display: true,
                            text: 'Casos de Covid en Bolivia',
                            fontSize: 25,
                            padding: 20,
                            fontColor: '#217EFF',
                            fontFamily: 'Poppins'
                        },
                        legend: {
                            position: 'bottom',
                            // labels de la leyenda
                            labels: {
                                padding: 20,
                                boxWidth: 18,
                                fontFamily: 'Poppins',
                                fontColor: '#1a1a1a',
                                fontSize: 12
                            }
                        },
                        // layout: {
                        //     padding: {
                        //         right: 50
                        //     }
                        // },
                        tooltips: {
                            backgroundColor: '#fff',
                            borderColor: '#217EFF',
                            borderWidth: 0.5,
                            titleFontSize: 15,
                            xPadding: 10,
                            yPadding: 10,
                            bodyFontSize: 12,
                            titleFontColor: '#1a1a1a',
                            bodyFontColor: "#1a1a1a",
                            intersect: false,
                            // multiKeyBackground: '#1a1a1a',
                            mode: 'index',
                        },
                        // quitamos las lineas del ejeX
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        elements: {
                            // linea de la grafica
                            line: {
                                borderWidth: 4,
                                fill: false, //anulamos el gris transparente
                            },
                            // puntos de la grafica
                            point: {
                                radius: 3,
                                borderWidth: 2,
                                // backgroundColor: 'white'

                            }
                        }
                    }
                })
            }


            function renderCharts() {
                const ctx = document.querySelector('#chart').getContext('2d')
                totalCasesChart(ctx)
            }

            renderCharts()



        })





    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {





            var confirmados = new Array();
            var recuperados = new Array();
            var decesos = new Array();

            // recorremos todo lo que hay en el data
            for (let item of Object.keys(data['confirmados'])) {
                // console.log(data['confirmados'][item])
                let suma = 0;
                let sumaR = 0;
                let sumaM = 0;

                for (let pacientes of Object.keys(data['confirmados'][item]['dep'])) {
                    let numeros = data['confirmados'][item]['dep'][pacientes];
                    let numerosR = data['recuperados'][item]['dep'][pacientes];
                    let numerosM = data['decesos'][item]['dep'][pacientes];

                    suma += numeros;
                    // suma2 += numerosAnt;
                    sumaR += numerosR;
                    sumaM += numerosM;
                    // console.log(numeros)



                }

                confirmados.push(suma);
                recuperados.push(sumaR);
                decesos.push(sumaM);
                // console.log(suma)


            }
            var confirmadosporDia = new Array();
            for (let i = 0; i < confirmados.length; i++) {

                confirmadosporDia.push(confirmados[i] - confirmados[i + 1])
            }
            var recuperadosporDia = new Array();
            let conteo = 0;
            for (let i = 0; i < recuperados.length; i++) {
                conteo = recuperados[i] - recuperados[i + 1]
                if (conteo < 0) {
                    conteo = 0;
                }
                recuperadosporDia.push(conteo)
            }
            var fallecidosporDia = new Array();
            for (let i = 0; i < decesos.length; i++) {

                fallecidosporDia.push(decesos[i] - decesos[i + 1])
            }
            // console.log(confirmadosporDia)
            // console.log(confirmadosporDia2)

            // console.log(confirmados)

            var fechas = new Array();
            for (let item2 of Object.keys(data['confirmados'])) {
                // console.log(data['confirmados'][item2]['fecha'])


                // damos formato a las fechas
                // dateFormat indicamos el formato poniendo month en texto y dia en numerico
                // fechaFormato = new Intl.DateTimeFormat('es-BO', { month: 'long', day: 'numeric' }).format(new Date(data['confirmados'][item2]['fecha']))

                // fechaFormato = new Intl.DateTimeFormat('es-BO', { month: 'long', day: 'numeric' }).format(new Date(data['confirmados'][item2]['fecha']))
                // console.log(fechaFormato)

                // dando formato con momentJS
                fechas.push(moment(data['confirmados'][item2]['fecha']).format('DD/MM'));
            }


            // console.log(fechas)



            function totalCasesChart(ctx) {

                // Creamos la grafica
                // new mandamos el contexto de donde se dibujara el chart y luego la configuracion
                const chart = new Chart(ctx, {


                    // El tipo de grafica
                    type: 'bar',
                    // data.. informacion que pondremos en el nivel X y Y
                    data: {
                        // eje X labels
                        // usaremos map que iterara todos los elementos
                        // convertimos la fecha a formato valido con api del navegador
                        // data.confirmados.map(items => new Intl.DateTimeFormat().format(new Date(items.fecha)))
                        labels: fechas.reverse(),
                        // dataset para los graficos
                        datasets: [
                            {
                                // dato y la grafica
                                label: 'Confirmados',
                                borderColor: '#6E3DCC',
                                backgroundColor: '#6E3DCC',
                                data: confirmadosporDia.reverse(),

                            }
                        ]

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Confirmados de Covid en Bolivia',
                            fontSize: 25,
                            padding: 20,
                            fontColor: '#217EFF',
                            fontFamily: 'Poppins'
                        },
                        legend: {
                            position: 'bottom',
                            // labels de la leyenda
                            labels: {
                                padding: 20,
                                boxWidth: 18,
                                fontFamily: 'Poppins',
                                fontColor: '#1a1a1a',
                                fontSize: 12
                            }
                        },
                        // layout: {
                        //     padding: {
                        //         right: 50
                        //     }
                        // },
                        tooltips: {
                            backgroundColor: '#fff',
                            borderColor: '#217EFF',
                            borderWidth: 0.5,
                            titleFontSize: 15,
                            xPadding: 10,
                            yPadding: 10,
                            bodyFontSize: 12,
                            titleFontColor: '#1a1a1a',
                            bodyFontColor: "#1a1a1a",
                            intersect: false,
                            // multiKeyBackground: '#1a1a1a',
                            mode: 'index',
                        },
                        // quitamos las lineas del ejeX
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        elements: {
                            // linea de la grafica
                            line: {
                                borderWidth: 4,
                                fill: false, //anulamos el gris transparente
                            },
                            // puntos de la grafica
                            point: {
                                radius: 3,
                                borderWidth: 2,
                                // backgroundColor: 'white'

                            }
                        }
                    }

                })
            }

            // console.log(recuperadosporDia)

            function totalCasesChart2(ctx2) {

                // Creamos la grafica
                // new mandamos el contexto de donde se dibujara el chart y luego la configuracion
                const chart = new Chart(ctx2, {


                    // El tipo de grafica
                    type: 'bar',
                    // data.. informacion que pondremos en el nivel X y Y
                    data: {
                        // eje X labels
                        // usaremos map que iterara todos los elementos
                        // convertimos la fecha a formato valido con api del navegador
                        // data.confirmados.map(items => new Intl.DateTimeFormat().format(new Date(items.fecha)))
                        labels: fechas.reverse(),
                        // dataset para los graficos
                        datasets: [
                            {
                                // dato y la grafica
                                label: 'Recuperados',
                                borderColor: '#00A04E',
                                backgroundColor: '#00A04E',
                                data: recuperadosporDia.reverse(),

                            }
                        ]

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Recuperados de Covid por Día',
                            fontSize: 25,
                            padding: 20,
                            fontColor: '#00A04E',
                            fontFamily: 'Poppins'
                        },
                        legend: {
                            position: 'bottom',
                            // labels de la leyenda
                            labels: {
                                padding: 20,
                                boxWidth: 18,
                                fontFamily: 'Poppins',
                                fontColor: '#1a1a1a',
                                fontSize: 12
                            }
                        },
                        // layout: {
                        //     padding: {
                        //         right: 50
                        //     }
                        // },
                        tooltips: {
                            backgroundColor: '#fff',
                            borderColor: '#00A04E',
                            borderWidth: 0.5,
                            titleFontSize: 15,
                            xPadding: 10,
                            yPadding: 10,
                            bodyFontSize: 12,
                            titleFontColor: '#1a1a1a',
                            bodyFontColor: "#1a1a1a",
                            intersect: false,
                            // multiKeyBackground: '#1a1a1a',
                            mode: 'index',
                        },
                        // quitamos las lineas del ejeX
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        elements: {
                            // linea de la grafica
                            line: {
                                borderWidth: 4,
                                fill: false, //anulamos el gris transparente
                            },
                            // puntos de la grafica
                            point: {
                                radius: 3,
                                borderWidth: 2,
                                // backgroundColor: 'white'

                            }
                        }
                    }

                })
            }


            function totalCasesChart3(ctx3) {

                // Creamos la grafica
                // new mandamos el contexto de donde se dibujara el chart y luego la configuracion
                const chart = new Chart(ctx3, {


                    // El tipo de grafica
                    type: 'bar',
                    // data.. informacion que pondremos en el nivel X y Y
                    data: {
                        // eje X labels
                        // usaremos map que iterara todos los elementos
                        // convertimos la fecha a formato valido con api del navegador
                        // data.confirmados.map(items => new Intl.DateTimeFormat().format(new Date(items.fecha)))
                        labels: fechas.reverse(),
                        // dataset para los graficos
                        datasets: [
                            {
                                // dato y la grafica
                                label: 'Fallecidos',
                                borderColor: '#ED1C24',
                                backgroundColor: '#ED1C24',
                                data: fallecidosporDia.reverse(),

                            }
                        ]

                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Fallecidos de Covid por Día',
                            fontSize: 25,
                            padding: 20,
                            fontColor: '#ED1C24',
                            fontFamily: 'Poppins'
                        },
                        legend: {
                            position: 'bottom',
                            // labels de la leyenda
                            labels: {
                                padding: 20,
                                boxWidth: 18,
                                fontFamily: 'Poppins',
                                fontColor: '#1a1a1a',
                                fontSize: 12
                            }
                        },
                        // layout: {
                        //     padding: {
                        //         right: 50
                        //     }
                        // },
                        tooltips: {
                            backgroundColor: '#fff',
                            borderColor: '#ED1C24',
                            borderWidth: 0.5,
                            titleFontSize: 15,
                            xPadding: 10,
                            yPadding: 10,
                            bodyFontSize: 12,
                            titleFontColor: '#1a1a1a',
                            bodyFontColor: "#1a1a1a",
                            intersect: false,
                            // multiKeyBackground: '#1a1a1a',
                            mode: 'index',
                        },
                        // quitamos las lineas del ejeX
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        elements: {
                            // linea de la grafica
                            line: {
                                borderWidth: 4,
                                fill: false, //anulamos el gris transparente
                            },
                            // puntos de la grafica
                            point: {
                                radius: 3,
                                borderWidth: 2,
                                // backgroundColor: 'white'

                            }
                        }
                    }

                })
            }

            function renderCharts() {
                const ctx = document.querySelector('#chart2').getContext('2d')
                const ctx2 = document.querySelector('#chart3').getContext('2d')
                const ctx3 = document.querySelector('#chart4').getContext('2d')
                totalCasesChart(ctx)
                totalCasesChart2(ctx2)
                totalCasesChart3(ctx3)
            }

            renderCharts()



        })






    fetch('https://mauforonda.github.io/covid19-bolivia/data.json')
        .then(res => res.json())
        .then(data => {
            var pando = new Array();
            var lapaz = new Array();
            var potosi = new Array();
            var oruro = new Array();
            var cocha = new Array();
            var santa = new Array();
            var chuquisaca = new Array();
            var beni = new Array();
            var tarija = new Array();

            for (let pacientes of Object.keys(data['confirmados'])) {

                pando.push(data['confirmados'][pacientes]['dep']['pando']);
                lapaz.push(data['confirmados'][pacientes]['dep']['la_paz']);
                potosi.push(data['confirmados'][pacientes]['dep']['potosí']);
                oruro.push(data['confirmados'][pacientes]['dep']['oruro']);
                tarija.push(data['confirmados'][pacientes]['dep']['tarija']);
                chuquisaca.push(data['confirmados'][pacientes]['dep']['chuquisaca']);
                beni.push(data['confirmados'][pacientes]['dep']['beni']);
                santa.push(data['confirmados'][pacientes]['dep']['santa_cruz']);
                cocha.push(data['confirmados'][pacientes]['dep']['cochabamba']);

            }

            var pandoDia = new Array();
            var lapazDia = new Array();
            var potosiDia = new Array();
            var oruroDia = new Array();
            var cochaDia = new Array();
            var santaDia = new Array();
            var chuquisacaDia = new Array();
            var beniDia = new Array();
            var tarijaDia = new Array();
            for (let i = 0; i < pando.length; i++) pandoDia.push(pando[i] - pando[i + 1])
            for (let i = 0; i < lapaz.length; i++) lapazDia.push(lapaz[i] - lapaz[i + 1])
            for (let i = 0; i < potosi.length; i++) potosiDia.push(potosi[i] - potosi[i + 1])
            for (let i = 0; i < oruro.length; i++) oruroDia.push(oruro[i] - oruro[i + 1])
            for (let i = 0; i < cocha.length; i++) cochaDia.push(cocha[i] - cocha[i + 1])
            for (let i = 0; i < santa.length; i++) santaDia.push(santa[i] - santa[i + 1])
            for (let i = 0; i < chuquisaca.length; i++) chuquisacaDia.push(chuquisaca[i] - chuquisaca[i + 1])
            for (let i = 0; i < beni.length; i++) beniDia.push(beni[i] - beni[i + 1])
            for (let i = 0; i < tarija.length; i++) tarijaDia.push(tarija[i] - tarija[i + 1])


            var fechas = new Array();
            let fechaFormato = '';
            for (let item2 of Object.keys(data['confirmados'])) {
                // console.log(data['confirmados'][item2]['fecha'])


                // damos formato a las fechas
                // dateFormat indicamos el formato poniendo month en texto y dia en numerico
                fechaFormato = moment(data['confirmados'][item2]['fecha']).format('DD/MM')


                fechas.push(fechaFormato);
            }


            // console.log(fechas)



            function totalCasesChart(ctx) {

                // Creamos la grafica
                // new mandamos el contexto de donde se dibujara el chart y luego la configuracion
                const chart = new Chart(ctx, {


                    // El tipo de grafica
                    type: 'line',
                    // data.. informacion que pondremos en el nivel X y Y
                    data: {
                        // eje X labels
                        // usaremos map que iterara todos los elementos
                        // convertimos la fecha a formato valido con api del navegador
                        // data.confirmados.map(items => new Intl.DateTimeFormat().format(new Date(items.fecha)))
                        labels: fechas.reverse(),
                        // dataset para los graficos
                        datasets: [
                            {
                                // dato y la grafica
                                label: 'Pando',
                                borderColor: '#6E3DCC',
                                backgroundColor: '#6E3DCC',
                                data: pandoDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'La Paz',
                                borderColor: '#F820A4',
                                backgroundColor: '#F820A4',
                                data: lapazDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Santa Cruz',
                                borderColor: 'red',
                                backgroundColor: 'red',
                                data: santaDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Beni',
                                borderColor: '#4de',
                                backgroundColor: '#4de',
                                data: beniDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Cochabamba',
                                borderColor: 'black',
                                backgroundColor: 'black',
                                data: cochaDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Oruro',
                                borderColor: '#FFCD56',
                                backgroundColor: '#FFCD56',
                                data: oruroDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Potosi',
                                borderColor: '#9966FF',
                                backgroundColor: '#9966FF',
                                data: potosiDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Chuquisaca',
                                borderColor: 'green',
                                backgroundColor: 'green',
                                data: chuquisacaDia.reverse(),

                            },
                            {
                                // dato y la grafica
                                label: 'Tarija',
                                borderColor: '#FF6384',
                                backgroundColor: '#FF6384',
                                data: tarijaDia.reverse(),

                            },
                        ]

                    },
                    // opciones de mejora
                    options: {
                        title: {
                            display: true,
                            text: 'Casos de Covid por Departamento',
                            fontSize: 25,
                            padding: 20,
                            fontColor: '#217EFF',
                            fontFamily: 'Poppins'
                        },
                        legend: {
                            position: 'bottom',
                            // labels de la leyenda
                            labels: {
                                padding: 20,
                                boxWidth: 18,
                                fontFamily: 'Poppins',
                                fontColor: '#1a1a1a',
                                fontSize: 12
                            }
                        },
                        // layout: {
                        //     padding: {
                        //         right: 50
                        //     }
                        // },
                        tooltips: {
                            backgroundColor: '#fff',
                            borderColor: '#217EFF',
                            borderWidth: 0.5,
                            titleFontSize: 15,
                            xPadding: 10,
                            yPadding: 10,
                            bodyFontSize: 12,
                            titleFontColor: '#1a1a1a',
                            bodyFontColor: "#1a1a1a",
                            intersect: false,
                            // multiKeyBackground: '#1a1a1a',
                            mode: 'index',
                        },
                        // quitamos las lineas del ejeX
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }]
                        },
                        elements: {
                            // linea de la grafica
                            line: {
                                borderWidth: 4,
                                fill: false, //anulamos el gris transparente
                            },
                            // puntos de la grafica
                            point: {
                                radius: 3,
                                borderWidth: 2,
                                //backgroundColor: 'white'

                            }
                        }
                    }
                })
            }


            function renderCharts() {
                const ctx = document.querySelector('#chart5').getContext('2d')
                totalCasesChart(ctx)
            }

            renderCharts()



        })




});