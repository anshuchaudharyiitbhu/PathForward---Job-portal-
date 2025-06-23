import React, { useContext, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { FilterContext } from './context/filtercontent';
import { Button } from 'react-bootstrap';

const filterData = [
  {
    filterType: 'Location',
    options: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    options: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    options: ['0-40k', '42-1lakh', '1lakh to 5lakh','Above 5lakh'],
  },
];

const FilterCard = () => {
  const [filters, setFilters] = useState({
    Location: '',
    Industry: '',
    Salary: '',
  });

  const { filter, setfilter } = useContext(FilterContext);

  // ✅ Correctly defined outside useEffect
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));

    setfilter((prev) => ({
      ...prev,
      [type]: value,
    }));

    // console.log(`Selected ${type}: ${value}`);
  };

  return (
    <div className="border border-gray-300 bg-gradient-to-tr from-[#f9c5d1] to-[#f7d9ff] bg-white p-3 m-5 rounded-md space-y-6 flex-row flex w-[98%] lg:flex-col lg:h-fit lg:w-[20vw] ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr />
      <Button className='border-2 p-3 rounded-2xl cursor-pointer bg-pink-300 w-fit h-fit mx-3' onClick={()=>{setfilter(""),setFilters({
    Location: '',
    Industry: '',
    Salary: '',
  })}}>Clear Filter</Button>

      {filterData.map(({ filterType, options }) => (
        <div key={filterType}>
          <h2 className="font-semibold text-base mb-2 mx-10 lg:mx-0">{filterType}</h2>
          <RadioGroup
            value={filters[filterType]}
            onValueChange={(val) => handleFilterChange(filterType, val)}
            className="space-y-2"
          >
            {options.map((item) => (
              <div key={item} className="flex items-center space-x-2 mx-5">
                <RadioGroupItem value={item} id={`${filterType}-${item}`} />
                <label htmlFor={`${filterType}-${item}`} className="text-sm">
                  {item}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
