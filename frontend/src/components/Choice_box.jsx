import React, { useContext } from 'react'
import { SearchedContext } from './context/searchedcontext'
import { useNavigate } from 'react-router-dom'

const Choice_box = (props) => {
  
    const {searched,setsearched}=useContext(SearchedContext);
    const navigate=useNavigate();
    return (
    <div>
      <div onClick={(e)=>{navigate('/browse'),setsearched(props.choice)}} style={{ backgroundImage: "linear-gradient(to right, #f9c5d1, #f7d9ff)" }} className=" shadow-lg hover:shadow-gray-400 flex h-20 justify-between items-center box border-2  p-5 pt-2 pb-2 gap-2 rounded-2xl cursor-pointer w-[35vw] sm:w-fit lg:w-fit">
                    <img className='w-8 h-8' src={props.link} alt="home icon" />
                    <span className='sm:font-semibold' >{props.choice}</span>
                    <img src="https://static.naukimg.com/s/7/0/assets/images/src/widgets/trending-naukri-wdgt/latest/assets/arrow.5c4fe2ef.svg" alt="" />
                    </div>
    </div>
  )
}

export default Choice_box
