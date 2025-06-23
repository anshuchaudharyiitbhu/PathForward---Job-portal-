import React, { useContext, useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CompanyContext } from './context/companycontext'

const CompanyCreate = () => {
    const {setcompany}=useContext(CompanyContext);
    const navigate=useNavigate();
    const [input, setinput] = useState(
            {
                companyName:"",
                
            }
        )
        const handelclick=async(e)=>{
            
            e.preventDefault();
            try {
                const res=await axios.post("http://localhost:3000/api/v1/company/register",input,{withCredentials:true})
                
                if(res.data.success)
                {
                    const companyid=res.data.company._id;
                     const response = await axios.get("http://localhost:3000/api/v1/company/get", { withCredentials: true });
                     setcompany(response.data.companies)
                     
                   navigate(`/admin/companies/${companyid}`)
                   toast.success(res.data.message)
                }
                
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
                
                
            }
            
        }



  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center py-10'>
        <h1 className='text-3xl font-bold mb-2'>Company Name</h1>
        <p className='text-gray-600 mb-8'>Enter your company Name below</p>

        <form style={{ backgroundImage: "linear-gradient(to right, #f9c5d1, #f7d9ff)" }} className='w-[50%] max-w-4xl bg-gray-100 p-8 px-20 rounded-lg shadow-md flex justify-center items-center'>
         
            <div className='flex items-center   flex-col lg:flex-row w-[fit] p-5'>
              <label className=' font-semibold'>Company Name</label>
              <input name='companyName' value={input.companyName}  onChange={(e)=>setinput({...input,[e.target.name]:e.target.value})} type="text" placeholder='Company' className='border w-[30vw] sm:w-[90%] mx-5 items-center border-gray-400 p-3 rounded-lg' />
            </div>

        </form>
        <div className='flex gap-6 mt-8'>
          <Link to="/admin/companies">
            <Button className='cursor-pointer px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white'>Cancel</Button>
          </Link>
          <Button onClick={handelclick}  className='cursor-pointer px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white'>Continue</Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate
