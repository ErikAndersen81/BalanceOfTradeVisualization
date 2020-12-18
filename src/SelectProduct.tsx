/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { DKProducts } from './wtoAPI';

type SelectProductProps = {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
};

const SelectProduct = (props: SelectProductProps) => {
  const { product, setProduct } = { ...props };
  const options = DKProducts.map((ic) => (
    <option key={ic.ProductOrSectorCode} value={ic.ProductOrSectorCode}>
      {ic.ProductOrSector}
    </option>
  ));

  return (
    <div className='Select'>
      <span>Balance of Trade for </span>
      <select
        defaultValue={product}
        onChange={(e) => setProduct(e.target.value)}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectProduct;
