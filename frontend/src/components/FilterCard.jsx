import React, { useContext, useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { FilterContext } from './context/filtercontent';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

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
    options: ['0-40k', '42-1lakh', '1lakh to 5lakh', 'Above 5lakh'],
  },
];

const FilterCard = () => {
  const [filters, setFilters] = useState({
    Location: '',
    Industry: '',
    Salary: '',
  });

  const { filter, setfilter } = useContext(FilterContext);
  const location = useLocation();

  // Auto-clear filters when route changes
  useEffect(() => {
    setFilters({
      Location: '',
      Industry: '',
      Salary: '',
    });
    setfilter({});
  }, [location.pathname]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));

    setfilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      Location: '',
      Industry: '',
      Salary: '',
    });
    setfilter({});
  };

  return (
    <div className="border border-gray-300 bg-gradient-to-tr from-[#f9c5d1] to-[#f7d9ff] p-4 m-3 rounded-md w-full max-w-full lg:max-w-[20vw] lg:min-w-[250px] lg:mx-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button
          className="bg-pink-400 text-white rounded-lg px-3 py-1 hover:bg-pink-500 text-sm"
          onClick={handleClear}
        >
          Clear Filter
        </Button>
      </div>

      {filterData.map(({ filterType, options }) => (
        <div key={filterType} className="mb-5">
          <h2 className="font-semibold text-base mb-2">{filterType}</h2>
          <RadioGroup
            value={filters[filterType]}
            onValueChange={(val) => handleFilterChange(filterType, val)}
            className="space-y-2"
          >
            {options.map((item) => (
              <div key={item} className="flex items-center space-x-2">
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
