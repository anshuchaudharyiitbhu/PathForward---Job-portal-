import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import axios, { Axios } from 'axios'
import { USER_API_END_POINT } from '@/utilis/constant'
import toast from 'react-hot-toast'
import { UserContext } from '../context/context'
import { Helmet } from 'react-helmet-async'
// import { toast } from "sonner"
// function usePageTitle(title) {
//   const location = useLocation();
//   useEffect(() => {
//     document.title = title;
//   }, [location.pathname]);
// }


const Signup = () => {
     
const [loading, setloading] = useState(false);
 
    
    const [input, setinput] = useState(
        {
            name: "",
            email: "",
            contact: "",
            password: "",
            role: "",
            file: "",
        }
    )
    const handel = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const handelfile = (e) => {
        setinput({ ...input, [e.target.name]: e.target.files[0] })
    }  
    const navigate= useNavigate();
    const handelsubmit = async(e) => {
        setloading(true);
        e.preventDefault();
      
        const formdata = new FormData();
        formdata.append("name", input.name);
        formdata.append("email", input.email);
        formdata.append("contact", input.contact);
        formdata.append("password", input.password);
        formdata.append("role", input.role);
        formdata.append("file", input.file);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formdata,{ withCredentials: true,});
        if(res.data.success)
            {
            navigate("/login");
          toast.success(res.data.message);
            
        }else{
            // console.log("kkk");
             toast.error(res.data.message);
        }

        // console.log(input,"hii");
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }finally
        {
            setloading(false);
        }

        
    }
        //    usePageTitle("Sign Up | PathForward");

    return (
        <div>
           
            
            <div >
                <form className=" shadow-lg shadow-gray-500 main flex   items-center flex-col gap-5 bg-zinc-100 w-fit      m-auto mt-20 p-4 rounded-2xl " onSubmit={handelsubmit} action="">
                    <h1 className=' text-center text-2xl font-medium text-gray-900 md: md:text-3xl'>Create a new account</h1>
                    <p className='text-md text-center text-gray-500 md:text-lg'>Get matched with jobs tailored to your skills, <br></br>passions, and experience and track your <br /> applications – all for free.</p>
                    <div className='flex flex-col'>
                        <label className=' font-semibold' htmlFor="">Full Name </label>
                        <input  className=' hover:shadow-lg shadow-gray-500 bg-white border border-gray-800 p-1 px-2 sm:w-2xl  gap-3 rounded-2xl text-1xl' type="text" placeholder=' Full Name' value={input.name} name="name" onChange={handel} />
                    </div>
                    <div className='flex flex-col'>
                        <label className=' font-semibold' htmlFor="">Email </label>
                        <input className=' hover:shadow-lg shadow-gray-500 bg-white border border-gray-800 p-1 px-2 sm:w-2xl rounded-2xl text-1xl' type="text" placeholder='abcd@xyz.com' value={input.email} name="email" onChange={handel} />
                    </div>
                    <div className='flex flex-col'>
                        <label className=' font-semibold' htmlFor="">Phone Number </label>
                        <input className=' hover:shadow-lg shadow-gray-500 bg-white border border-gray-800 p-1 px-2 sm:w-2xl rounded-2xl text-1xl' type="text" placeholder='Mobile No.' value={input.contact} name="contact" onChange={handel} />
                    </div>
                    <div className='flex flex-col'>
                        <label className=' font-semibold' htmlFor="">Password</label>
                        <input className=' hover:shadow-lg shadow-gray-500 bg-white border border-gray-800 p-1 px-2 sm:w-2xl rounded-2xl text-1xl' type="password" placeholder='Password' value={input.password} name="password" onChange={handel} />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-20 items-center">
                        <div onChange={handel} className="role flex gap-5 "><div className='flex gap-2'><input className='cursor-pointer' type="radio" value="student" name="role" />Student</div>
                            <div className='flex gap-2 '><input className='cursor-pointer' type="radio" value="recruiter" name="role" />Recruiter</div></div>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="">Profile Photo</label>
                            <input className="grid w-50 items-center gap-4 bg-white border border-gray-800 p-1  rounded-2xl cursor-pointer" type="file" name="file" onChange={handelfile} /></div></div>

                    <Button className='w-[100%] cursor-pointer'   disabled={loading}>
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                          </svg>
                          Signing Up...
                        </>
                      ) : "Sign Up"}
                    </Button>
                    <div className="flex gap-2"> <p>Already have an account ?</p><Link to="/login" className='text-blue-400'>Login</Link></div>


                </form>
                <div className="mt-20 p-5 flex justify-center">
                <p>By clicking 'Sign up', you acknowledge that you have read and accepted the <span className='text-blue-400 cursor-pointer'><Link to='/terms'>Terms of Service</Link> </span>and <span className='text-blue-400 cursor-pointer'><Link to='/privacy'>Privacy Policy.</Link></span></p></div>

            </div>

        </div>
    )
}

export default Signup
