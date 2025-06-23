import React, { useContext } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { SearchedContext } from './context/searchedcontext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { searched, setsearched } = useContext(SearchedContext);
  const navigate = useNavigate();

  // Trigger search function
  const handleSearch = () => {
    if (searched.trim() !== '') {
      navigate('/browse');
    }
  };

  return (
    <div className="text-center px-4">
      <div className="flex flex-col gap-5 my-10">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Opportunities Tailored to You.
        </h1>
        <p className="text-lg sm:text-xl font-semibold">
          Craft Your Career. We’ll Handle the Rest.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto 
            h-[8vh] sm:h-[10vh] shadow-md border border-gray-200 
            bg-gradient-to-r from-[#f9c5d1] to-[#f7d9ff] 
            pl-4 pr-1 rounded-full items-center gap-2 sm:gap-4"
        >
          <input
            type="text"
            placeholder="Find your dream job..."
            value={searched}
            onChange={(e) => setsearched(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm sm:text-base"
          />
          <Button
            type="submit"
            className="h-full w-12 rounded-full sm:px-6  bg-[rgb(39,93,245)] text-white"
          >
            <Search className="h-2 w-7 sm:h-5 sm:w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
