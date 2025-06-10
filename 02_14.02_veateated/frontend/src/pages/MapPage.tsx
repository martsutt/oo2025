import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const countryMarkers = [
    { name: 'Eesti', coords: [59.437, 24.7536] },
    { name: 'Soome', coords: [60.1699, 24.9384] },
    { name: 'Rootsi', coords: [59.3293, 18.0686] },
    { name: 'Norra', coords: [59.9139, 10.7522] },
    { name: 'USA', coords: [38.89511, -77.03637] },
    { name: 'UK', coords: [51.5074, -0.1278] },
    { name: 'Hispaania', coords: [40.4168, -3.7038] },
    { name: 'Austraalia', coords: [-35.282, 149.1286] },
    { name: 'Kanada', coords: [45.4215, -75.6996] },
];

function MapPage() {
    return (
        <div style={{ height: "400px", width: "100%", marginTop: "2em" }}>
            <MapContainer center={[40, 10]} zoom={2.2} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countryMarkers.map((country) => (
                    <Marker key={country.name} position={country.coords}>
                        <Popup>
                            {country.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;
