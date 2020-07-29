var marker;          //variable del marcador
var coords = {};    //coordenadas obtenidas con la geolocalización

//Funcion principal
initMap = function () {

    //usamos la API para geolocalizar el usuario
    navigator.geolocation.getCurrentPosition(
        function (position) {
            $('#ejeX').val(position.coords.longitude);
            $('#ejeY').val(position.coords.latitude);
            coords = {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            };
            setMapa(coords);  //pasamos las coordenadas al metodo para crear el mapa


        }, function (error) {

        });

}

const dibujarMapa = (ubicaciones) => {
    let mapa = new google.maps.Map(document.getElementById('map'),{
        center: {lat: -19.044654, lng: -65.260850},
        zoom: 14,
    });

    ubicaciones.forEach(ubicacion => {
        new google.maps.Marker({
            map: mapa,
            position:{lat: parseFloat(ubicacion.ejeX), lng: parseFloat(ubicacion.ejeY)},//lat es ejeX para nosotros y lng ejeY xd
            title: ubicacion.nombre
        });
    });
};


function setMapa(coords) {
    //Se crea una nueva instancia del objeto mapa
    var map = new google.maps.Map(document.getElementById('map'),
        {
            zoom: 18,
            center: new google.maps.LatLng(coords.lat, coords.lng),

        });

    //Creamos el marcador en el mapa con sus propiedades
    //para nuestro obetivo tenemos que poner el atributo draggable en true
    //position pondremos las mismas coordenas que obtuvimos en la geolocalización
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(coords.lat, coords.lng),

    });
    //agregamos un evento al marcador junto con la funcion callback al igual que el evento dragend que indica 
    //cuando el usuario a soltado el marcador
    // marker.addListener('click', toggleBounce);

    marker.addListener('dragend', function (event) {
        //escribimos las coordenadas de la posicion actual del marcador dentro del input #coords
        document.getElementById("ejeX").value = this.getPosition().lng();
        document.getElementById("ejeY").value = this.getPosition().lat();
    });
}

/* //callback al hacer clic en el marcador lo que hace es quitar y poner la animacion BOUNCE
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
} */
