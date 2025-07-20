import React, { useContext } from 'react';
import { SearchedContext } from './context/searchedcontext';
import { useNavigate } from 'react-router-dom';

const Choice_box = (props) => {
  const { setsearched } = useContext(SearchedContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setsearched(props.choice);
    navigate('/browse');
  };

  return (
    <div className="w-[90vw] sm:w-[250px] lg:w-[280px]">
      <div
        onClick={handleClick}
        className="bg-gradient-to-r from-[#f9c5d1] to-[#f7d9ff] 
        shadow-md hover:shadow-lg border border-gray-300 rounded-2xl 
        p-4 h-[80px] flex items-center justify-between gap-4 
        cursor-pointer transition-all duration-300"
      >
        <img className="w-8 h-8 object-contain" src={props.link} alt="icon" />
        <span className="text-sm font-semibold text-center flex-1 truncate">{props.choice}</span>
        <img
          className="w-4 h-4"
          src="https://static.naukimg.com/s/7/0/assets/images/src/widgets/trending-naukri-wdgt/latest/assets/arrow.5c4fe2ef.svg"
          alt="arrow"
        />
      </div>
    </div>
  );
};

export default Choice_box;
