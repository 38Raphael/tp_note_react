import './App.css';
import {useState, useEffect} from "react";
import sun from './icons/soleil.png'
import rain from './icons/il-pleut.png'
import clouds from './icons/cloud.png'
import wind from './icons/vent.png'
import storm from './icons/tempete.png'

function App() {

    const [city, setCity] = useState("");
    const[temp, setTemp] = useState(0);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState("");

    const conditions = {
        0 : sun, 
        1 : rain, 
        2: wind, 
        3: clouds, 
        4: storm
    };

    useEffect(() => {
        if (!navigator.geolocation){
            setStatus("Geolocation isn't activated on your browser");
        } else{
            setStatus("Locating…");
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus("");
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                console.log(lat + " "+ lng) // apparently no time to register it before printing it on console, works in addTemp() afterwards
            },
            (err) =>{
                console.log(err)
                setStatus("Location not found");
            }
            );
        }
      }, []);
    
    function display(){
        //console.log(lat + " "+ lng)
        setTemp(Math.floor(Math.random()*(Math.ceil(40)-Math.floor(0))) + 0)
        console.log(temp)

        var num = Math.floor(Math.random() * Object.keys(conditions).length);
        console.log("condition selected : " + conditions[num])
        return <img src={conditions[num]} className="App-logo" alt="logo" /> // not working

    }
    return (
        <div className="App" style={{margin:"auto"}}>
            <h1>Afficher la météo d'une ville</h1>
            <input
                id="myInput"
                type="text"
                placeholder="Rechercher une ville"
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            <button type="submit" onClick={() => display()}>Afficher</button>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
        </div>
    );
}

export default App;
