import React, { useState } from "react";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useCity } from "../hook/useCity";

export function Leaflet() {

    const {setCity, position, setPosition} = useCity(); 
    //position, setPosition are setting and coming from context because if we use it here, then the position marker will be vanished

    function LocationMarker(){


        const map = useMapEvents({click(e) { //hook to handle click
            const {lat, lng} = e.latlng; //getting lat,lng from the event
            setPosition(e.latlng); //position is setting in context
            map.flyTo(e.latlng, map.getZoom()); //to lead to the clicked location

            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)  //getting ocation detail on clicking
            .then(res => {
                const data = res.data;
                console.log(data)
                const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
                setCity(city); //setting city to useCity which is in useCity.jsx
            }).catch(err => {
                console.log('Error fetching location ', err);
            })
        }})

        return position === null ? null : (
        <Marker position={position}></Marker> //position is coming from context
        )

    }


    return (
        <div className="leaflet-container">
            <MapContainer center={[31.7131,  73.9783]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <LocationMarker/>
            </MapContainer>
        </div>
    );
}
