import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';




function Map() {
    return (
        <div>
            <h1>Map</h1>
            <MapContainer className='mapContainer' center={[59.433633, 24.744024]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[59.433633, 24.744024]}>
                    <Popup>
                        Vabaduse Väljak <br /> Tallinn
                    </Popup>
                </Marker>
                <Marker position={[59.427123, 24.723120]}>
                    <Popup>
                        Kristiine keskus <br /> Tallinn
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map