import React, { useContext, useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CompanyContext } from './context/companycontext';
import { AdminJobContext } from './context/Adminjobcontext';

const Companydetails = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { company, fetchcompany } = useContext(CompanyContext);
  const {fetchJobs}=useContext(AdminJobContext)

  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
        
        
      const res = await axios.post('https://pathforward-job-portal-backend.onrender.com/api/v1/job/post', input, {
          headers: { 'Content-Type': 'application/json' },
   withCredentials: true,
});

      if (res.data.success) {
        toast.success('Job created successfully');
        await fetchJobs();
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Job creation failed');
      console.log(error);
    } finally {
      setloading(false);
    }
  };





  return (
    <div>
      <Navbar />
      <div className='flex flex-col justify-center items-center py-10'>
        <h1 className='text-3xl font-bold mb-2'>Job Details</h1>
        <p className='text-gray-600 mb-8'>Enter your job details below</p>

        <form
          style={{ backgroundImage: 'linear-gradient(to right, #f9c5d1, #f7d9ff)' }}
          className='w-[80%] max-w-4xl bg-gray-100 p-8 rounded-lg shadow-md'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Title</label>
              <input
                name="title"
                value={input.title}
                onChange={handleChange}
                type="text"
                placeholder='Title'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Description</label>
              <input
                name="description"
                value={input.description}
                onChange={handleChange}
                type="text" 
                placeholder='Description'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Requirement</label>
              <input
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                type="text"
                placeholder='Requirement'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Salary</label>
              <input
                name="salary"
                value={input.salary}
                onChange={handleChange}
                type="text"
                placeholder='Salary'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Location</label>
              <input
                name="location"
                value={input.location}
                onChange={handleChange}
                type="text"
                placeholder='Location'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Job Type</label>
              <input
                name="jobType"
                value={input.jobType}
                onChange={handleChange}
                type="text"
                placeholder='Job Type'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Experience</label>
              <input
                name="experience"
                value={input.experience}
                onChange={handleChange}
                type="text"
                placeholder='Experience'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold'>Number of Positions</label>
              <input
                name="position"
                value={input.position}
                onChange={handleChange}
                type="text"
                placeholder='Number of Positions'
                className='border border-gray-400 p-3 rounded-lg'
              />
            </div>

            <div className='flex flex-col md:col-span-2'>
              <label className='mb-1 font-semibold'>Select Company</label>
              {company.length > 0 ? (
                <select
                  name="companyId"
                  value={input.companyId}
                  onChange={handleChange}
                  className='border border-gray-400 p-3 rounded-lg w-full'
                >
                  <option value="">Select a company</option>
                  {company.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className='text-red-600'>No companies available</span>
              )}
            </div>
          </div>
        </form>

        <div className='flex gap-6 mt-8'>
          <Link to="/admin/companies">
            <Button className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white'>Cancel</Button>
          </Link>
          <Button onClick={handleClick} className='px-7 cursor-pointer' disabled={loading}>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                </svg>
                Creating...
              </>
            ) : "Create Job"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Companydetails;
