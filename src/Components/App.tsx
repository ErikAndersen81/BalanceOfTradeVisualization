import dotenv from 'dotenv';
import React, { useState } from 'react';
import Timeline from './Timeline';
import Map from './Map';
import SelectProduct from './SelectProduct';
import { CountryCodeKey, Year } from './types';
import { productName } from './WTOAPI/wtoAPI';
import CountryFlag from './CountryFlag';
import CountryCodes from './CountryCodes';

function App() {
  dotenv.config({ path: '../.env' });
  const [product, setProduct] = useState<string>('TO');
  const [year, setYear] = useState<Year>(2016);
  const [country, setCountry] = useState<CountryCodeKey>('208');
  return (
    <div className='App'>
      <SelectProduct product={product} setProduct={setProduct} />
      <Map
        country={country}
        product={product}
        year={year}
        setCountry={setCountry}
      />
      <div className='Header'>
        <span>
          {`Time line for import and export of ${productName[
            product as keyof typeof productName
          ].toLowerCase()} in
           ${CountryCodes.Country[country]}`}
        </span>
        <CountryFlag country={country} width={32} />
      </div>
      <Timeline
        country={country}
        product={product}
        year={year}
        setYear={setYear}
      />
      <p>
        Click a dot to display the countries&apos; individual balance of trade
        at the given year on the map.
      </p>
    </div>
  );
}

export default App;
