$(document).ready(function () {

    var expNum = /^[0-9]/
    var error = document.getElementById("msjerror")
    var validacion = false



    $("#formBuscar").submit(function (e) {
        e.preventDefault();

        let id = $("#inputID").val();
        validacion = validar(id, expNum)

        if (validacion === true) {
            //conectar api y obtener datos...
            $.ajax({
                url: "https://superheroapi.com/api.php/10222886118495107/" + id,
                success: function (data) {
                    console.log(data)

                    //info
                    let nombre = data.name;
                    let publicador = data.biography.publisher;
                    let ocupacion = data.work.occupation;
                    let primerAparicion = data.biography['first-appearance'];
                    let altura = data.appearance.height;
                    let peso = data.appearance.weight;
                    let alianzas = data.biography.aliases.join(", ");
                    let conecciones = data.connections.relatives;
                    let imagen = data.image.url;

                    //stats
                    let combat = data.powerstats.combat;
                    let durability = data.powerstats.durability;
                    let intelligence = data.powerstats.intelligence;
                    let power = data.powerstats.power;
                    let speed = data.powerstats.speed;
                    let strength = data.powerstats.strength;

                    let arrayStats = [combat, durability, intelligence, power, speed, strength];

                    console.log(arrayStats)


                    //Interpolaciones
                    $("#encontrado").html(
                        `
                        ¡SuperHero encontrado!:
                        `
                    )

                    $("#superheroe").html(
                        `
                        ${nombre}
                        `
                    )

                    $("#imgSH").html(
                        `
                        <img src=${imagen} class="img-fluid rounded-start">
                        `
                    )

                    $("#descripcionSH").html(
                        `
                            Nombre: ${nombre}
                            <hr>
                            Conexiones: ${conecciones}
                            <hr>
                            Publicado por: ${publicador}
                            <hr>
                            Ocupación: ${ocupacion}
                            <hr>
                            Primera aparición: ${primerAparicion}
                            <hr>
                            Altura: ${altura}
                            <hr>
                            Peso: ${peso}
                            <hr>
                            Alianzas: ${alianzas}
                        `
                    )





                    $("#graficoSH").css({ "margin": "", "background-image": "", "background-size": "", "background-repeat": "" });
                    $("#graficoSH").css({ "height": "100vh", "margin": "0 auto", "background-image": "url(./assets/img/pngwing.com-.png)", "background-size": "100% 100%", "background-repeat": "no-repeat" });


                    let nullUndef = Object.values(arrayStats).every(value => {
                        if (value === null || value === undefined || value === '' || value === 'null') {
                            return true;
                        } else { return false };
                    });

                    console.log(nullUndef);

                    //El gráfico sólo se renderiza si están todos los datos

                    if (nullUndef == false) {

                        //configuración para gráfico
                        let config = {
                            backgroundColor: '',
                            animationEnabled: true,
                            title: {
                                text: "Estadísticas de poder para " + nombre,
                                fontFamily: "Bangers"
                            },
                            data: [{
                                type: "pie",
                                startAngle: 240,
                                yValueFormatString: "##0.00\"\"",
                                indexLabel: "{label} {y}",
                                dataPoints: [
                                    { y: combat, label: "Ataque" },
                                    { y: durability, label: "Resistencia" },
                                    { y: intelligence, label: "Intelligencia" },
                                    { y: power, label: "Energía" },
                                    { y: speed, label: "Velocidad" },
                                    { y: strength, label: "Fuerza" }
                                ]
                            }]

                        }

                        var chart = new CanvasJS.Chart("chartContainer", config);
                        chart.render();

                    } else {
                        $("#chartContainer").html(
                            `
                            <p>
                            No hay suficientes datos para mostrar un gráfico
                            </p>
                            `
                        )
                    }
                }
            })

            error.innerHTML = ''

        } else {
            id = null;
            error.innerHTML = 'Ingrese sólo números entre 1 y 731';
        }

    })




    function validar(id, expNum) {

        if (!expNum.test(id)) {
            validacion = false
        } else if (id < 1 || id > 731) {
            validacion = false
        } else {
            validacion = true
        }

        return validacion
    }







})

