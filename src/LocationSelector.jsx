import React, { useEffect, useState } from "react";
function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");



  const getCountry = async () => {
    fetch("https://crio-location-selector.onrender.com/countries").then((res)=>res.json()).then((data)=>setCountries(data))
    
  }


  const getState= async (countryName) => {
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`).then((res)=>res.json()).then((data)=>setStates(data))
    
  }

  const getCities = async (countryName,stateName) => {
    fetch(` https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`).then((res)=>res.json()).then((data)=>{setCities(data)})
  }

  useEffect(()=>{
    getCountry()
  }, [])

  useEffect(()=>{
    getState(selectedCountry)
  }, [selectedCountry])

  useEffect(() => {getCities(selectedCountry,selectedState) },[selectedState])
  
  // console.log(country) 
  console.log(selectedState)
  console.log(cities)
  return (
   
    <div>
      
      <select style={{ width: "150px", margin: "20px" }} name="country" id="country" value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value) }}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option value={country}>{ country}</option>
        ))}
        
        </select>
        
      
      <select onChange={(e) => { setSelectedState(e.target.value) }} style={{ width: "150px", margin: "20px" }}>
      <option value="">Select State</option>
        {states.map((state) => (
          <option value={ state}>{ state}</option>
        ))}
      
      </select>
      
      <select style={{ width: "150px", margin: "20px" }} onChange={(e)=>{setSelectedCity(e.target.value)}} >
        <option value="">Select City</option>
        
        {cities.map((city) => (
          <option value={ city}>{city}</option>
        ))}
      
      </select>
      {
        selectedCity ? <h3>You Selected {selectedCountry}, {selectedState }, { selectedCity}.</h3>:null
      }
      
    </div>
  );
}
export default LocationSelector;