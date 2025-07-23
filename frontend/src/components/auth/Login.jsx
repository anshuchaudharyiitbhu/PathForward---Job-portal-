import React, { useContext, useState } from 'react'
import { Button } from '../ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utilis/constant'
import { UserContext} from '../context/context'
import { JobContext } from '../context/Jobcontext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

const Login = () => {
  const { setUser } = useContext(UserContext); //to set user info. This is only a branch of context which define what is user, setuser and all 
  const [loading, setloading] = useState(false)

  const [input, setinput] = useState(
    {

      email: "",
      password: "",
      role: "",

    }
  )

  // const handel = (e) => {
  //     setinput({ ...input, [e.target.name]: e.target.value })
  // }


  const navigate = useNavigate();

const { fetchJobs } = useContext(JobContext);

  const handelsubmit = async (e) => {
    setloading(true);
    e.preventDefault();

    if (!input.role) {
      alert("Please select a role (Student or Recruiter)");
      return;
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        fetchJobs();
        navigate("/");
        setUser(res.data.user);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
    finally {
      setloading(false);
    }
  };

  return (
    <div>
      
      <Navbar />
      <div>
        <form className="main flex   items-center flex-col gap-5 bg-zinc-100 w-fit m-auto mt-20 p-4 rounded-2xl " onSubmit={handelsubmit} action="">
          <h1 className=' text-center text-2xl font-medium text-gray-900 md: md:text-3xl'>Log in to <span className="text-black-100">Path<span className=" text-purple-500">Forward</span></span></h1>
          <p className='text-md text-center text-gray-500 md:text-lg'>Welcome back. Please enter your details</p>

          <div className='flex flex-col' >
            <label className=' font-semibold' htmlFor="">Email </label>
            <input className=' bg-white border border-gray-800 p-1 px-2 sm:w-2xl rounded-2xl text-1xl' type="text" placeholder='abcd@xyz.com' name="email" onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })} value={input.email} />
          </div>

          <div className='flex flex-col' >
            <label className=' font-semibold' htmlFor="">Password</label>
            <input className=' bg-white border border-gray-800 p-1 px-2 sm:w-2xl rounded-2xl text-1xl' type="password" placeholder='Password' value={input.password} name="password" onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })} />
          </div>
          <div className="flex gap-20 items-center">
            <div onChange={(e) => setinput({ ...input, [e.target.name]: e.target.value })} className="role flex gap-5 "><div className='flex gap-2'><input className='cursor-pointer' type="radio" value="student" name="role" />Student</div>
              <div className='flex gap-2 '><input className='cursor-pointer' type="radio" value="recruiter" name="role" />Recruiter</div></div>
          </div>
          {/* if a <button> is inside a <form> and you don’t specify the type, it will default to type="submit", meaning: Clicking it will submit the form and trigger the onSubmit handler. */}
          <Button className='w-[100%] cursor-pointer' onClick={handelsubmit} disabled={loading}>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Wait...
              </>
            ) : "Log In"}
          </Button>
          <div className="flex gap-2"> <p>Don't have an account ?</p><Link to="/signup" className='text-blue-400'>Sign Up now</Link></div>
        </form>


      </div>

    </div>
  )
}

export default Login
