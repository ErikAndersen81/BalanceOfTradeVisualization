import  React, {useState, useEffect} from 'react';
import {Record, CountryCodeKey, Year } from '../types';

export const getUrl = (query:Query):string => {
  let url = "https://api.wto.org/timeseries/v1/data?";
  Object.keys(query).forEach((key: string) => {url += `${key}=${query[key as keyof Query]}&`} )
  return  url
}

const appendSubscriptionKey = (url:string) => {
  let apiKey:string;
    if (process && process.env && process.env.REACT_APP_API_KEY){
      apiKey = process.env.REACT_APP_API_KEY;
    } else {
      apiKey = "None"
    }
    return `${url}subscription-key=${apiKey}`; 
}

type FetchDataResult = {
    data:Array<Record>
    isLoading:boolean
    isError:string
    setParams:React.Dispatch<React.SetStateAction<Query|undefined>>
}

const FetchDataHook = ():FetchDataResult => {
  const [data, setData] = useState<Array<Record>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');
  const [params, setParams] = useState<Query|undefined>();

  useEffect( () => {
    const fetchData = async () => {
      if (params) {
      setIsError('');
      setIsLoading(true)
      let url = getUrl(params);
      url = appendSubscriptionKey(url);
      fetch(url).then(response => response.json())
      .then( result => {
            if (result.Dataset) {
              setIsLoading(false);
              setData(() => ([...result.Dataset]))
      }
    }).catch(error => setIsError(error))
  }}
  if (params) fetchData();
 }, [params] 
    )
    return {data, isLoading, isError, setParams};
};

type Query = {
  i?:string // indicator
  r?:CountryCodeKey | Array<CountryCodeKey> // reporting econom(y/ies)
  p?:CountryCodeKey // partner econom(y/ies)
  ps?: "all" | Year | "1995-2020" // There are more options TODO
  spc?:string
  fmt?:string // This defaults to JSON so there's no need to change that ;-)
  mode?:string // Consider trying 'codes' TODO
  dec?:number // number of decimals used.
  name?:string
  t?:string 
  pc?:string // product or classification
  tp?:string
  frq?:string
  lang?:string // default language is english
  head?: "H" | "M" // Human readable or machine readable header 
}

export default FetchDataHook;