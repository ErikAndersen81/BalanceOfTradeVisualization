/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { categoryT } from './types';

type selectCategoryProps = {
  category: categoryT;
  setCategory: React.Dispatch<React.SetStateAction<categoryT>>;
};

const SelectCategory = (props: selectCategoryProps) => {
  const { category, setCategory } = { ...props };
  const options = (
    <>
      <option value='import'>import</option>
      <option value='export'>export</option>
      <option value='balance'>trade balance</option>
    </>
  );

  return (
    <div>
      <select
        defaultValue={category}
        onChange={(e) => setCategory(e.target.value as categoryT)}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectCategory;
