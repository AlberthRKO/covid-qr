const getLocations = () => {
    fetch('https://www.datos.gov.co/resource/g373-n3yy.json')
        .then(response => response.json())
        .then(locations => {
            let locationsInfo = []

            locations.forEach(location => {
                let locationData = {
                    position: { lat: location.punto.coordinates[1], lng: location.punto.coordinates[0] },
                    name: location.nombre_sede
                }
                locationsInfo.push(locationData)
            })
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((data) => {
                    let currentPosition = {
                        lat: data.coords.latitude,
                        lng: data.coords.longitude
                    }
                    dibujarMapa(currentPosition, locationsInfo)
                })
            }
        })
}

const dibujarMapa = (obj, locationsInfo) => {
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: obj
    })

    let marker = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })
    marker.setMap(map)

    let markers = locationsInfo.map(place => {
        return new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name
        })
    })
}
window.addEventListener('load', getLocations)