import React, { useState } from 'react';
import './App.css';
// import BarChart from './BarChart';
import Timeline from './Timeline';
import World from './World';
import SelectProduct from './SelectProduct';
import { CountryCodeKey, Year } from './types';
import { productName } from './wtoAPI';
import CountryFlag from './CountryFlag';
import CountryCodes from './CountryCodes';
require('dotenv').config({path:'../.env'});


function App() {
  const [product, setProduct] = useState<string>("TO");
  const [year, setYear] = useState<Year>(2016);
  const [country, setCountry] = useState<CountryCodeKey>("208");
  return (
    <div className="App">
      <SelectProduct country={country} product={product} setProduct={setProduct}/>
      <World country={country} product={product} year={year} export={true} setCountry={setCountry}/>
      <div className="Header">
  <span> Time line for import and export of {productName[product as keyof typeof productName].toLowerCase()} in {CountryCodes.Country[country] }</span> <CountryFlag country={country} width={32} height={32}/>
  </div>
      <Timeline country={country} product={product} year={year} setYear={setYear}/> 
      <p>Click a dot to display the countries' individual balance of trade at the given year on the map.</p>
    </div>
  );
}





export default App;
