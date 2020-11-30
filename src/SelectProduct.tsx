import React from 'react';
import {CountryCodeKey } from './types';
import {DKProducts} from './wtoAPI';

type SelectProductProps = {
    country:CountryCodeKey
    product:string
    setProduct:React.Dispatch<React.SetStateAction<string>>
}

const SelectProduct = (props:SelectProductProps) => {
    let options = DKProducts.map((ic) => <option  key={ic.ProductOrSectorCode} value={ic.ProductOrSectorCode}>{ic.ProductOrSector}</option>)

    return (<div className="Select"><span>Balance of Trade for </span>
        <select defaultValue={props.product} onChange={e => props.setProduct(e.target.value)}>
            {options}
        </select></div>
    );
  }


export default SelectProduct;