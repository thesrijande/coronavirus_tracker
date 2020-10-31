import React, { useState,useEffect} from 'react';
import{
  MenuItem,
  FormControl,
  Select, Card,CardContent
} from   "@material-ui/core";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph.js';
import "leaflet/dist/leaflet.css";
import "./InfoBox.css"

function App() {
 const [countries,setCountries] = useState([]);
 const [country,setCountry] = useState('worldwide');
 const [countryInfo,setCountryInfo] = useState({});
 const [tableData,setTableData]=useState([]);
 const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
 const [mapZoom, setMapZoom] = useState(3);
 const [mapCountries, setMapCountries] = useState([]);
 const [casesType, setCasesType] = useState("cases");

useEffect(()=>
{
 
   fetch("https://disease.sh/v3/covid-19/all")
     .then((response )=> response.json())
     .then((data) => {
           setCountryInfo(data);
      });
}, []
);






useEffect(() => {
  const getCountriesData = async() =>
  {
     await fetch("https://disease.sh/v3/covid-19/countries")
     .then((response )=> response.json())
     .then((data) => {
       const countries= data.map((country) =>(
        {
          name : country.country,
          value : country.countryInfo.iso2
        }
       ));
       setCountries(countries);
       const sortedData=[...data];
       sortedData.sort((a,b)=>(a.cases>b.cases?-1:1));
       setTableData(sortedData);
       setMapCountries(data);
       setCountries(countries);
      });
  };
  getCountriesData();
}, []);
const onCountryChange= async(event)=>{
  const countryCode=event.target.value;
  setCountry(countryCode);
  const url=countryCode=== "worldwide"?  'https://disease.sh/v3/covid-19/all'
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url)
  .then(response => response.json())

  .then(data =>
    {
      
      
      setCountry(countryCode);
      setCountryInfo(data);
      if(countryCode!="worldwide")
      {
        setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      }
      
    });
  

};
console.log("aaste",countryInfo);
  return (
    <div>
    <div className="app">
      <div className="left">
      
      <div className="corona_header">
           <h1>CORONAVIRUS TRACKER</h1>
     <FormControl className="corona_dropdown">
       <Select
       variant ="outlined"
       onChange={onCountryChange}
       value ={country}
       >
         <MenuItem value="worldwide">Worldwide</MenuItem>
         {
            countries.map((country)=>
           (
           <MenuItem value={country.value}>{country.name}</MenuItem>
           )
           )
         }
        
       </Select>
     </FormControl>
      </div>
      <div className="cards">
          <InfoBox  title="Coronavirus" cases={countryInfo.todayCases} >
          </InfoBox>

          <InfoBox  title="Recovered" cases={countryInfo.todayRecovered} >
          </InfoBox>

          <InfoBox  title="Deaths" cases={countryInfo.todayDeaths}>
          </InfoBox>
      </div>
     <Map
casesType={casesType}
countries={mapCountries}
center={mapCenter}
zoom={mapZoom}
/>
      </div>



      <Card className="right">
        <div className="aaste">
        <h1> Cases by Country</h1>
        </div>
      <CardContent>
        <Table countries={tableData}/>
        <div className="aaste_a">
        <h1> New Cases </h1>
        </div>
        <LineGraph/>
      </CardContent>
      </Card>
      
    </div>
    <div className="creater">
    Made by Aaste
    </div>
    </div>
    
  );
}

export default App;
