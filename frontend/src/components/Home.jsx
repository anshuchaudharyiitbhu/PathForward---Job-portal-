import React, { useContext, useEffect } from 'react'
import HeroSection from './HeroSection'
import Navbar from './shared/Navbar'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './Latestjobs'
import Footer from './shared/Footer'
import Choices from './Choices'
import Company from './Company'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/context'
import { CompanyContext } from './context/companycontext'
import { JobContext } from './context/Jobcontext'
import { SearchedContext } from './context/searchedcontext'


const Home = () => {
  const navigate=useNavigate();
  const {user}=useContext(UserContext);
  const {fetchcompany}=useContext(CompanyContext);
  const {fetchJobs}=useContext(JobContext);
  const{setsearched}=useContext(SearchedContext);

useEffect(() => {
  {
    const fetch=async()=>
    {if(user?.role==="recruiter")
    {
      await fetchcompany();
      await fetchJobs();
      navigate("/admin/companies")

    }}
    fetch();
  }
  setsearched("");
  

  
}, [])



  return (
    <div>
         <Navbar />

      <HeroSection />
     <Choices/>
     <Company/>
      <Footer /> 
      
    </div>
  )
}

export default Home
