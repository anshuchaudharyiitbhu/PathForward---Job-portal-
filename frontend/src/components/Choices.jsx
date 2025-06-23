import React, { useContext } from 'react'
import Choice_box from './Choice_box'
import { JobContext } from './context/Jobcontext.jsx'
import { SearchedContext } from './context/searchedcontext'
import { useNavigate } from 'react-router-dom'

const Choices = () => {
    const {searched,setsearched}=useContext(SearchedContext);
    const navigate=useNavigate();
    return (
        <div>
            <div className=" w-[70vw] choices grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 justify-center items-center mx-auto">
                
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Remote" link="https://static.naukimg.com/s/0/0/i/trending-naukri/remoteonetheme.svg"/>
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="MNC" link="https://static.naukimg.com/s/0/0/i/trending-naukri/mnconetheme.svg"/>
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Banking & Finance" link="https://static.naukimg.com/s/0/0/i/trending-naukri/financeonetheme.svg"/>
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Analytics" link="https://static.naukimg.com/s/0/0/i/trending-naukri/analyticsonetheme.svg"/>
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Data Science" link="https://static.naukimg.com/s/0/0/i/trending-naukri/data-scienceonetheme.svg" />
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Software & IT" link="https://static.naukimg.com/s/0/0/i/trending-naukri/softwareonetheme.svg" />
                <Choice_box onClick={(e)=>{navigate('/browse'),setsearched(e.target.choice)}} choice="Business" link="https://static.naukimg.com/s/0/0/i/trending-naukri/startuponetheme.svg"/>
            </div>

        </div>
    )
}

export default Choices
