/* eslint-disable react/no-unused-prop-types */
import dotenv from 'dotenv';
import React, { useEffect, useRef, useState } from 'react';
import Timeline from './Timeline';
import Map from './Map';
import SelectProduct from './SelectProduct';
import { categoryT, CountryCodeKey, Year } from './types';
import { productName } from './WTOAPI/wtoAPI';
import CountryFlag from './CountryFlag';
import CountryCodes from './CountryCodes';
import TimelineBalance from './Timeline/TimelineBalance';
import MapSingleValue from './Map/MapSingleValue';
import SelectCategory from './SelectCategory';

function App() {
  dotenv.config({ path: '../.env' });
  const [product, setProduct] = useState<string>('TO');
  const [year, setYear] = useState<Year>(2016);
  const [country, setCountry] = useState<CountryCodeKey>('208');
  const [category, setCategory] = useState<categoryT>('import');

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (endRef !== null && endRef.current !== null)
      endRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [country]);
  const scrollToTop = () => {
    if (startRef !== null && startRef.current !== null)
      startRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToTop, [year]);

  let map;
  switch (category) {
    case 'import': {
      map = (
        <MapSingleValue
          category='import'
          product={product}
          year={year}
          setCountry={setCountry}
        />
      );
      break;
    }
    case 'export': {
      map = (
        <MapSingleValue
          category='export'
          product={product}
          year={year}
          setCountry={setCountry}
        />
      );
      break;
    }
    default: {
      map = <Map product={product} year={year} setCountry={setCountry} />;
    }
  }

  return (
    <div className='App'>
      <div className='Selectors' ref={startRef}>
        <span> Showing </span>
        <SelectCategory category={category} setCategory={setCategory} />
        <span> values for </span>
        <SelectProduct product={product} setProduct={setProduct} />
      </div>
      {map}
      <div className='Header'>
        <span>
          {`Timeline for ${productName[
            product as keyof typeof productName
          ].toLowerCase()} in
           ${CountryCodes.Country[country]} `}
        </span>
        <CountryFlag country={country} width={32} />
      </div>
      <div ref={endRef} />
      <Timeline
        country={country}
        product={product}
        year={year}
        setYear={setYear}
      />
      <TimelineBalance
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
